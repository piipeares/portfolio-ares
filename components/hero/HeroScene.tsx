"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import WireframeTorus from "./WireframeTorus";

interface HeroSceneProps {
  mousePosition: { x: number; y: number };
}

export default function HeroScene({ mousePosition }: HeroSceneProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={isMobile ? [1, 1] : [1, 2]}
      gl={{ alpha: true, antialias: !isMobile, powerPreference: "high-performance" }}
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
      }}
    >
      <Suspense fallback={null}>
        <WireframeTorus mousePosition={mousePosition} isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}
