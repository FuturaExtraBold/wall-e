import { useLoader, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Thingy() {
  const groupRef = useRef();
  const { scene } = useGLTF("/scene.gltf");
  const envTexture = useLoader(THREE.TextureLoader, "/hypnosis.png");
  const { viewport } = useThree();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Configure texture for environment mapping
  envTexture.mapping = THREE.EquirectangularReflectionMapping;
  envTexture.center.set(0.5, 0.5);

  // Mouse move handler
  const handleMouseMove = (event) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = (event.clientY / window.innerHeight) * 2 - 1;
    console.log("Mouse moved:", x, y);
    setMouse({ x, y });
  };

  // Add mouse listener
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Use requestAnimationFrame instead of useFrame
  useEffect(() => {
    let animationId;

    const animate = () => {
      if (groupRef.current) {
        const targetRotationY = mouse.x * 0.3;
        const targetRotationX = mouse.y * 0.2;

        // Smooth interpolation
        groupRef.current.rotation.y +=
          (targetRotationY - groupRef.current.rotation.y) * 0.1;
        groupRef.current.rotation.x +=
          (targetRotationX - groupRef.current.rotation.x) * 0.1;
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, [mouse]);

  // Setup materials once when scene loads
  useEffect(() => {
    if (scene && envTexture) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#000000",
            roughness: 0.0,
            metalness: 1,
            envMap: envTexture,
            envMapIntensity: 0.05,
          });
        }
      });
    }
  }, [scene, envTexture]);

  // useFrame((delta) => {
  //   if (groupRef.current) {
  //     // Smoothly rotate skull to follow mouse
  //     const targetRotationY = mouse.x * 0.3;
  //     const targetRotationX = mouse.y * 0.2;

  //     groupRef.current.rotation.y = THREE.MathUtils.lerp(
  //       groupRef.current.rotation.y,
  //       targetRotationY,
  //       delta * 3
  //     );
  //     groupRef.current.rotation.x = THREE.MathUtils.lerp(
  //       groupRef.current.rotation.x,
  //       targetRotationX,
  //       delta * 3
  //     );
  //   }
  // });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}
