import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import * as THREE from "three";

function StudioEnvironment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const generator = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const target = generator.fromScene(room, 0.04);
    const previous = scene.environment;
    scene.environment = target.texture;
    return () => {
      scene.environment = previous;
      target.dispose();
      room.dispose();
      generator.dispose();
    };
  }, [gl, scene]);
  return null;
}

function Sculpture({ still, ivory, accent }: { still: boolean; ivory: string; accent: string }) {
  const group = useRef<THREE.Group>(null);
  const time = useRef(0);
  const { geometry, samples } = useMemo(() => {
    const geometry = new THREE.TorusGeometry(1.1, 0.38, 32, 160);
    const samples = new Float32Array((32 + 1) * (160 + 1) * 2);
    let index = 0;
    for (let j = 0; j <= 32; j++) {
      for (let i = 0; i <= 160; i++) {
        samples[index++] = i / 160 * Math.PI * 2;
        samples[index++] = j / 32 * Math.PI * 2;
      }
    }
    return { geometry, samples };
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);
  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (!still) time.current += delta;
    const t = time.current;
    const position = geometry.getAttribute("position");
    if (!position) return;
    const blend = (Math.sin(t * 0.38) + 1) * 0.5;
    for (let i = 0; i < position.count; i++) {
      const u = samples[i * 2];
      const v = samples[i * 2 + 1];
      if (u === undefined || v === undefined) continue;
      const wave = u * 3 + t * 0.22;
      const radius = 1.04 + Math.cos(wave) * (0.12 + blend * 0.13);
      const twist = v + u * 2 + Math.sin(t * 0.25) * 0.65;
      const tube = 0.34 + 0.07 * Math.sin(u * 5 - t * 0.3);
      const radial = radius + tube * Math.cos(twist);
      position.setXYZ(i, radial * Math.cos(u), radial * Math.sin(u), tube * Math.sin(twist) * 1.3 + Math.sin(wave) * (0.15 + blend * 0.26));
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();
    if (group.current) {
      group.current.rotation.set(0.5 + Math.sin(t * 0.17) * 0.23, 0.35 + t * 0.12, -0.25 + Math.sin(t * 0.13) * 0.12);
      group.current.position.y = Math.sin(t * 0.45) * 0.06;
    }
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial color={ivory} metalness={0.88} roughness={0.26} clearcoat={0.6} clearcoatRoughness={0.2} envMapIntensity={1.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={geometry} scale={1.002}>
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.065} depthWrite={false} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  const [palette, setPalette] = useState<{ ivory: string; accent: string; still: boolean }>();
  useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    setPalette({ ivory: css.getPropertyValue("--foreground").trim(), accent: css.getPropertyValue("--accent").trim(), still: window.matchMedia("(prefers-reduced-motion: reduce)").matches });
  }, []);
  if (!palette) return null;
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 1.5]} frameloop={palette.still ? "demand" : "always"} gl={{ antialias: true, alpha: true }} aria-hidden="true">
      <StudioEnvironment />
      <ambientLight intensity={0.5} />
      <directionalLight position={[-3, 4, 5]} intensity={3} color={palette.ivory} />
      <directionalLight position={[3, -1, 2]} intensity={4} color={palette.accent} />
      <directionalLight position={[0, 3, -4]} intensity={2} color={palette.ivory} />
      <Sculpture still={palette.still} ivory={palette.ivory} accent={palette.accent} />
    </Canvas>
  );
}
