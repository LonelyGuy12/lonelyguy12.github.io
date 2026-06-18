import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  MeshTransmissionMaterial,
  Environment,
  Sparkles,
  Stars,
  Trail,
} from "@react-three/drei";
import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import * as THREE from "three";

function CoreBlob() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.15 + mouse.y * 0.35;
    ref.current.rotation.y = t * 0.2 + mouse.x * 0.35;
  });
  return (
    <Float speed={1} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref} scale={1.35}>
        <icosahedronGeometry args={[1, 48]} />
        <MeshDistortMaterial
          color="#0f172a"
          emissive="#7c3aed"
          emissiveIntensity={0.6}
          distort={0.5}
          speed={2}
          roughness={0.08}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

function GlassShell() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = -t * 0.08;
    ref.current.rotation.z = t * 0.06;
  });
  return (
    <mesh ref={ref} scale={2.1}>
      <icosahedronGeometry args={[1, 3]} />
      <MeshTransmissionMaterial
        thickness={0.5}
        roughness={0.15}
        transmission={1}
        ior={1.3}
        chromaticAberration={0.4}
        backside
        color="#06b6d4"
        distortion={0.2}
        distortionScale={0.3}
        temporalDistortion={0.12}
        samples={6}
        resolution={256}
      />
    </mesh>
  );
}

function OrbitRing({
  radius,
  speed,
  tilt,
  color,
}: {
  radius: number;
  speed: number;
  tilt: [number, number, number];
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.getElapsedTime() * speed;
  });
  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, 0.01, 12, 140]} />
      <meshBasicMaterial color={color} transparent opacity={0.45} />
    </mesh>
  );
}

function OrbitingDot({
  radius,
  speed,
  color,
  tilt,
}: {
  radius: number;
  speed: number;
  color: string;
  tilt: [number, number, number];
}) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.z = clock.getElapsedTime() * speed;
  });
  return (
    <group ref={group} rotation={tilt}>
      <Trail width={1} length={5} color={color} attenuation={(t) => t * t}>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </Trail>
    </group>
  );
}

function ParticleField({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.035;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.016} color="#c4b5fd" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function GlowPlane() {
  const ref = useRef<THREE.Mesh>(null);
  return (
    <mesh ref={ref} position={[0, 0, -2]} scale={8}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        color="#1e1b4b"
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

export function Scene3D() {
  const [enabled, setEnabled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    setEnabled(!reduce);
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  if (!enabled) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.7_0.22_300/0.35),transparent_70%)]" />
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, isMobile ? 1.25 : 1.75]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      frameloop={visible ? "always" : "never"}
      performance={{ min: 0.5 }}
    >
      <Suspense fallback={null}>
        <fog attach="fog" args={["#0f172a", 8, 18]} />
        <ambientLight intensity={0.25} />
        <pointLight position={[4, 4, 5]} intensity={2} color="#22d3ee" />
        <pointLight position={[-4, -2, 3]} intensity={1.5} color="#ec4899" />
        <pointLight position={[0, 3, -3]} intensity={1} color="#a855f7" />

        <GlowPlane />
        <CoreBlob />
        {!isMobile && <GlassShell />}

        <OrbitRing radius={2.6} speed={0.22} tilt={[Math.PI / 2.3, 0, 0]} color="#22d3ee" />
        <OrbitRing radius={2.9} speed={-0.16} tilt={[Math.PI / 1.8, Math.PI / 4, 0]} color="#ec4899" />
        <OrbitRing radius={3.2} speed={0.12} tilt={[Math.PI / 3, -Math.PI / 5, Math.PI / 6]} color="#a855f7" />

        <OrbitingDot radius={2.6} speed={0.55} color="#22d3ee" tilt={[Math.PI / 2.3, 0, 0]} />
        <OrbitingDot radius={2.9} speed={-0.4} color="#ec4899" tilt={[Math.PI / 1.8, Math.PI / 4, 0]} />
        <OrbitingDot radius={3.2} speed={0.3} color="#a855f7" tilt={[Math.PI / 3, -Math.PI / 5, Math.PI / 6]} />

        <Sparkles count={isMobile ? 30 : 60} scale={6} size={2} speed={0.4} color="#c4b5fd" opacity={0.6} />
        <ParticleField count={isMobile ? 200 : 500} />
        <Stars radius={20} depth={25} count={isMobile ? 500 : 1000} factor={2} fade speed={0.5} />

        {!isMobile && <Environment preset="night" />}
      </Suspense>
    </Canvas>
  );
}
