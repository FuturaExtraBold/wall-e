import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import "./App.css";
import Thingy from "./components/Thingy";

function App() {
  return (
    <div className="app">
      <div className="app-background" />
      <Canvas camera={{ position: [0, 0, 8], fov: 20 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} />
        <Thingy />
        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          // minPolarAngle={1.047}
          // maxPolarAngle={1.745}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}

export default App;
