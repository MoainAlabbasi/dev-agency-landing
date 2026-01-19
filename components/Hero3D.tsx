"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Particle Field Component
function ParticleField({ count = 5000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();
  
  // Generate random positions for particles
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread particles in a sphere
      const radius = Math.random() * 15 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Color gradient from cyan to purple
      const t = Math.random();
      colors[i3] = 0 + t * 0.75; // R: 0 -> 0.75 (cyan to purple)
      colors[i3 + 1] = 0.94 - t * 0.94; // G: 0.94 -> 0
      colors[i3 + 2] = 1; // B: always 1
    }
    
    return [positions, colors];
  }, [count]);

  // Store original positions for animation
  const originalPositions = useMemo(() => new Float32Array(positions), [positions]);
  
  useFrame((state) => {
    if (!ref.current) return;
    
    const time = state.clock.getElapsedTime();
    const positionsArray = ref.current.geometry.attributes.position.array as Float32Array;
    
    // Mouse influence
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Get original position
      const ox = originalPositions[i3];
      const oy = originalPositions[i3 + 1];
      const oz = originalPositions[i3 + 2];
      
      // Calculate distance from mouse
      const dx = ox - mouseX;
      const dy = oy - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Magnetic fluid effect
      const influence = Math.max(0, 1 - dist / 8);
      const wave = Math.sin(time * 0.5 + i * 0.01) * 0.3;
      
      // Apply movement
      positionsArray[i3] = ox + Math.sin(time * 0.3 + i * 0.02) * 0.2 + (mouseX - ox) * influence * 0.3;
      positionsArray[i3 + 1] = oy + Math.cos(time * 0.4 + i * 0.02) * 0.2 + (mouseY - oy) * influence * 0.3 + wave;
      positionsArray[i3 + 2] = oz + Math.sin(time * 0.2 + i * 0.01) * 0.3;
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = time * 0.02;
    ref.current.rotation.x = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Nebula Ring Component
function NebulaRing({ radius = 8, segments = 128 }: { radius?: number; segments?: number }) {
  const ref = useRef<THREE.Line>(null!);
  
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.3,
        Math.sin(angle) * radius
      ));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius, segments]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.1;
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: "#00f0ff", transparent: true, opacity: 0.3 }))} ref={ref} />
  );
}

// Floating Orbs
function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null);
  
  const orbs = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 20,
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 0.5 + 0.5,
      color: i % 2 === 0 ? "#00f0ff" : "#bf00ff",
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const orb = orbs[i];
      child.position.y = orb.position[1] + Math.sin(state.clock.getElapsedTime() * orb.speed) * 2;
      child.position.x = orb.position[0] + Math.cos(state.clock.getElapsedTime() * orb.speed * 0.5) * 1;
    });
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position} scale={orb.scale}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color={orb.color} transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  );
}

// Main Scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <ParticleField count={6000} />
      <NebulaRing radius={10} />
      <NebulaRing radius={12} />
      <FloatingOrbs />
    </>
  );
}

// Hero3D Component
export function Hero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
