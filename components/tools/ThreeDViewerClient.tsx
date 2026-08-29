"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  CheckCircle2,
  Upload,
  Download,
  Camera,
  RotateCcw,
  Ruler,
  Lock,
  AlertCircle,
  Loader2,
  Zap,
  ExternalLink,
  FolderArchive,
  X,
  ChevronDown,
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import {
  incrementDownloadCount,
  shouldShowSuccessUpsell,
  markSuccessUpsellShown,
} from "@/lib/success-upsell";
import ProUpsellModal from "@/components/ui/ProUpsellModal";
import FreeSignupAdBar from "@/components/ads/FreeSignupAdBar";

// ── Constants ─────────────────────────────────────────────────────────────────

const POLL_INTERVAL_MS = 3000;
const POLL_MAX_MS = 5 * 60 * 1000;
const FREE_BATCH_LIMIT = 1; // single file free; batch = Pro/Day Pass

// ── Types ─────────────────────────────────────────────────────────────────────

type Unit = "mm" | "inch";
type ExportFormat = "stl" | "obj" | "glb" | "ply";

interface ModelStats {
  triangles: number;
  vertices: number;
  bbX: number;
  bbY: number;
  bbZ: number;
  volume: number;
  surfaceArea: number;
}

interface QueuedFile {
  file: File;
  status: "pending" | "converting" | "done" | "error";
  targetFormat: ExportFormat;
  blob?: Blob;
}

// ── Utility: compute mesh stats from BufferGeometry ──────────────────────────

function computeStats(geometry: import("three").BufferGeometry): ModelStats {
  geometry.computeBoundingBox();

  const pos = geometry.attributes.position;
  const triangles = geometry.index
    ? geometry.index.count / 3
    : pos.count / 3;
  const vertices = pos.count;

  const bb = geometry.boundingBox!;
  const bbX = bb.max.x - bb.min.x;
  const bbY = bb.max.y - bb.min.y;
  const bbZ = bb.max.z - bb.min.z;

  let volume = 0;
  let surfaceArea = 0;

  const arr = pos.array as Float32Array;
  const count = geometry.index ? geometry.index.count : pos.count;
  const idx = geometry.index ? geometry.index.array : null;

  for (let i = 0; i < count; i += 3) {
    const ia = idx ? idx[i] * 3 : i * 3;
    const ib = idx ? idx[i + 1] * 3 : (i + 1) * 3;
    const ic = idx ? idx[i + 2] * 3 : (i + 2) * 3;

    const ax = arr[ia], ay = arr[ia + 1], az = arr[ia + 2];
    const bx = arr[ib], by = arr[ib + 1], bz = arr[ib + 2];
    const cx = arr[ic], cy = arr[ic + 1], cz = arr[ic + 2];

    volume +=
      (ax * (by * cz - bz * cy) -
        ay * (bx * cz - bz * cx) +
        az * (bx * cy - by * cx)) /
      6;

    const ex = bx - ax, ey = by - ay, ez = bz - az;
    const fx = cx - ax, fy = cy - ay, fz = cz - az;
    const crossX = ey * fz - ez * fy;
    const crossY = ez * fx - ex * fz;
    const crossZ = ex * fy - ey * fx;
    surfaceArea +=
      Math.sqrt(crossX * crossX + crossY * crossY + crossZ * crossZ) / 2;
  }

  return {
    triangles: Math.round(triangles),
    vertices,
    bbX,
    bbY,
    bbZ,
    volume: Math.abs(volume),
    surfaceArea,
  };
}

// ── Per-file conversion helper ────────────────────────────────────────────────

async function convertFileToBlob(
  file: File,
  format: ExportFormat
): Promise<Blob> {
  const THREE = await import("three");
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";

  let geometry: import("three").BufferGeometry | null = null;

  if (ext === "stl") {
    const { STLLoader } = await import(
      "three/examples/jsm/loaders/STLLoader.js"
    );
    const buffer = await file.arrayBuffer();
    geometry = new STLLoader().parse(buffer);
  } else if (ext === "obj") {
    const { OBJLoader } = await import(
      "three/examples/jsm/loaders/OBJLoader.js"
    );
    const text = await file.text();
    const group = new OBJLoader().parse(text);
    group.traverse((child) => {
      if (!geometry && (child as import("three").Mesh).isMesh) {
        geometry = (
          (child as import("three").Mesh).geometry as import("three").BufferGeometry
        ).clone();
      }
    });
  } else if (ext === "glb" || ext === "gltf") {
    const { GLTFLoader } = await import(
      "three/examples/jsm/loaders/GLTFLoader.js"
    );
    const { DRACOLoader } = await import(
      "three/examples/jsm/loaders/DRACOLoader.js"
    );
    const buffer = await file.arrayBuffer();
    const loader = new GLTFLoader();
    const draco = new DRACOLoader();
    draco.setDecoderPath("/draco/gltf/");
    loader.setDRACOLoader(draco);
    try {
      const { MeshoptDecoder } = await import(
        "three/examples/jsm/libs/meshopt_decoder.module.js"
      );
      loader.setMeshoptDecoder(
        MeshoptDecoder as unknown as Parameters<typeof loader.setMeshoptDecoder>[0]
      );
    } catch {
      // meshopt optional
    }
    const gltf = await new Promise<
      import("three/examples/jsm/loaders/GLTFLoader.js").GLTF
    >((resolve, reject) => {
      loader.parse(buffer, "", resolve, reject);
    });
    gltf.scene.traverse((child) => {
      if (!geometry && (child as import("three").Mesh).isMesh) {
        geometry = (
          (child as import("three").Mesh).geometry as import("three").BufferGeometry
        ).clone();
      }
    });
  } else if (ext === "ply") {
    const { PLYLoader } = await import(
      "three/examples/jsm/loaders/PLYLoader.js"
    );
    const buffer = await file.arrayBuffer();
    geometry = new PLYLoader().parse(buffer);
  } else {
    throw new Error(`Unsupported format: .${ext}`);
  }

  if (!geometry) throw new Error("Could not extract geometry.");

  (geometry as import("three").BufferGeometry).computeVertexNormals();

  const material = new THREE.MeshStandardMaterial({ color: 0x8888ff });
  const mesh = new THREE.Mesh(
    geometry as import("three").BufferGeometry,
    material
  );
  const scene = new THREE.Scene();
  scene.add(mesh);

  if (format === "stl") {
    const { STLExporter } = await import(
      "three/examples/jsm/exporters/STLExporter.js"
    );
    const result = new STLExporter().parse(scene, { binary: true });
    return new Blob([result], { type: "model/stl" });
  } else if (format === "obj") {
    const { OBJExporter } = await import(
      "three/examples/jsm/exporters/OBJExporter.js"
    );
    const result = new OBJExporter().parse(scene);
    return new Blob([result], { type: "text/plain" });
  } else if (format === "glb") {
    const { GLTFExporter } = await import(
      "three/examples/jsm/exporters/GLTFExporter.js"
    );
    const result = await new Promise<ArrayBuffer>((resolve, reject) =>
      new GLTFExporter().parse(
        scene,
        (buf) => resolve(buf as ArrayBuffer),
        reject,
        { binary: true }
      )
    );
    return new Blob([result], { type: "model/gltf-binary" });
  } else {
    const { PLYExporter } = await import(
      "three/examples/jsm/exporters/PLYExporter.js"
    );
    const result = await new Promise<ArrayBuffer | string>((resolve) =>
      new PLYExporter().parse(scene, (data) => resolve(data), {})
    );
    return new Blob([result as BlobPart], { type: "application/octet-stream" });
  }
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ThreeDViewerClient() {
  // ── Session + isPro ───────────────────────────────────────────────────────
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const isPro =
    (session?.user as { plan?: string } | undefined)?.plan === "pro";

  // ── Three.js scene refs ───────────────────────────────────────────────────
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<import("three").WebGLRenderer | null>(null);
  const sceneRef = useRef<import("three").Scene | null>(null);
  const cameraRef = useRef<import("three").PerspectiveCamera | null>(null);
  const controlsRef = useRef<{
    update: () => void;
    dispose: () => void;
  } | null>(null);
  const frameRef = useRef<number>(0);
  const currentMeshRef = useRef<import("three").Mesh | null>(null);
  const geometryRef = useRef<import("three").BufferGeometry | null>(null);
  // Configurator: the loaded model root (may contain many parts) + the part list.
  const rootRef = useRef<import("three").Object3D | null>(null);
  const partsRef = useRef<{ id: string; mesh: import("three").Mesh }[]>([]);
  // Scene realism refs (environment reflections + ground contact shadow)
  const groundRef = useRef<import("three").Mesh | null>(null);
  const gridRef = useRef<import("three").GridHelper | null>(null);
  const envTexRef = useRef<import("three").Texture | null>(null);
  const keyLightRef = useRef<import("three").DirectionalLight | null>(null);
  const threeRef = useRef<typeof import("three") | null>(null);
  // Cache of loaded HDRI environments: { env: PMREM map for lighting, bg: equirect for 360 backdrop }
  const hdriCacheRef = useRef<
    Record<string, { env: import("three").Texture; bg: import("three").Texture }>
  >({});
  const maxDimRef = useRef(1);
  // Original baseColor map per part, so a custom texture can be removed without
  // destroying the model's own baked texture.
  const origMapsRef = useRef<Map<string, import("three").Texture | null>>(
    new Map()
  );
  // 2D texture editor: draw on a flat canvas (the unwrapped texture) with the
  // mouse; it is the model's live texture. paintRef lets the canvas handlers
  // read current brush settings without re-attaching.
  const paintRef = useRef({ mode: false, color: "#e11d48", size: 24 });
  const paintingRef = useRef(false);
  const painting3DRef = useRef(false);
  const lastPtRef = useRef<{ x: number; y: number } | null>(null);
  const paint2DRef = useRef<{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    tex: import("three").CanvasTexture;
  } | null>(null);
  const paint2DHostRef = useRef<HTMLDivElement | null>(null);
  const paintSaveRef = useRef<(() => void) | null>(null);

  // ── Single-file viewer state ───────────────────────────────────────────────
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [stats, setStats] = useState<ModelStats | null>(null);
  const [unit, setUnit] = useState<Unit>("mm");
  const [error, setError] = useState<string | null>(null);
  // Material / appearance controls (live-applied to the loaded mesh)
  const [matColor, setMatColor] = useState("#8888ff");
  const [wireframe, setWireframe] = useState(false);
  const [metalness, setMetalness] = useState(0.2);
  const [roughness, setRoughness] = useState(0.5);
  // Vertex paint (paint pieces of the mesh, export keeps colors in PLY/GLB)
  // Configurator parts (each colorable independently). >1 = multi-part model.
  const [parts, setParts] = useState<{ id: string; name: string; color: string }[]>([]);
  // Render output settings
  const [renderRes, setRenderRes] = useState(2048);
  const [renderTransparent, setRenderTransparent] = useState(false);
  const [rendering, setRendering] = useState(false);
  // Custom texture (image mapped onto the surface). Tinted by the color picker.
  const [textureUrl, setTextureUrl] = useState<string | null>(null);
  // Paint on the model surface with the mouse (draws onto the texture via UVs).
  const [paintMode, setPaintMode] = useState(false);
  const [paintColor, setPaintColor] = useState("#e11d48");
  const [brushSize, setBrushSize] = useState(24);
  // Scene realism controls
  const [envReflections, setEnvReflections] = useState(true);
  const [groundShadow, setGroundShadow] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  // Environment (HDRI lighting/reflections/backdrop) + plain backdrop
  const [env, setEnv] = useState<"soft" | "studio" | "sunset" | "warehouse" | "city">("soft");
  const [showEnvBg, setShowEnvBg] = useState(false);
  const [envLoading, setEnvLoading] = useState(false);
  const [bgMode, setBgMode] = useState<"studio" | "dark" | "white" | "color">("dark");
  const [bgColor, setBgColor] = useState("#e8e8ec");
  const [loading, setLoading] = useState(false);

  // ── Batch conversion state ────────────────────────────────────────────────
  const [batchFiles, setBatchFiles] = useState<QueuedFile[]>([]);
  const [batchFormat, setBatchFormat] = useState<ExportFormat>("obj");
  const [batchConverting, setBatchConverting] = useState(false);
  const [batchDone, setBatchDone] = useState(false);
  const [batchZipBlob, setBatchZipBlob] = useState<Blob | null>(null);
  const [batchMode, setBatchMode] = useState(false);

  // ── Day Pass / upsell state ───────────────────────────────────────────────
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [successUpsellOpen, setSuccessUpsellOpen] = useState(false);
  const [awaitingPayment, setAwaitingPayment] = useState(false);
  const [pollTimedOut, setPollTimedOut] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollStartRef = useRef<number>(0);

  // ── Handle ?daypass=active redirect fallback ──────────────────────────────
  useEffect(() => {
    if (searchParams?.get("daypass") === "active") {
      setAwaitingPayment(false);
      setUpsellOpen(false);
      setErrorMsg("");
    }
  }, [searchParams]);

  const justUnlockedViaRedirect =
    searchParams?.get("daypass") === "active" && !awaitingPayment;

  // ── Polling cleanup ───────────────────────────────────────────────────────
  const stopPolling = useCallback(() => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopPolling();
  }, [stopPolling]);

  // ── Three.js scene init ───────────────────────────────────────────────────
  useEffect(() => {
    if (!mountRef.current) return;
    let cancelled = false;

    (async () => {
      const THREE = await import("three");
      threeRef.current = THREE;
      const { OrbitControls } = await import(
        "three/examples/jsm/controls/OrbitControls.js"
      );
      if (cancelled || !mountRef.current) return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight || 420;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true, // allow transparent-background renders
        preserveDrawingBuffer: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x1a1a2e, 1);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      rendererRef.current = renderer;
      canvasRef.current = renderer.domElement;
      mountRef.current.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Environment reflections (image-based lighting) — instant realism, no HDR
      // file needed. RoomEnvironment is a procedural studio lit scene.
      const pmrem = new THREE.PMREMGenerator(renderer);
      const { RoomEnvironment } = await import(
        "three/examples/jsm/environments/RoomEnvironment.js"
      );
      const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      envTexRef.current = envTex;
      scene.environment = envTex;

      const grid = new THREE.GridHelper(20, 20, 0x444466, 0x333355);
      gridRef.current = grid;
      scene.add(grid);

      // Ground plane that only catches shadows (invisible except the shadow).
      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.ShadowMaterial({ opacity: 0.35 })
      );
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      groundRef.current = ground;
      scene.add(ground);

      const ambient = new THREE.AmbientLight(0xffffff, 0.35);
      scene.add(ambient);
      const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
      keyLight.position.set(5, 10, 7);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(2048, 2048);
      keyLight.shadow.bias = -0.0002;
      keyLightRef.current = keyLight;
      scene.add(keyLight);
      const fillLight = new THREE.DirectionalLight(0x8888ff, 0.3);
      fillLight.position.set(-5, 5, -5);
      scene.add(fillLight);
      const rimLight = new THREE.DirectionalLight(0xffffff, 0.2);
      rimLight.position.set(0, -5, -5);
      scene.add(rimLight);

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
      camera.position.set(0, 5, 10);
      cameraRef.current = camera;

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controlsRef.current = controls;

      function animate() {
        frameRef.current = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
      animate();

      // ── Paint directly on the 3D model (raycast → UV → draw on the texture) ──
      const raycaster = new THREE.Raycaster();
      const ndc = new THREE.Vector2();
      let last3D: { x: number; y: number } | null = null;
      const paint3D = (clientX: number, clientY: number) => {
        const cam = cameraRef.current;
        const rootObj = rootRef.current;
        const entry = paint2DRef.current;
        if (!cam || !rootObj || !entry) return;
        const rect = renderer.domElement.getBoundingClientRect();
        ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        ndc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(ndc, cam);
        const hits = raycaster.intersectObject(rootObj, true);
        if (!hits.length || !hits[0].uv) return;
        const { canvas, ctx, tex } = entry;
        const u = hits[0].uv!.x;
        const v = hits[0].uv!.y;
        const x = u * canvas.width;
        const y = (tex.flipY ? 1 - v : v) * canvas.height;
        const size = paintRef.current.size;
        ctx.fillStyle = paintRef.current.color;
        // Connect strokes only within the same UV island (avoid lines across seams)
        if (last3D) {
          const d = Math.hypot(x - last3D.x, y - last3D.y);
          if (d < canvas.width * 0.08) {
            ctx.strokeStyle = paintRef.current.color;
            ctx.lineWidth = size * 2;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(last3D.x, last3D.y);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        last3D = { x, y };
        tex.needsUpdate = true;
      };
      const pd3 = (e: PointerEvent) => {
        if (!paintRef.current.mode) return;
        painting3DRef.current = true;
        last3D = null;
        paint3D(e.clientX, e.clientY);
      };
      const pm3 = (e: PointerEvent) => {
        if (!paintRef.current.mode || !painting3DRef.current) return;
        paint3D(e.clientX, e.clientY);
      };
      const pu3 = () => {
        if (!painting3DRef.current) return;
        painting3DRef.current = false;
        last3D = null;
        paintSaveRef.current?.();
      };
      renderer.domElement.addEventListener("pointerdown", pd3);
      renderer.domElement.addEventListener("pointermove", pm3);
      window.addEventListener("pointerup", pu3);

      const ro = new ResizeObserver(() => {
        if (!mountRef.current || !cameraRef.current || !rendererRef.current)
          return;
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight || 420;
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
      });
      ro.observe(mountRef.current);

      return () => {
        ro.disconnect();
        renderer.domElement.removeEventListener("pointerdown", pd3);
        renderer.domElement.removeEventListener("pointermove", pm3);
        window.removeEventListener("pointerup", pu3);
      };
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameRef.current);
      controlsRef.current?.dispose();
      rendererRef.current?.dispose();
      if (canvasRef.current && mountRef.current) {
        try {
          mountRef.current.removeChild(canvasRef.current);
        } catch {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Live material sync ────────────────────────────────────────────────────
  // Applies the appearance controls to the current mesh, and re-applies them
  // whenever a new file loads (stats changes on load). No THREE import needed:
  // material.color is a THREE.Color with a .set(cssString) method.
  useEffect(() => {
    const list = partsRef.current;
    if (!list.length) return;
    const single = list.length <= 1;
    for (const { mesh } of list) {
      const m = mesh.material as import("three").MeshStandardMaterial;
      if (!m) continue;
      m.wireframe = wireframe;
      m.metalness = metalness;
      m.roughness = roughness;
      // Global color only applies to single-part models. Multi-part colors are
      // managed per-part by the Parts panel, so we never override them here.
      if (single) {
        m.vertexColors = false;
        m.color.set(matColor);
      }
      m.needsUpdate = true;
    }
    // NOTE: intentionally NOT keyed on `stats` (i.e. not on load) so imported
    // GLB/OBJ materials (their real textures/colors) are preserved on load and
    // only overridden when the user actually touches a Material control.
  }, [matColor, wireframe, metalness, roughness]);

  // ── Ground shadow + grid visibility ─────────────────────────────────────────
  useEffect(() => {
    if (groundRef.current) groundRef.current.visible = groundShadow;
    if (gridRef.current) gridRef.current.visible = showGrid;
  }, [groundShadow, showGrid, stats]);

  // ── Custom texture (mapped onto every part; color picker tints it) ──────────
  useEffect(() => {
    const THREE = threeRef.current;
    const list = partsRef.current;
    if (!THREE || !list.length) return;

    if (!textureUrl) {
      // Remove the CUSTOM texture and restore the model's own baked map. If we
      // never replaced it, leave it untouched (this is the bug fix: previously
      // this stripped the GLB's own texture on load).
      for (const { mesh } of list) {
        const m = mesh.material as import("three").MeshStandardMaterial;
        if (m && origMapsRef.current.has(mesh.uuid)) {
          m.map = origMapsRef.current.get(mesh.uuid) ?? null;
          origMapsRef.current.delete(mesh.uuid);
          m.needsUpdate = true;
        }
      }
      return;
    }

    new THREE.TextureLoader().load(textureUrl, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      for (const { mesh } of list) {
        ensureUV(mesh.geometry, THREE);
        const m = mesh.material as import("three").MeshStandardMaterial;
        if (m) {
          if (!origMapsRef.current.has(mesh.uuid)) {
            origMapsRef.current.set(mesh.uuid, m.map ?? null);
          }
          m.map = tex;
          m.needsUpdate = true;
        }
      }
    });
  }, [textureUrl]);

  // Keep brush settings current for the (once-attached) canvas handlers, and
  // disable orbit while in paint mode so dragging on the 3D model paints it.
  useEffect(() => {
    paintRef.current = { mode: paintMode, color: paintColor, size: brushSize };
    const controls = controlsRef.current as unknown as { enabled: boolean } | null;
    if (controls) controls.enabled = !paintMode;
  }, [paintMode, paintColor, brushSize]);

  // ── 2D texture editor: a flat canvas you draw on = the model's live texture ──
  useEffect(() => {
    const THREE = threeRef.current;
    const host = paint2DHostRef.current;
    const mesh = currentMeshRef.current;
    if (!paintMode || !THREE || !host || !mesh) return;
    const m = mesh.material as import("three").MeshStandardMaterial;
    if (!m) return;

    const SIZE = 1024;
    const flip = m.map ? m.map.flipY : false;

    // Wrapper stacks the paint canvas + a UV-guide overlay on top.
    const wrap = document.createElement("div");
    wrap.style.position = "relative";
    wrap.style.width = "100%";

    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    canvas.style.width = "100%";
    canvas.style.aspectRatio = "1 / 1";
    canvas.style.display = "block";
    canvas.style.cursor = "crosshair";
    canvas.style.touchAction = "none";
    canvas.style.borderRadius = "8px";
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Seed the canvas from the model's current texture so you draw over it.
    const img = m.map?.image as CanvasImageSource | undefined;
    let seeded = false;
    if (img) {
      try {
        ctx.drawImage(img, 0, 0, SIZE, SIZE);
        seeded = true;
      } catch {
        seeded = false;
      }
    }
    if (!seeded) {
      ctx.fillStyle = "#" + m.color.getHexString();
      ctx.fillRect(0, 0, SIZE, SIZE);
    }

    ensureUV(mesh.geometry, THREE);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.flipY = flip;
    if (!origMapsRef.current.has(mesh.uuid)) {
      origMapsRef.current.set(mesh.uuid, m.map ?? null);
    }
    m.map = tex;
    m.color.set("#ffffff");
    m.needsUpdate = true;
    paint2DRef.current = { canvas, ctx, tex };

    // Persistence: restore a previously saved drawing for this file.
    const storeKey = `sx3d_paint_${fileName ?? "model"}`;
    try {
      const saved = localStorage.getItem(storeKey);
      if (saved) {
        const im = new Image();
        im.onload = () => {
          ctx.drawImage(im, 0, 0, SIZE, SIZE);
          tex.needsUpdate = true;
        };
        im.src = saved;
      }
    } catch {}

    // UV-guide overlay: draw the unwrapped mesh so you SEE where each area maps.
    const overlay = document.createElement("canvas");
    overlay.width = SIZE;
    overlay.height = SIZE;
    overlay.style.position = "absolute";
    overlay.style.inset = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.cursor = "crosshair";
    overlay.style.touchAction = "none";
    overlay.style.borderRadius = "8px";
    const octx = overlay.getContext("2d");
    const g = mesh.geometry;
    const uv = g.getAttribute("uv");
    if (octx && uv) {
      octx.strokeStyle = "rgba(99,102,241,0.30)";
      octx.lineWidth = 0.6;
      octx.beginPath();
      const px = (i: number) => uv.getX(i) * SIZE;
      const py = (i: number) => (flip ? 1 - uv.getY(i) : uv.getY(i)) * SIZE;
      const idx = g.index;
      const tri = (a: number, b: number, c: number) => {
        octx.moveTo(px(a), py(a));
        octx.lineTo(px(b), py(b));
        octx.lineTo(px(c), py(c));
        octx.lineTo(px(a), py(a));
      };
      const count = idx ? idx.count : uv.count;
      for (let i = 0; i < count; i += 3) {
        if (idx) tri(idx.getX(i), idx.getX(i + 1), idx.getX(i + 2));
        else tri(i, i + 1, i + 2);
      }
      octx.stroke();
    }

    wrap.appendChild(canvas);
    wrap.appendChild(overlay);
    host.innerHTML = "";
    host.appendChild(wrap);

    let saveTimer: ReturnType<typeof setTimeout> | undefined;
    const save = () => {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        try {
          localStorage.setItem(storeKey, canvas.toDataURL("image/png"));
        } catch {}
      }, 600);
    };
    paintSaveRef.current = save; // let 3D painting trigger a save too
    // Events are captured on the overlay (topmost); we draw onto the paint
    // canvas below. Same size/position, so coordinates match 1:1.
    const toXY = (e: PointerEvent) => {
      const r = overlay.getBoundingClientRect();
      return {
        x: ((e.clientX - r.left) / r.width) * SIZE,
        y: ((e.clientY - r.top) / r.height) * SIZE,
      };
    };
    const stamp = (x: number, y: number) => {
      ctx.fillStyle = paintRef.current.color;
      ctx.beginPath();
      ctx.arc(x, y, paintRef.current.size, 0, Math.PI * 2);
      ctx.fill();
    };
    const strokeSeg = (a: { x: number; y: number }, b: { x: number; y: number }) => {
      ctx.strokeStyle = paintRef.current.color;
      ctx.lineWidth = paintRef.current.size * 2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    };
    const down = (e: PointerEvent) => {
      paintingRef.current = true;
      const p = toXY(e);
      lastPtRef.current = p;
      stamp(p.x, p.y);
      tex.needsUpdate = true;
      try {
        overlay.setPointerCapture(e.pointerId);
      } catch {}
    };
    const move = (e: PointerEvent) => {
      if (!paintingRef.current) return;
      const p = toXY(e);
      if (lastPtRef.current) strokeSeg(lastPtRef.current, p);
      stamp(p.x, p.y);
      lastPtRef.current = p;
      tex.needsUpdate = true;
    };
    const up = () => {
      if (!paintingRef.current) return;
      paintingRef.current = false;
      lastPtRef.current = null;
      save();
    };
    overlay.addEventListener("pointerdown", down);
    overlay.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);

    return () => {
      clearTimeout(saveTimer);
      overlay.removeEventListener("pointerdown", down);
      overlay.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      if (host.contains(wrap)) host.removeChild(wrap);
      paint2DRef.current = null;
      paintSaveRef.current = null;
    };
  }, [paintMode, stats, fileName]);

  // ── Environment (HDRI lighting/reflections/backdrop) + plain backdrop ────────
  // One coherent effect so environment and background never fight each other.
  useEffect(() => {
    const THREE = threeRef.current;
    const scene = sceneRef.current;
    const renderer = rendererRef.current;
    if (!THREE || !scene || !renderer) return;
    let cancelled = false;

    const plainBackdrop = () => {
      if (bgMode === "studio") {
        const c = document.createElement("canvas");
        c.width = 16;
        c.height = 256;
        const ctx = c.getContext("2d");
        if (ctx) {
          const g = ctx.createLinearGradient(0, 0, 0, 256);
          g.addColorStop(0, "#f5f5f8");
          g.addColorStop(1, "#c7c7d1");
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, 16, 256);
        }
        const t = new THREE.CanvasTexture(c);
        t.colorSpace = THREE.SRGBColorSpace;
        scene.background = t;
      } else if (bgMode === "white") {
        scene.background = new THREE.Color(0xffffff);
      } else if (bgMode === "color") {
        scene.background = new THREE.Color(bgColor);
      } else {
        scene.background = new THREE.Color(0x1a1a2e);
      }
    };

    const apply = (envMap: import("three").Texture | null, bgTex: import("three").Texture | null) => {
      if (cancelled) return;
      scene.environment = envReflections ? envMap : null;
      if (showEnvBg && bgTex) scene.background = bgTex;
      else plainBackdrop();
    };

    if (env === "soft") {
      apply(envTexRef.current, null); // procedural RoomEnvironment, no 360 backdrop
      return;
    }

    const cached = hdriCacheRef.current[env];
    if (cached) {
      apply(cached.env, cached.bg);
      return;
    }

    setEnvLoading(true);
    (async () => {
      const { RGBELoader } = await import(
        "three/examples/jsm/loaders/RGBELoader.js"
      );
      new RGBELoader().load(
        `/hdri/${env}.hdr`,
        (tex) => {
          if (cancelled) return;
          const pmrem = new THREE.PMREMGenerator(renderer);
          const envMap = pmrem.fromEquirectangular(tex).texture;
          tex.mapping = THREE.EquirectangularReflectionMapping;
          hdriCacheRef.current[env] = { env: envMap, bg: tex };
          setEnvLoading(false);
          apply(envMap, tex);
        },
        undefined,
        () => setEnvLoading(false)
      );
    })();

    return () => {
      cancelled = true;
    };
  }, [env, envReflections, showEnvBg, bgMode, bgColor, stats]);

  // ── Load single file into viewer ──────────────────────────────────────────
  const loadFile = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);
    setStats(null);
    setFileName(file.name);

    try {
      const THREE = await import("three");
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "";

      let root: import("three").Object3D | null = null;

      if (ext === "stl") {
        const { STLLoader } = await import(
          "three/examples/jsm/loaders/STLLoader.js"
        );
        const g = new STLLoader().parse(await file.arrayBuffer());
        g.computeVertexNormals();
        root = new THREE.Mesh(
          g,
          new THREE.MeshStandardMaterial({
            color: 0x8888ff,
            metalness: 0.2,
            roughness: 0.5,
            side: THREE.DoubleSide,
          })
        );
      } else if (ext === "ply") {
        const { PLYLoader } = await import(
          "three/examples/jsm/loaders/PLYLoader.js"
        );
        const g = new PLYLoader().parse(await file.arrayBuffer());
        g.computeVertexNormals();
        root = new THREE.Mesh(
          g,
          new THREE.MeshStandardMaterial({
            color: 0x8888ff,
            metalness: 0.2,
            roughness: 0.5,
            side: THREE.DoubleSide,
            vertexColors: !!g.getAttribute("color"),
          })
        );
      } else if (ext === "obj") {
        const { OBJLoader } = await import(
          "three/examples/jsm/loaders/OBJLoader.js"
        );
        root = new OBJLoader().parse(await file.text());
      } else if (ext === "glb" || ext === "gltf") {
        const { GLTFLoader } = await import(
          "three/examples/jsm/loaders/GLTFLoader.js"
        );
        const { DRACOLoader } = await import(
          "three/examples/jsm/loaders/DRACOLoader.js"
        );
        const loader = new GLTFLoader();
        // Web-optimized GLBs are usually Draco-compressed (and sometimes use
        // meshopt), so wire both decoders or the geometry fails to load.
        const draco = new DRACOLoader();
        draco.setDecoderPath("/draco/gltf/");
        loader.setDRACOLoader(draco);
        try {
          const { MeshoptDecoder } = await import(
            "three/examples/jsm/libs/meshopt_decoder.module.js"
          );
          loader.setMeshoptDecoder(
            MeshoptDecoder as unknown as Parameters<
              typeof loader.setMeshoptDecoder
            >[0]
          );
        } catch {
          // meshopt is optional
        }
        const buffer = await file.arrayBuffer();
        const gltf = await new Promise<
          import("three/examples/jsm/loaders/GLTFLoader.js").GLTF
        >((resolve, reject) => {
          loader.parse(buffer, "", resolve, reject);
        });
        gltf.scene.updateMatrixWorld(true);
        root = gltf.scene;
      } else {
        throw new Error(
          `Unsupported format: .${ext}. Supported: STL, OBJ, GLB, GLTF, PLY.`
        );
      }

      if (!root) throw new Error("Could not load the 3D file.");

      // Collect every mesh as a colorable "part". Clone each material so
      // recoloring one part never affects another, and force MeshStandardMaterial
      // so all parts light consistently under the environment.
      const collected: { id: string; mesh: import("three").Mesh }[] = [];
      root.traverse((child) => {
        const m = child as import("three").Mesh;
        if (!m.isMesh) return;
        if (!m.geometry.getAttribute("normal")) m.geometry.computeVertexNormals();
        const srcMat = Array.isArray(m.material) ? m.material[0] : m.material;
        let mat: import("three").MeshStandardMaterial;
        if (
          srcMat &&
          (srcMat as import("three").MeshStandardMaterial).isMeshStandardMaterial
        ) {
          mat = (srcMat as import("three").MeshStandardMaterial).clone();
        } else {
          const hex =
            (srcMat as unknown as { color?: import("three").Color })?.color?.getHex?.() ??
            0x8888ff;
          mat = new THREE.MeshStandardMaterial({
            color: hex,
            metalness: 0.2,
            roughness: 0.5,
          });
        }
        mat.side = THREE.DoubleSide;
        m.material = mat;
        m.castShadow = true;
        m.receiveShadow = true;
        if (!m.name) m.name = `Part ${collected.length + 1}`;
        collected.push({ id: `p${collected.length}`, mesh: m });
      });

      if (!collected.length) throw new Error("No mesh found in the file.");

      // Swap the new model into the scene.
      if (rootRef.current && sceneRef.current) {
        sceneRef.current.remove(rootRef.current);
      }
      rootRef.current = root;
      partsRef.current = collected;
      currentMeshRef.current = collected[0].mesh;
      geometryRef.current = collected[0].mesh.geometry;
      sceneRef.current?.add(root);

      // Reset per-model paint/texture state so a new file starts clean.
      paint2DRef.current = null;
      origMapsRef.current.clear();
      setPaintMode(false);
      setTextureUrl(null);

      // Center the whole model at the origin.
      const box0 = new THREE.Box3().setFromObject(root);
      const center0 = box0.getCenter(new THREE.Vector3());
      root.position.sub(center0);

      // Aggregate stats across all parts.
      let aggTris = 0,
        aggVerts = 0,
        aggVol = 0,
        aggArea = 0;
      for (const part of collected) {
        const st = computeStats(part.mesh.geometry);
        aggTris += st.triangles;
        aggVerts += st.vertices;
        aggVol += st.volume;
        aggArea += st.surfaceArea;
      }
      const sizeBox = new THREE.Box3().setFromObject(root);
      const sizeV = sizeBox.getSize(new THREE.Vector3());
      setStats({
        triangles: aggTris,
        vertices: aggVerts,
        bbX: sizeV.x,
        bbY: sizeV.y,
        bbZ: sizeV.z,
        volume: aggVol,
        surfaceArea: aggArea,
      });

      // Publish the colorable parts list for the configurator UI.
      setParts(
        collected.map((p) => ({
          id: p.id,
          name: p.mesh.name,
          color:
            "#" +
            (p.mesh.material as import("three").MeshStandardMaterial).color.getHexString(),
        }))
      );

      if (cameraRef.current && controlsRef.current) {
        const maxDim = Math.max(sizeV.x, sizeV.y, sizeV.z) || 1;
        maxDimRef.current = maxDim;
        const fov = cameraRef.current.fov * (Math.PI / 180);
        const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.8;
        cameraRef.current.position.set(cameraZ * 0.6, cameraZ * 0.5, cameraZ);
        cameraRef.current.lookAt(0, 0, 0);
        (
          controlsRef.current as unknown as import("three/examples/jsm/controls/OrbitControls.js").OrbitControls
        ).target.set(0, 0, 0);
        controlsRef.current.update();

        const minY = -sizeV.y / 2;
        if (groundRef.current) {
          groundRef.current.position.y = minY;
          groundRef.current.scale.set(maxDim * 6, maxDim * 6, 1);
        }
        if (gridRef.current) {
          gridRef.current.position.y = minY;
          gridRef.current.scale.setScalar(Math.max(maxDim / 10, 0.0001));
        }
        if (keyLightRef.current) {
          keyLightRef.current.position.set(maxDim * 2, maxDim * 4, maxDim * 3);
          const sc = keyLightRef.current.shadow
            .camera as import("three").OrthographicCamera;
          const d = maxDim * 1.5;
          sc.left = -d;
          sc.right = d;
          sc.top = d;
          sc.bottom = -d;
          sc.near = Math.max(maxDim * 0.01, 0.001);
          sc.far = maxDim * 30;
          sc.updateProjectionMatrix();
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load 3D file.");
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Configurator: recolor a single part ─────────────────────────────────────
  const setPartColor = useCallback((id: string, hex: string) => {
    const part = partsRef.current.find((p) => p.id === id);
    if (part) {
      (part.mesh.material as import("three").MeshStandardMaterial).color.set(hex);
    }
    setParts((prev) => prev.map((p) => (p.id === id ? { ...p, color: hex } : p)));
  }, []);

  // ── Drag and drop (single-file viewer) ───────────────────────────────────
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  const onDragLeave = useCallback(() => setIsDragging(false), []);
  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) loadFile(file);
    },
    [loadFile]
  );
  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) loadFile(file);
      e.target.value = "";
    },
    [loadFile]
  );

  // ── Export single model ───────────────────────────────────────────────────
  // ── Export the UV template PNG (base texture + UV borders) for Photoshop ─────
  const exportUVTemplate = useCallback(() => {
    const THREE = threeRef.current;
    const mesh = currentMeshRef.current;
    if (!THREE || !mesh) return;
    const g = mesh.geometry;
    ensureUV(g, THREE);
    const uv = g.getAttribute("uv");
    if (!uv) return;
    const m = mesh.material as import("three").MeshStandardMaterial;
    const SIZE = 2048;
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, SIZE, SIZE);
    const img = m.map?.image as CanvasImageSource | undefined;
    if (img) {
      try {
        ctx.drawImage(img, 0, 0, SIZE, SIZE);
      } catch {}
    }
    // UV borders (guide) on top
    const flip = m.map ? m.map.flipY : false;
    const px = (i: number) => uv.getX(i) * SIZE;
    const py = (i: number) => (flip ? 1 - uv.getY(i) : uv.getY(i)) * SIZE;
    ctx.strokeStyle = "rgba(0,0,0,0.55)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    const idx = g.index;
    const count = idx ? idx.count : uv.count;
    for (let i = 0; i < count; i += 3) {
      const a = idx ? idx.getX(i) : i;
      const b = idx ? idx.getX(i + 1) : i + 1;
      const c = idx ? idx.getX(i + 2) : i + 2;
      ctx.moveTo(px(a), py(a));
      ctx.lineTo(px(b), py(b));
      ctx.lineTo(px(c), py(c));
      ctx.lineTo(px(a), py(a));
    }
    ctx.stroke();
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download =
      (fileName?.replace(/\.[^.]+$/, "") || "model") + "_uv_template.png";
    a.click();
    trackEvent("3d_uv_template_export");
  }, [fileName]);

  const exportModel = useCallback(
    async (format: ExportFormat) => {
      const geo = geometryRef.current;
      const mesh = currentMeshRef.current;
      if (!geo || !mesh) return;

      try {
        const THREE = await import("three");
        const scene = new THREE.Scene();
        // Export the whole model (all parts, with their per-part colors), not
        // just the primary mesh — so a recoloured configurator exports correctly.
        scene.add((rootRef.current ?? mesh).clone());
        let blob: Blob;

        if (format === "stl") {
          const { STLExporter } = await import(
            "three/examples/jsm/exporters/STLExporter.js"
          );
          const result = new STLExporter().parse(scene, { binary: true });
          blob = new Blob([result], { type: "model/stl" });
        } else if (format === "obj") {
          const { OBJExporter } = await import(
            "three/examples/jsm/exporters/OBJExporter.js"
          );
          const result = new OBJExporter().parse(scene);
          blob = new Blob([result], { type: "text/plain" });
        } else if (format === "glb") {
          const { GLTFExporter } = await import(
            "three/examples/jsm/exporters/GLTFExporter.js"
          );
          const result = await new Promise<ArrayBuffer>((resolve, reject) =>
            new GLTFExporter().parse(
              scene,
              (buf) => resolve(buf as ArrayBuffer),
              reject,
              { binary: true }
            )
          );
          blob = new Blob([result], { type: "model/gltf-binary" });
        } else {
          const { PLYExporter } = await import(
            "three/examples/jsm/exporters/PLYExporter.js"
          );
          const result = await new Promise<ArrayBuffer | string>((resolve) =>
            new PLYExporter().parse(scene, (data) => resolve(data), {})
          );
          blob = new Blob([result as BlobPart], {
            type: "application/octet-stream",
          });
        }

        const baseName = (fileName ?? "model").replace(/\.[^.]+$/, "");
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${baseName}.${format}`;
        a.click();
        URL.revokeObjectURL(url);

        trackEvent("3d_viewer_export_single", { format });

        // Moment-of-value upsell after single download
        const dlCount = incrementDownloadCount();
        if (shouldShowSuccessUpsell(isPro, dlCount)) {
          markSuccessUpsellShown();
          setSuccessUpsellOpen(true);
        }
      } catch (err) {
        console.error("Export failed", err);
      }
    },
    [fileName, isPro]
  );

  // ── Screenshot ────────────────────────────────────────────────────────────
  const takeScreenshot = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${(fileName ?? "model").replace(/\.[^.]+$/, "")}-screenshot.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }, [fileName]);

  // High-resolution render: renders the current view at the chosen resolution,
  // optional transparent background (for product shots), then restores the view.
  const renderImage = useCallback(() => {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const mount = mountRef.current;
    if (!renderer || !scene || !camera) return;
    setRendering(true);
    const dispW = mount?.clientWidth || 786;
    const dispH = mount?.clientHeight || 420;
    const outW = renderRes;
    const outH = Math.max(1, Math.round(renderRes * (dispH / dispW)));
    const oldPR = renderer.getPixelRatio();
    const oldBg = scene.background;
    const oldGrid = gridRef.current?.visible ?? true;
    const oldAspect = camera.aspect;

    renderer.setPixelRatio(1);
    renderer.setSize(outW, outH, false);
    camera.aspect = outW / outH;
    camera.updateProjectionMatrix();
    if (gridRef.current) gridRef.current.visible = false; // clean product render
    if (renderTransparent) {
      scene.background = null;
      renderer.setClearAlpha(0);
    }
    renderer.render(scene, camera);

    renderer.domElement.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${(fileName ?? "model").replace(/\.[^.]+$/, "")}-render.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
      // Restore the live view.
      renderer.setPixelRatio(oldPR);
      renderer.setSize(dispW, dispH, false);
      camera.aspect = oldAspect;
      camera.updateProjectionMatrix();
      scene.background = oldBg;
      renderer.setClearAlpha(1);
      if (gridRef.current) gridRef.current.visible = oldGrid;
      setRendering(false);
    }, "image/png");
    trackEvent("3d_render_export", {
      res: renderRes,
      transparent: renderTransparent,
    });
  }, [renderRes, renderTransparent, fileName]);

  // ── Reset view ────────────────────────────────────────────────────────────
  const resetView = useCallback(() => {
    if (!cameraRef.current || !controlsRef.current || !currentMeshRef.current)
      return;
    const p = import("three").then(({ Box3, Vector3 }) => {
      const b = new Box3().setFromObject(currentMeshRef.current!);
      const size = new Vector3();
      b.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = cameraRef.current!.fov * (Math.PI / 180);
      const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.8;
      cameraRef.current!.position.set(cameraZ * 0.6, cameraZ * 0.5, cameraZ);
      cameraRef.current!.lookAt(0, 0, 0);
      (
        controlsRef.current as unknown as import("three/examples/jsm/controls/OrbitControls.js").OrbitControls
      ).target.set(0, 0, 0);
      controlsRef.current!.update();
    });
    void p;
  }, []);

  // ── Batch: handle file queue ──────────────────────────────────────────────
  const handleBatchFiles = useCallback(
    (files: FileList | File[]) => {
      const arr = Array.from(files).filter((f) => {
        const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
        return ["stl", "obj", "glb", "gltf", "ply"].includes(ext);
      });
      if (arr.length === 0) return;

      const queued: QueuedFile[] = arr.map((f) => ({
        file: f,
        status: "pending",
        targetFormat: batchFormat,
      }));
      setBatchFiles(queued);
      setBatchDone(false);
      setBatchZipBlob(null);
      setErrorMsg("");
    },
    [batchFormat]
  );

  const onBatchDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      handleBatchFiles(e.dataTransfer.files);
    },
    [handleBatchFiles]
  );

  const onBatchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) handleBatchFiles(e.target.files);
      e.target.value = "";
    },
    [handleBatchFiles]
  );

  const removeBatchFile = useCallback((idx: number) => {
    setBatchFiles((prev) => prev.filter((_, i) => i !== idx));
    setBatchDone(false);
    setBatchZipBlob(null);
  }, []);

  // ── Batch: Day Pass polling ───────────────────────────────────────────────
  const startPolling = useCallback(
    (sessionId: string) => {
      stopPolling();
      setPollTimedOut(false);
      pollStartRef.current = Date.now();

      pollTimerRef.current = setInterval(async () => {
        if (Date.now() - pollStartRef.current > POLL_MAX_MS) {
          stopPolling();
          setPollTimedOut(true);
          return;
        }
        try {
          const res = await fetch(
            `/api/day-pass/checkout-status?session_id=${encodeURIComponent(sessionId)}`
          );
          if (!res.ok) return;
          const data = (await res.json()) as { paid: boolean; email?: string };
          if (data.paid) {
            stopPolling();
            if (data.email) setGuestEmail(data.email);
            setAwaitingPayment(false);
            trackEvent("3d_viewer_daypass_unlocked");
            // Trigger batch convert automatically after unlock
            setBatchFiles((prev) =>
              prev.map((f) => ({ ...f, status: "pending" as const }))
            );
            // runBatchConvert will be called by the effect below
            setSuccessUpsellOpen(false);
          }
        } catch {
          // network hiccup, keep polling
        }
      }, POLL_INTERVAL_MS);
    },
    [stopPolling]
  );

  const handleUnlockClick = useCallback(async () => {
    trackEvent("3d_viewer_daypass_checkout_start");
    try {
      const res = await fetch("/api/checkout/day-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "/tools/3d-viewer" }),
      });

      if (res.status === 409) {
        // Already has a Day Pass — proceed
        setUpsellOpen(false);
        return;
      }

      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        setErrorMsg(body.error ?? "Could not start checkout. Please try again.");
        return;
      }

      const { url, sessionId } = (await res.json()) as {
        url: string;
        sessionId: string;
      };

      const popup = window.open(
        url,
        "_blank",
        "width=520,height=720,noopener,noreferrer"
      );
      if (popup) {
        setUpsellOpen(false);
        setAwaitingPayment(true);
        startPolling(sessionId);
      } else {
        window.location.href = url;
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
    }
  }, [startPolling]);

  // ── Batch: convert all and zip ────────────────────────────────────────────
  const runBatchConvert = useCallback(async () => {
    if (batchFiles.length === 0) return;

    setBatchConverting(true);
    setBatchDone(false);
    setBatchZipBlob(null);
    setErrorMsg("");

    const updated = [...batchFiles].map((f) => ({
      ...f,
      status: "converting" as const,
    }));
    setBatchFiles(updated);

    const results: QueuedFile[] = [];
    for (let i = 0; i < updated.length; i++) {
      const item = updated[i];
      try {
        const blob = await convertFileToBlob(item.file, batchFormat);
        results.push({ ...item, status: "done", blob, targetFormat: batchFormat });
      } catch {
        results.push({ ...item, status: "error", targetFormat: batchFormat });
      }
      setBatchFiles([...results, ...updated.slice(i + 1)]);
    }

    // Build ZIP
    const zip = new JSZip();
    for (const r of results) {
      if (r.status === "done" && r.blob) {
        const baseName = r.file.name.replace(/\.[^.]+$/, "");
        zip.file(`${baseName}.${batchFormat}`, r.blob);
      }
    }
    const zipBlob = await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });

    setBatchZipBlob(zipBlob);
    setBatchConverting(false);
    setBatchDone(true);
    trackEvent("3d_viewer_batch_done", {
      files: results.length,
      format: batchFormat,
    });
  }, [batchFiles, batchFormat]);

  // Auto-trigger batch convert when files arrive and user is pro or just unlocked
  const prevBatchLengthRef = useRef(0);
  useEffect(() => {
    if (
      batchFiles.length > 0 &&
      batchFiles.every((f) => f.status === "pending") &&
      batchFiles.length !== prevBatchLengthRef.current &&
      (isPro || searchParams?.get("daypass") === "active")
    ) {
      prevBatchLengthRef.current = batchFiles.length;
      runBatchConvert();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batchFiles, isPro, searchParams]);

  // ── Batch: initiate convert (gate if needed) ──────────────────────────────
  const handleBatchConvert = useCallback(() => {
    if (batchFiles.length === 0) return;

    // Gate: more than free limit and not pro
    if (batchFiles.length > FREE_BATCH_LIMIT && !isPro) {
      trackEvent("3d_viewer_batch_gate_shown", { files: batchFiles.length });
      setUpsellOpen(true);
      return;
    }

    runBatchConvert();
  }, [batchFiles, isPro, runBatchConvert]);

  // ── Download ZIP ──────────────────────────────────────────────────────────
  const handleDownloadZip = useCallback(() => {
    if (!batchZipBlob) return;
    saveAs(batchZipBlob, `3d-models-converted-${batchFormat}.zip`);
    trackEvent("3d_viewer_batch_zip_download", { format: batchFormat });
  }, [batchZipBlob, batchFormat]);

  // ── Stat formatting ───────────────────────────────────────────────────────
  const fmt = (v: number, u: Unit) =>
    u === "mm" ? `${v.toFixed(2)} mm` : `${(v / 25.4).toFixed(3)} in`;
  const fmtVol = (v: number, u: Unit) =>
    u === "mm"
      ? `${v.toFixed(2)} mm³`
      : `${(v / 16387.064).toFixed(4)} in³`;
  const fmtArea = (v: number, u: Unit) =>
    u === "mm"
      ? `${v.toFixed(2)} mm²`
      : `${(v / 645.16).toFixed(4)} in²`;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">

      {/* Day Pass redirect banner */}
      {justUnlockedViaRedirect && (
        <div className="mb-4 flex items-start gap-3 px-4 py-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-xl">
          <CheckCircle2
            size={18}
            className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"
            strokeWidth={1.5}
          />
          <div>
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              You are unlocked for 24 hours!
            </p>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
              Add your 3D files to the batch panel below to convert and download the ZIP.
            </p>
          </div>
        </div>
      )}

      {/* Privacy badge */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#16A34A]/30 bg-[#16A34A]/8 text-xs text-[#16A34A] font-medium">
          <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />
          100% in your browser. Your 3D file never leaves your device.
        </div>
      </div>

      {/* Mode toggle */}
      <div className="flex justify-center mb-5">
        <div className="flex rounded-xl overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A]">
          <button
            onClick={() => setBatchMode(false)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              !batchMode
                ? "bg-[#6366F1] text-white"
                : "bg-white dark:bg-[#1E1E1E] text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
            }`}
          >
            View &amp; Convert
          </button>
          <button
            onClick={() => setBatchMode(true)}
            className={`px-4 py-2 text-sm font-medium transition-colors inline-flex items-center gap-1.5 ${
              batchMode
                ? "bg-[#6366F1] text-white"
                : "bg-white dark:bg-[#1E1E1E] text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
            }`}
          >
            <FolderArchive className="h-3.5 w-3.5" strokeWidth={1.5} />
            Batch Convert + ZIP
            {!isPro && (
              <span className="ml-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20">
                Pro
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── VIEWER MODE ── */}
      {!batchMode && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 lg:items-start">
          {/* Left: viewer + drop zone — sticky so it stays in view while the
              right-hand tool panels scroll. */}
          <div className="space-y-3 lg:sticky lg:top-4 lg:self-start">
            {/* Drop zone is rendered as an overlay inside the persistent mount below */}

            {/* Toolbar — only once a file is loaded */}
            {fileName && (
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs font-mono text-[#525252] dark:text-[#A3A3A3] truncate max-w-[240px]">
                    {fileName}
                  </span>
                  <label className="cursor-pointer inline-flex items-center gap-1 text-xs text-[#6366F1] hover:underline">
                    <input
                      type="file"
                      accept=".stl,.obj,.glb,.gltf,.ply"
                      className="sr-only"
                      onChange={onFileChange}
                    />
                    Change file
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={resetView}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] text-xs text-[#525252] dark:text-[#A3A3A3] hover:border-[#6366F1]/60 transition-colors"
                    title="Reset camera view"
                  >
                    <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Reset view
                  </button>
                  <button
                    onClick={takeScreenshot}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] text-xs text-[#525252] dark:text-[#A3A3A3] hover:border-[#6366F1]/60 transition-colors"
                    title="Save PNG screenshot"
                  >
                    <Camera className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Screenshot
                  </button>
                </div>
              </div>
            )}

            {/* Persistent viewer mount — ALWAYS rendered so the WebGL canvas is
                created at the correct size and survives the empty -> loaded swap.
                Previously two conditional divs shared this ref, so the canvas was
                built inside a hidden 1x1 node and lost when a file loaded (blank
                viewport, stats still worked). The drop zone is now an overlay. */}
            <div
              ref={mountRef}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className="relative w-full rounded-xl overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A]"
              style={{ height: 420 }}
            >
              {!fileName && (
                <label
                  className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 cursor-pointer border-2 border-dashed rounded-xl transition-colors ${
                    isDragging
                      ? "border-[#6366F1] bg-[#6366F1]/5"
                      : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#111] hover:border-[#6366F1]/60"
                  }`}
                >
                  <input
                    type="file"
                    accept=".stl,.obj,.glb,.gltf,.ply"
                    className="sr-only"
                    onChange={onFileChange}
                  />
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "#6366F115" }}
                  >
                    <Upload className="h-7 w-7 text-[#6366F1]" strokeWidth={1.5} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
                      Drop a 3D file here or click to browse
                    </p>
                    <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                      Supports STL, OBJ, GLB, GLTF, PLY — Free, no upload
                    </p>
                  </div>
                </label>
              )}
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                  <div className="text-sm text-white font-medium animate-pulse">
                    Loading model...
                  </div>
                </div>
              )}
              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a2e] z-20">
                  <div className="text-sm text-red-400 text-center max-w-xs px-4">
                    {error}
                  </div>
                </div>
              )}
            </div>

            {/* Export buttons — free single export */}
            {fileName && !loading && !error && (
              <div className="flex flex-wrap gap-2">
                <span className="flex items-center gap-1 text-xs text-[#737373] dark:text-[#A3A3A3]">
                  <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Export as:
                </span>
                {(["stl", "obj", "glb", "ply"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => exportModel(f)}
                    className="px-3 py-1.5 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] text-xs font-mono font-semibold text-[#171717] dark:text-[#E5E5E5] hover:border-[#6366F1]/60 hover:text-[#6366F1] transition-colors uppercase"
                  >
                    {f.toUpperCase()}
                  </button>
                ))}
              </div>
            )}

            {/* Batch CTA nudge */}
            {fileName && !loading && !error && (
              <div className="flex items-center gap-2 px-3 py-2.5 bg-[#F5F5F5] dark:bg-[#252525] rounded-lg">
                <FolderArchive
                  size={13}
                  className="text-[#6366F1] shrink-0"
                  strokeWidth={1.5}
                />
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                  Need to convert multiple 3D files at once?{" "}
                  <button
                    onClick={() => setBatchMode(true)}
                    className="text-[#6366F1] hover:underline font-medium"
                  >
                    Use Batch Convert
                  </button>{" "}
                  to get a single ZIP.
                </p>
              </div>
            )}
          </div>

          {/* Right: stats panel */}
          <div className="space-y-3">
            <CollapsibleSection
              title="Mesh Stats"
              headerRight={
                <div className="flex rounded-lg overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A]">
                  {(["mm", "inch"] as Unit[]).map((u) => (
                    <button
                      key={u}
                      onClick={() => setUnit(u)}
                      className={`px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                        unit === u
                          ? "bg-[#6366F1] text-white"
                          : "bg-white dark:bg-[#1E1E1E] text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              }
            >
              <div className="space-y-3">
                {stats ? (
                  <>
                    <StatRow
                      label="Triangles"
                      value={stats.triangles.toLocaleString()}
                    />
                    <StatRow
                      label="Vertices"
                      value={stats.vertices.toLocaleString()}
                    />
                    <StatRow label="Width (X)" value={fmt(stats.bbX, unit)} />
                    <StatRow label="Height (Y)" value={fmt(stats.bbY, unit)} />
                    <StatRow label="Depth (Z)" value={fmt(stats.bbZ, unit)} />
                    <StatRow
                      label="Volume (approx.)"
                      value={fmtVol(stats.volume, unit)}
                    />
                    <StatRow
                      label="Surface area"
                      value={fmtArea(stats.surfaceArea, unit)}
                    />
                  </>
                ) : (
                  <div className="py-8 text-center text-xs text-[#A3A3A3]">
                    Load a 3D file to see stats
                  </div>
                )}
              </div>
            </CollapsibleSection>

            {/* Parts configurator — recolor each part independently (multi-part) */}
            {parts.length > 1 && (
              <CollapsibleSection title={`Parts (${parts.length})`}>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {parts.map((p) => (
                    <div key={p.id} className="flex items-center justify-between gap-2">
                      <span className="text-xs text-[#737373] dark:text-[#A3A3A3] truncate">
                        {p.name}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className="h-4 w-4 rounded-full border border-[#E5E5E5] dark:border-[#2A2A2A]"
                          style={{ backgroundColor: p.color }}
                        />
                        <input
                          type="color"
                          value={p.color}
                          onChange={(e) => setPartColor(p.id, e.target.value)}
                          aria-label={`Color ${p.name}`}
                          className="h-6 w-6 rounded cursor-pointer bg-transparent border border-[#E5E5E5] dark:border-[#2A2A2A] p-0"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[10px] text-[#A3A3A3] leading-relaxed">
                  Export as GLB to keep the colors. STL and OBJ do not store color.
                </p>
              </CollapsibleSection>
            )}

            {/* Material / appearance — only once a mesh is loaded */}
            {fileName && (
              <CollapsibleSection title="Material" defaultOpen={false}>
                {/* Color */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-[#737373] dark:text-[#A3A3A3]">Color</span>
                  <div className="flex items-center gap-1.5">
                    {["#8888ff", "#e5e5e5", "#f97316", "#22c55e", "#ef4444", "#111111"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setMatColor(c)}
                        aria-label={`Set color ${c}`}
                        className={`h-5 w-5 rounded-full border transition-transform hover:scale-110 ${
                          matColor.toLowerCase() === c ? "ring-2 ring-[#6366F1] ring-offset-1 dark:ring-offset-[#1E1E1E]" : "border-[#E5E5E5] dark:border-[#2A2A2A]"
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                    <input
                      type="color"
                      value={matColor}
                      onChange={(e) => setMatColor(e.target.value)}
                      aria-label="Custom color"
                      className="h-5 w-5 rounded cursor-pointer bg-transparent border border-[#E5E5E5] dark:border-[#2A2A2A] p-0"
                    />
                  </div>
                </div>

                {/* Wireframe */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-[#737373] dark:text-[#A3A3A3]">Wireframe</span>
                  <button
                    onClick={() => setWireframe((w) => !w)}
                    role="switch"
                    aria-checked={wireframe}
                    className={`relative h-5 w-9 rounded-full transition-colors ${wireframe ? "bg-[#6366F1]" : "bg-[#E5E5E5] dark:bg-[#3A3A3A]"}`}
                  >
                    <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${wireframe ? "translate-x-4" : "translate-x-0.5"}`} />
                  </button>
                </div>

                {/* Metalness */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#737373] dark:text-[#A3A3A3]">Metalness</span>
                    <span className="text-[10px] font-mono text-[#A3A3A3]">{metalness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range" min={0} max={1} step={0.05} value={metalness}
                    onChange={(e) => setMetalness(parseFloat(e.target.value))}
                    className="w-full accent-[#6366F1]"
                  />
                </div>

                {/* Roughness */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#737373] dark:text-[#A3A3A3]">Roughness</span>
                    <span className="text-[10px] font-mono text-[#A3A3A3]">{roughness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range" min={0} max={1} step={0.05} value={roughness}
                    onChange={(e) => setRoughness(parseFloat(e.target.value))}
                    className="w-full accent-[#6366F1]"
                  />
                </div>
              </CollapsibleSection>
            )}

            {/* Scene realism — environment reflections + contact shadow */}
            {fileName && (
              <CollapsibleSection title="Scene" defaultOpen={false}>
                {([
                  ["Reflections", envReflections, setEnvReflections],
                  ["Ground shadow", groundShadow, setGroundShadow],
                  ["Grid", showGrid, setShowGrid],
                ] as const).map(([label, val, set], i) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between ${i < 2 ? "mb-3" : ""}`}
                  >
                    <span className="text-xs text-[#737373] dark:text-[#A3A3A3]">{label}</span>
                    <button
                      onClick={() => set((v: boolean) => !v)}
                      role="switch"
                      aria-checked={val}
                      aria-label={label}
                      className={`relative h-5 w-9 rounded-full transition-colors ${val ? "bg-[#6366F1]" : "bg-[#E5E5E5] dark:bg-[#3A3A3A]"}`}
                    >
                      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${val ? "translate-x-4" : "translate-x-0.5"}`} />
                    </button>
                  </div>
                ))}
              </CollapsibleSection>
            )}

            {/* Environment (HDRI) + backdrop */}
            {fileName && (
              <CollapsibleSection
                title="Environment"
                defaultOpen={false}
                headerRight={
                  envLoading ? (
                    <span className="text-[10px] text-[#A3A3A3] animate-pulse">loading…</span>
                  ) : undefined
                }
              >
                {/* HDRI presets — each lights, reflects and can back the scene */}
                <div className="grid grid-cols-3 gap-1.5 mb-3">
                  {([
                    ["soft", "Soft"],
                    ["studio", "Studio"],
                    ["sunset", "Sunset"],
                    ["warehouse", "Warehouse"],
                    ["city", "City"],
                  ] as const).map(([mode, label]) => (
                    <button
                      key={mode}
                      onClick={() => setEnv(mode)}
                      className={`px-2 py-1.5 rounded-lg text-[11px] font-medium border transition-colors ${
                        env === mode
                          ? "border-[#6366F1] bg-[#6366F1]/10 text-[#6366F1]"
                          : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#737373] dark:text-[#A3A3A3] hover:border-[#6366F1]/50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Show the HDRI as the 360 backdrop (only meaningful for real HDRIs) */}
                {env !== "soft" && (
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-[#737373] dark:text-[#A3A3A3]">Show in background</span>
                    <button
                      onClick={() => setShowEnvBg((v) => !v)}
                      role="switch"
                      aria-checked={showEnvBg}
                      aria-label="Show environment in background"
                      className={`relative h-5 w-9 rounded-full transition-colors ${showEnvBg ? "bg-[#6366F1]" : "bg-[#E5E5E5] dark:bg-[#3A3A3A]"}`}
                    >
                      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${showEnvBg ? "translate-x-4" : "translate-x-0.5"}`} />
                    </button>
                  </div>
                )}

                {/* Plain backdrop (used when the HDRI isn't shown as background) */}
                {!(env !== "soft" && showEnvBg) && (
                  <>
                    <p className="text-[10px] uppercase tracking-wide text-[#A3A3A3] mb-1.5">Backdrop</p>
                    <div className="grid grid-cols-3 gap-1.5 mb-2">
                      {([
                        ["studio", "Studio"],
                        ["white", "White"],
                        ["dark", "Dark"],
                      ] as const).map(([mode, label]) => (
                        <button
                          key={mode}
                          onClick={() => setBgMode(mode)}
                          className={`px-2 py-1.5 rounded-lg text-[11px] font-medium border transition-colors ${
                            bgMode === mode
                              ? "border-[#6366F1] bg-[#6366F1]/10 text-[#6366F1]"
                              : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#737373] dark:text-[#A3A3A3] hover:border-[#6366F1]/50"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#737373] dark:text-[#A3A3A3]">Custom color</span>
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => {
                          setBgColor(e.target.value);
                          setBgMode("color");
                        }}
                        aria-label="Background color"
                        className="h-6 w-6 rounded cursor-pointer bg-transparent border border-[#E5E5E5] dark:border-[#2A2A2A] p-0"
                      />
                    </div>
                  </>
                )}
              </CollapsibleSection>
            )}

            {/* Render — export a high-res image of the current view */}
            {fileName && (
              <CollapsibleSection title="Render">
                <p className="text-[10px] uppercase tracking-wide text-[#A3A3A3] mb-1.5">
                  Resolution
                </p>
                <div className="grid grid-cols-3 gap-1.5 mb-3">
                  {([
                    [1024, "1K"],
                    [2048, "2K"],
                    [4096, "4K"],
                  ] as const).map(([res, label]) => (
                    <button
                      key={res}
                      onClick={() => setRenderRes(res)}
                      className={`px-2 py-1.5 rounded-lg text-[11px] font-medium border transition-colors ${
                        renderRes === res
                          ? "border-[#6366F1] bg-[#6366F1]/10 text-[#6366F1]"
                          : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#737373] dark:text-[#A3A3A3] hover:border-[#6366F1]/50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-[#737373] dark:text-[#A3A3A3]">Transparent background</span>
                  <button
                    onClick={() => setRenderTransparent((v) => !v)}
                    role="switch"
                    aria-checked={renderTransparent}
                    aria-label="Transparent background"
                    className={`relative h-5 w-9 rounded-full transition-colors ${renderTransparent ? "bg-[#6366F1]" : "bg-[#E5E5E5] dark:bg-[#3A3A3A]"}`}
                  >
                    <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${renderTransparent ? "translate-x-4" : "translate-x-0.5"}`} />
                  </button>
                </div>
                <button
                  onClick={renderImage}
                  disabled={rendering}
                  className="flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-lg bg-[#6366F1] hover:bg-[#5457E5] text-white text-xs font-semibold transition-colors disabled:opacity-60"
                >
                  {rendering ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
                  ) : (
                    <Camera className="h-3.5 w-3.5" strokeWidth={1.5} />
                  )}
                  {rendering ? "Rendering..." : "Render PNG"}
                </button>
                <p className="mt-2 text-[10px] text-[#A3A3A3] leading-relaxed">
                  Renders the current angle, lighting and background. Rotate/zoom
                  to frame it first. Transparent background is great for product
                  shots on any page.
                </p>
              </CollapsibleSection>
            )}

            {/* Controls guide */}
            <CollapsibleSection title="Controls" defaultOpen={false}>
              <div className="space-y-1.5 text-xs text-[#737373] dark:text-[#A3A3A3]">
                <div className="flex gap-2">
                  <span className="font-mono text-[10px] bg-[#F5F5F5] dark:bg-[#2A2A2A] px-1.5 py-0.5 rounded">
                    Drag
                  </span>
                  <span>Rotate model</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-mono text-[10px] bg-[#F5F5F5] dark:bg-[#2A2A2A] px-1.5 py-0.5 rounded">
                    Scroll
                  </span>
                  <span>Zoom in / out</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-mono text-[10px] bg-[#F5F5F5] dark:bg-[#2A2A2A] px-1.5 py-0.5 rounded">
                    Right-drag
                  </span>
                  <span>Pan</span>
                </div>
              </div>
            </CollapsibleSection>

            {/* Supported formats */}
            <CollapsibleSection title="Supported formats" defaultOpen={false}>
              <div className="flex flex-wrap gap-1.5">
                {["STL", "OBJ", "GLB", "GLTF", "PLY"].map((f) => (
                  <span
                    key={f}
                    className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold"
                    style={{ backgroundColor: "#6366F115", color: "#6366F1" }}
                  >
                    {f}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-[#A3A3A3] leading-relaxed">
                Input: STL (binary and ASCII), OBJ, GLB, GLTF, PLY. Export: STL, OBJ, GLB, PLY.
              </p>
            </CollapsibleSection>
          </div>
        </div>
      )}

      {/* ── BATCH MODE ── */}
      {batchMode && (
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Info banner */}
          <div className="flex items-start gap-3 px-4 py-3 bg-[#6366F1]/5 border border-[#6366F1]/20 rounded-xl">
            <FolderArchive
              size={16}
              className="text-[#6366F1] shrink-0 mt-0.5"
              strokeWidth={1.5}
            />
            <div>
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                Batch Convert 3D files to ZIP
              </p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mt-0.5">
                Drop multiple STL, OBJ, GLB, GLTF or PLY files. Choose a target
                format, convert them all, and download a single ZIP. Free for
                single files. Batch ZIP requires a Day Pass ($2.99) or Pro plan.
              </p>
            </div>
          </div>

          {/* Error msg */}
          {errorMsg && (
            <div className="flex items-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-xl">
              <AlertCircle
                size={16}
                className="text-red-500 shrink-0"
                strokeWidth={1.5}
              />
              <p className="text-sm text-red-700 dark:text-red-400">{errorMsg}</p>
            </div>
          )}

          {/* Drop zone */}
          {!awaitingPayment && (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={onBatchDrop}
              className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#6366F1]/60 transition-colors"
            >
              <label className="flex flex-col items-center gap-3 cursor-pointer">
                <input
                  type="file"
                  accept=".stl,.obj,.glb,.gltf,.ply"
                  multiple
                  className="sr-only"
                  onChange={onBatchInputChange}
                />
                <Upload className="h-8 w-8 text-[#6366F1]" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                    Drop 3D files here or click to select
                  </p>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                    STL, OBJ, GLB, GLTF, PLY — multiple files supported
                  </p>
                </div>
              </label>
            </div>
          )}

          {/* Format selector */}
          {batchFiles.length > 0 && !awaitingPayment && (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs text-[#737373] dark:text-[#A3A3A3] font-medium">
                Convert all to:
              </span>
              {(["stl", "obj", "glb", "ply"] as ExportFormat[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setBatchFormat(f)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold transition-colors uppercase ${
                    batchFormat === f
                      ? "border-[#6366F1] bg-[#6366F1]/10 text-[#6366F1]"
                      : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#737373] hover:border-[#6366F1]/60 hover:text-[#6366F1]"
                  }`}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
          )}

          {/* File queue */}
          {batchFiles.length > 0 && !awaitingPayment && (
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl overflow-hidden divide-y divide-[#F5F5F5] dark:divide-[#2A2A2A]">
              {batchFiles.map((item, i) => (
                <div
                  key={`${item.file.name}-${i}`}
                  className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#191919]"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#171717] dark:text-[#E5E5E5] truncate">
                      {item.file.name}
                    </p>
                    <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">
                      {(item.file.size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                  {item.status === "pending" && (
                    <span className="text-xs text-[#A3A3A3]">Queued</span>
                  )}
                  {item.status === "converting" && (
                    <Loader2
                      size={14}
                      className="text-[#6366F1] animate-spin"
                      strokeWidth={1.5}
                    />
                  )}
                  {item.status === "done" && (
                    <CheckCircle2
                      size={14}
                      className="text-emerald-500"
                      strokeWidth={1.5}
                    />
                  )}
                  {item.status === "error" && (
                    <AlertCircle
                      size={14}
                      className="text-red-400"
                      strokeWidth={1.5}
                    />
                  )}
                  {item.status === "pending" && !batchConverting && (
                    <button
                      onClick={() => removeBatchFile(i)}
                      className="text-[#A3A3A3] hover:text-[#737373] transition-colors"
                      aria-label="Remove file"
                    >
                      <X size={14} strokeWidth={1.5} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Pro gate notice for batch */}
          {batchFiles.length > FREE_BATCH_LIMIT && !isPro && !batchDone && !awaitingPayment && (
            <div className="border border-[#6366F1]/30 bg-[#6366F1]/5 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#6366F1]/10 flex items-center justify-center shrink-0">
                  <Lock size={16} className="text-[#6366F1]" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-0.5">
                    Batch ZIP requires a Day Pass or Pro plan
                  </p>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mb-4">
                    Convert all {batchFiles.length} files and download a single ZIP.
                    One pass, all tools, 24 hours.
                  </p>
                  <button
                    onClick={handleBatchConvert}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-[#6366F1] hover:bg-[#4F46E5] active:scale-[0.98] text-white rounded-xl transition-all shadow-sm"
                  >
                    <Zap size={15} strokeWidth={2} />
                    Unlock &amp; convert all for $2.99
                  </button>
                  <p className="text-xs text-[#A3A3A3] dark:text-[#525252] mt-2">
                    24-hour Day Pass · No subscription · Instant unlock
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Convert CTA for Pro or single file */}
          {batchFiles.length > 0 &&
            (isPro || batchFiles.length <= FREE_BATCH_LIMIT) &&
            !batchDone &&
            !batchConverting &&
            !awaitingPayment && (
              <button
                onClick={handleBatchConvert}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl transition-colors shadow-sm"
              >
                <Zap size={15} strokeWidth={2} />
                Convert {batchFiles.length} file{batchFiles.length !== 1 ? "s" : ""} to{" "}
                {batchFormat.toUpperCase()}
              </button>
            )}

          {/* Converting progress */}
          {batchConverting && (
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-2xl p-8 text-center">
              <Loader2
                className="mx-auto mb-4 text-[#6366F1] animate-spin"
                size={36}
                strokeWidth={1.5}
              />
              <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                Converting files...
              </p>
              <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mt-1">
                {batchFiles.filter((f) => f.status === "done").length} /{" "}
                {batchFiles.length} done
              </p>
            </div>
          )}

          {/* Awaiting payment */}
          {awaitingPayment && (
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-2xl p-8 text-center space-y-4">
              {pollTimedOut ? (
                <>
                  <AlertCircle
                    size={32}
                    className="mx-auto text-amber-500"
                    strokeWidth={1.5}
                  />
                  <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                    Payment window timed out
                  </p>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                    If you completed the payment, your pass is active. Try
                    clicking convert again.
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setPollTimedOut(false);
                        setAwaitingPayment(false);
                      }}
                      className="px-4 py-2 text-sm font-medium border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#171717] dark:text-[#E5E5E5] rounded-lg hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUnlockClick}
                      className="px-4 py-2 text-sm font-medium bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-lg transition-colors"
                    >
                      Try again
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative mx-auto w-10 h-10">
                    <Loader2
                      className="absolute inset-0 text-[#6366F1] animate-spin"
                      size={40}
                      strokeWidth={1.5}
                    />
                  </div>
                  <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                    Waiting for payment...
                  </p>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                    Complete the checkout in the popup. Conversion will start
                    automatically once payment goes through.
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#525252]">
                    <ExternalLink size={11} strokeWidth={1.5} />
                    Popup not showing?{" "}
                    <button
                      onClick={handleUnlockClick}
                      className="text-[#6366F1] hover:underline"
                    >
                      Open checkout again
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Guest unlock note */}
          {batchDone && guestEmail && !session?.user?.email && (
            <div className="flex items-start gap-2 px-3 py-2.5 bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/40 rounded-xl">
              <Zap
                size={13}
                className="text-sky-500 shrink-0 mt-0.5"
                strokeWidth={1.5}
              />
              <p className="text-xs text-sky-800 dark:text-sky-300">
                Your 24-hour pass is active.{" "}
                <a
                  href={`/auth/signin?callbackUrl=/tools/3d-viewer`}
                  className="font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
                >
                  Sign in with {guestEmail}
                </a>{" "}
                to use it across all tools.
              </p>
            </div>
          )}

          {/* Done: download ZIP */}
          {batchDone && batchZipBlob && (
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 px-4 py-3 bg-[#F0FDF4] dark:bg-[#052E16]/40 border border-[#BBF7D0] dark:border-[#166534]/40 rounded-xl">
                <CheckCircle2
                  size={16}
                  className="text-emerald-600 dark:text-emerald-400 shrink-0"
                  strokeWidth={1.5}
                />
                <p className="text-sm text-emerald-800 dark:text-emerald-300">
                  <span className="font-semibold">
                    {batchFiles.filter((f) => f.status === "done").length} file
                    {batchFiles.filter((f) => f.status === "done").length !== 1
                      ? "s"
                      : ""}{" "}
                    converted
                  </span>{" "}
                  to {batchFormat.toUpperCase()} — ready to download
                </p>
              </div>

              <div className="flex items-center gap-3 px-4 py-4 bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-[#6366F1]/10 flex items-center justify-center shrink-0">
                  <FolderArchive
                    size={18}
                    className="text-[#6366F1]"
                    strokeWidth={1.75}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                    3d-models-converted-{batchFormat}.zip
                  </p>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3]">
                    {batchFiles.filter((f) => f.status === "done").length} models
                    in {batchFormat.toUpperCase()} format
                  </p>
                </div>
                <button
                  onClick={handleDownloadZip}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#6366F1] hover:bg-[#4F46E5] active:scale-[0.98] text-white rounded-xl transition-all shadow-sm shrink-0"
                >
                  <Download size={14} strokeWidth={2} />
                  Download ZIP
                </button>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    setBatchFiles([]);
                    setBatchDone(false);
                    setBatchZipBlob(null);
                    setErrorMsg("");
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg transition-colors"
                >
                  <RotateCcw size={11} strokeWidth={1.5} />
                  Convert another batch
                </button>
                <div className="flex items-center gap-1.5 text-xs text-[#A3A3A3]">
                  <Lock size={11} strokeWidth={1.5} className="text-[#10B981]" />
                  Files never uploaded
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <FreeSignupAdBar tool="3d-viewer" />

      {/* Batch gate modal */}
      <ProUpsellModal
        open={upsellOpen}
        onClose={() => setUpsellOpen(false)}
        trigger="batch"
        filesDropped={batchFiles.length}
        freeLimit={FREE_BATCH_LIMIT}
      />

      {/* Moment-of-value upsell after single download */}
      <ProUpsellModal
        open={successUpsellOpen}
        onClose={() => setSuccessUpsellOpen(false)}
        trigger="success"
      />
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

// Give a geometry simple planar UVs when it has none (e.g. STL), so a texture
// at least shows. Models with real UVs (most GLB/OBJ) keep their own mapping.
function ensureUV(
  g: import("three").BufferGeometry,
  THREE: typeof import("three")
) {
  if (g.getAttribute("uv")) return;
  g.computeBoundingBox();
  const bb = g.boundingBox;
  if (!bb) return;
  const size = new THREE.Vector3();
  bb.getSize(size);
  const sx = size.x || 1;
  const sy = size.y || 1;
  const pos = g.getAttribute("position");
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = (pos.getX(i) - bb.min.x) / sx;
    uv[i * 2 + 1] = (pos.getY(i) - bb.min.y) / sy;
  }
  g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
}

function CollapsibleSection({
  title,
  defaultOpen = true,
  headerRight,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]">
      <div className="flex items-center justify-between gap-2 p-4">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 text-left flex-1 min-w-0"
          aria-expanded={open}
        >
          <ChevronDown
            className={`h-3.5 w-3.5 text-[#A3A3A3] shrink-0 transition-transform ${open ? "" : "-rotate-90"}`}
            strokeWidth={2}
          />
          <span className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] truncate">
            {title}
          </span>
        </button>
        {headerRight}
      </div>
      {open && <div className="px-4 pb-4 -mt-1">{children}</div>}
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs text-[#737373] dark:text-[#A3A3A3] truncate">
        {label}
      </span>
      <span className="text-xs font-mono font-semibold text-[#171717] dark:text-[#E5E5E5] shrink-0">
        {value}
      </span>
    </div>
  );
}
