"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleRingProps {
  mousePosition: { x: number; y: number };
  isMobile: boolean;
}

export default function ParticleRing({ mousePosition, isMobile }: ParticleRingProps) {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);

  const { outer, inner } = useMemo(() => {
    const count = isMobile ? 40 : 100;
    const innerCount = isMobile ? 25 : 60;

    const makeRing = (n: number, radius: number, ySpread: number, zSpread: number) => {
      const positions = new Float32Array(n * 3);
      const colors = new Float32Array(n * 3);
      const colorA = new THREE.Color("#d946ef"); // fuchsia
      const colorB = new THREE.Color("#8b5cf6"); // violet

      for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2 + Math.random() * 0.1;
        const r = radius + (Math.random() - 0.5) * 0.5;

        positions[i * 3] = Math.cos(angle) * r;
        positions[i * 3 + 1] = (Math.random() - 0.5) * ySpread;
        positions[i * 3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * zSpread;

        const mix = Math.random();
        const color = colorA.clone().lerp(colorB, mix);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      return { positions, colors, count: n };
    };

    return {
      outer: makeRing(count, 3.2, 0.6, 0.4),
      inner: makeRing(innerCount, 1.8, 0.3, 0.2),
    };
  }, [isMobile]);

  useFrame(({ clock }) => {
    // Outer ring — rotates slower
    if (outerRef.current) {
      outerRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      outerRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.15) * 0.04;
    }

    // Inner ring — rotates faster (different direction)
    if (innerRef.current) {
      innerRef.current.rotation.y = clock.getElapsedTime() * -0.08;
      innerRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2 + 1) * 0.06;
    }
  });

  const makePoints = (
    data: { positions: Float32Array; colors: Float32Array; count: number },
    ref: React.RefObject<THREE.Group | null>,
    opacity: number,
    size: number,
  ) => (
    <group ref={ref}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[data.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[data.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={size}
          vertexColors
          transparent
          opacity={opacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );

  return (
    <>
      {makePoints(outer, outerRef, isMobile ? 0.25 : 0.45, isMobile ? 0.03 : 0.05)}
      {makePoints(inner, innerRef, isMobile ? 0.2 : 0.35, isMobile ? 0.02 : 0.035)}
    </>
  );
}
