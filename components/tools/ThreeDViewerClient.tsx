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
    const buffer = await file.arrayBuffer();
    const loader = new GLTFLoader();
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

  // ── Single-file viewer state ───────────────────────────────────────────────
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [stats, setStats] = useState<ModelStats | null>(null);
  const [unit, setUnit] = useState<Unit>("mm");
  const [error, setError] = useState<string | null>(null);
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
      const { OrbitControls } = await import(
        "three/examples/jsm/controls/OrbitControls.js"
      );
      if (cancelled || !mountRef.current) return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight || 420;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        preserveDrawingBuffer: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x1a1a2e, 1);
      renderer.shadowMap.enabled = true;
      rendererRef.current = renderer;
      canvasRef.current = renderer.domElement;
      mountRef.current.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const grid = new THREE.GridHelper(20, 20, 0x444466, 0x333355);
      scene.add(grid);

      const ambient = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambient);
      const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
      keyLight.position.set(5, 10, 7);
      keyLight.castShadow = true;
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

  // ── Load single file into viewer ──────────────────────────────────────────
  const loadFile = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);
    setStats(null);
    setFileName(file.name);

    try {
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
              (child as import("three").Mesh)
                .geometry as import("three").BufferGeometry
            ).clone();
          }
        });
      } else if (ext === "glb" || ext === "gltf") {
        const { GLTFLoader } = await import(
          "three/examples/jsm/loaders/GLTFLoader.js"
        );
        const buffer = await file.arrayBuffer();
        const loader = new GLTFLoader();
        const gltf = await new Promise<
          import("three/examples/jsm/loaders/GLTFLoader.js").GLTF
        >((resolve, reject) => {
          loader.parse(buffer, "", resolve, reject);
        });
        gltf.scene.traverse((child) => {
          if (!geometry && (child as import("three").Mesh).isMesh) {
            geometry = (
              (child as import("three").Mesh)
                .geometry as import("three").BufferGeometry
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
        throw new Error(
          `Unsupported format: .${ext}. Supported: STL, OBJ, GLB, GLTF, PLY.`
        );
      }

      if (!geometry) throw new Error("Could not extract geometry from the file.");

      (geometry as import("three").BufferGeometry).computeVertexNormals();
      const s = computeStats(geometry as import("three").BufferGeometry);
      geometryRef.current = geometry as import("three").BufferGeometry;
      setStats(s);

      (geometry as import("three").BufferGeometry).center();

      if (currentMeshRef.current && sceneRef.current) {
        sceneRef.current.remove(currentMeshRef.current);
        currentMeshRef.current.geometry.dispose();
        if (Array.isArray(currentMeshRef.current.material)) {
          currentMeshRef.current.material.forEach((m) => m.dispose());
        } else {
          (
            currentMeshRef.current.material as import("three").Material
          ).dispose();
        }
      }

      const material = new THREE.MeshStandardMaterial({
        color: 0x8888ff,
        metalness: 0.2,
        roughness: 0.5,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(
        geometry as import("three").BufferGeometry,
        material
      );
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      currentMeshRef.current = mesh;
      sceneRef.current?.add(mesh);

      if (cameraRef.current && controlsRef.current) {
        const box = new THREE.Box3().setFromObject(mesh);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = cameraRef.current.fov * (Math.PI / 180);
        const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.8;
        cameraRef.current.position.set(cameraZ * 0.6, cameraZ * 0.5, cameraZ);
        cameraRef.current.lookAt(0, 0, 0);
        (
          controlsRef.current as unknown as import("three/examples/jsm/controls/OrbitControls.js").OrbitControls
        ).target.set(0, 0, 0);
        controlsRef.current.update();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load 3D file.");
    } finally {
      setLoading(false);
    }
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
  const exportModel = useCallback(
    async (format: ExportFormat) => {
      const geo = geometryRef.current;
      const mesh = currentMeshRef.current;
      if (!geo || !mesh) return;

      try {
        const THREE = await import("three");
        const scene = new THREE.Scene();
        scene.add(mesh.clone());
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
          {/* Left: viewer + drop zone */}
          <div className="space-y-3">
            {!fileName && (
              <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors cursor-pointer min-h-[300px] ${
                  isDragging
                    ? "border-[#6366F1] bg-[#6366F1]/5"
                    : "border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#111] hover:border-[#6366F1]/60"
                }`}
              >
                <label className="flex flex-col items-center gap-3 cursor-pointer w-full h-full p-10">
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
              </div>
            )}

            {fileName && (
              <>
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

                <div
                  ref={mountRef}
                  className="relative w-full rounded-xl overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A]"
                  style={{ height: 420 }}
                >
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                      <div className="text-sm text-white font-medium animate-pulse">
                        Loading model...
                      </div>
                    </div>
                  )}
                  {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a2e] z-10">
                      <div className="text-sm text-red-400 text-center max-w-xs px-4">
                        {error}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Hidden mount when no file loaded */}
            {!fileName && (
              <div
                ref={mountRef}
                className="hidden"
                style={{ height: 1, width: 1 }}
                aria-hidden="true"
              />
            )}

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
            <div className="rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <div className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-[#6366F1]" strokeWidth={1.5} />
                  <span className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                    Mesh Stats
                  </span>
                </div>
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
              </div>
              <div className="p-4 space-y-3">
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
            </div>

            {/* Controls guide */}
            <div className="rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] p-4">
              <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
                Controls
              </p>
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
            </div>

            {/* Supported formats */}
            <div className="rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] p-4">
              <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
                Supported formats
              </p>
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
            </div>
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
