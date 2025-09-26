import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Thingy() {
  const groupRef = useRef();
  const { scene } = useGLTF("/scene.gltf");
  const envTexture = useLoader(THREE.TextureLoader, "/reflection.jpg");

  // Configure texture for environment mapping
  envTexture.mapping = THREE.EquirectangularReflectionMapping;

  useFrame((state, delta) => {
    if (groupRef.current) {
      // groupRef.current.rotation.y += delta * 0.05;
    }
  });

  // Override all materials with glass-like material
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: "#171719",
        roughness: 0.0,
        metalness: 1,
        envMap: envTexture,
        envMapIntensity: 0.25,
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.0, 0]}>
      <primitive object={scene} />
    </group>
  );
}
