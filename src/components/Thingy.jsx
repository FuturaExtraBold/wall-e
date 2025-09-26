import { useLoader } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Thingy() {
  const groupRef = useRef();
  const { scene } = useGLTF("/scene.gltf");
  const envTexture = useLoader(THREE.TextureLoader, "/square.png");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  envTexture.mapping = THREE.EquirectangularReflectionMapping;
  envTexture.center.set(0.5, 0.5);

  const handleMouseMove = (event) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = (event.clientY / window.innerHeight) * 2 - 1;
    setMouse({ x, y });
  };

  const handleTouchMove = (event) => {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      const x = (touch.clientX / window.innerWidth) * 2 - 1;
      const y = (touch.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x, y });
      event.preventDefault();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let animationId;

    const animate = () => {
      if (groupRef.current) {
        const widthScale = Math.max(0.3, windowWidth / 2560);
        const targetRotationY = mouse.x * 0.8 * widthScale;
        const targetRotationX = mouse.y * 0.3 * widthScale;

        groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.1;
        groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.1;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, [mouse]);

  useEffect(() => {
    if (scene && envTexture) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#000000",
            roughness: 0.0,
            metalness: 1,
            envMap: envTexture,
            envMapIntensity: 0.25,
          });
        }
      });
    }
  }, [scene, envTexture]);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}
