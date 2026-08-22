"use client";

import { useEffect, useRef } from "react";

/**
 * 3D Viewer hero demo.
 * Renders a small Three.js scene with a spinning torus-knot mesh.
 * Kept lightweight: no controls, auto-rotate, neutral studio lighting.
 * Falls back to nothing if WebGL is unavailable.
 */
export default function ThreeDViewerHeroDemo() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    let cancelled = false;
    let frameId = 0;
    let renderer: import("three").WebGLRenderer | null = null;

    (async () => {
      const THREE = await import("three");
      if (cancelled || !mountRef.current) return;

      const width = mountRef.current.clientWidth || 420;
      const height = 260;

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      mountRef.current.appendChild(renderer.domElement);

      // Scene
      const scene = new THREE.Scene();

      // Lights
      const ambient = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambient);

      const key = new THREE.DirectionalLight(0xffffff, 1.2);
      key.position.set(5, 8, 5);
      scene.add(key);

      const fill = new THREE.DirectionalLight(0x6366f1, 0.6);
      fill.position.set(-5, 2, -4);
      scene.add(fill);

      const rim = new THREE.DirectionalLight(0xa855f7, 0.4);
      rim.position.set(0, -5, -5);
      scene.add(rim);

      // Mesh: torus knot
      const geometry = new THREE.TorusKnotGeometry(1.4, 0.42, 180, 24, 2, 3);
      const material = new THREE.MeshStandardMaterial({
        color: 0x8b8dff,
        metalness: 0.35,
        roughness: 0.3,
        wireframe: false,
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Wireframe overlay (subtle)
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        wireframe: true,
        opacity: 0.08,
        transparent: true,
      });
      const wireMesh = new THREE.Mesh(geometry, wireMat);
      scene.add(wireMesh);

      // Camera
      const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
      camera.position.set(0, 0, 6);

      // Animate
      let t = 0;
      function animate() {
        if (cancelled) return;
        frameId = requestAnimationFrame(animate);
        t += 0.008;
        mesh.rotation.x = t * 0.6;
        mesh.rotation.y = t;
        wireMesh.rotation.copy(mesh.rotation);
        renderer!.render(scene, camera);
      }
      animate();

      // Resize
      const ro = new ResizeObserver(() => {
        if (!mountRef.current || !renderer || !camera) return;
        const w = mountRef.current.clientWidth || 420;
        camera.aspect = w / height;
        camera.updateProjectionMatrix();
        renderer.setSize(w, height);
      });
      ro.observe(mountRef.current);

      return () => ro.disconnect();
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      if (renderer) {
        renderer.dispose();
        try {
          if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
          }
        } catch {}
      }
    };
  }, []);

  return (
    <div className="rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] overflow-hidden shadow-sm bg-[#0f0f1a]">
      {/* Window chrome */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ background: "#16162a", borderColor: "#2a2a4a" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[11px] font-mono text-[#5555aa]">3d-viewer</span>
        <div
          className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: "#6366F120", border: "1px solid #6366F140", color: "#a5b4fc" }}
        >
          <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          WebGL live
        </div>
      </div>

      {/* Canvas mount */}
      <div ref={mountRef} className="w-full" style={{ height: 260 }} />

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-4 py-1.5 border-t text-[10px]"
        style={{ background: "#6366F1", borderColor: "#6366F1" }}
      >
        <span style={{ color: "#C7D0FF" }}>TorusKnot</span>
        <span style={{ color: "#C7D0FF" }}>OrbitControls</span>
        <span style={{ color: "#C7D0FF" }}>Three.js</span>
      </div>
    </div>
  );
}
