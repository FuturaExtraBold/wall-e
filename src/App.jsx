import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import "./App.css";
import Thingy from "./components/Thingy";

function App() {
  return (
    <div className="app">
      <Canvas camera={{ position: [0, 1.5, 0], fov: 30 }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <Thingy />
      </Canvas>
      {/* <div className="overlay">
        <h1>Skully Boi</h1>
        <p>This is a simple 3D scene using React Three Fiber.</p>
      </div> */}
    </div>
  );
}

export default App;
