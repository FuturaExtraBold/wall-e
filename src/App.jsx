import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import "./App.css";
import Thingy from "./components/Thingy";

function App() {
  return (
    <div className="app">
      <Canvas camera={{ position: [0, 0, 8], fov: 6 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} />
        <Thingy />
      </Canvas>
    </div>
  );
}

export default App;
