"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface WireframeTorusProps {
  mousePosition: { x: number; y: number };
  isMobile: boolean;
}

export default function WireframeTorus({ mousePosition, isMobile }: WireframeTorusProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRot = useRef({ x: 0, z: 0 });

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    // Auto-rotation on Y axis — siempre, es barato
    meshRef.current.rotation.y += 0.004;

    // Breathing pulse — solo desktop (ahorra actualizar uniform en GPU)
    if (!isMobile) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      const breath = 0.25 + Math.sin(clock.getElapsedTime() * 0.6) * 0.15;
      material.emissiveIntensity = breath;
    }

    // Mouse tracking — solo desktop
    if (!isMobile) {
      const winW = window.innerWidth;
      const winH = window.innerHeight;

      targetRot.current.x = ((mousePosition.y / winH) - 0.5) * 0.3;
      targetRot.current.z = ((mousePosition.x / winW) - 0.5) * 0.3;

      meshRef.current.rotation.x +=
        (targetRot.current.x - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.z +=
        (targetRot.current.z - meshRef.current.rotation.z) * 0.05;
    }
  });

  const geometryArgs: [number, number, number, number] = isMobile
    ? [1.5, 0.35, 48, 6]
    : [2, 0.6, 96, 12];

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={geometryArgs} />
      <meshStandardMaterial
        wireframe
        color="#d946ef"
        emissive="#8b5cf6"
        emissiveIntensity={0.3}
        transparent
        opacity={isMobile ? 0.08 : 0.15}
        depthWrite={false}
      />
    </mesh>
  );
}
