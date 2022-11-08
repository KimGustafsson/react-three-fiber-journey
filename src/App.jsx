import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useTexture, OrbitControls } from '@react-three/drei';

import logo from './logo.svg';
import './App.css';

const Scene = () => {
  const { nodes } = useGLTF('/bakedTurbine.glb');
  const bakedTexture = useTexture('/baked.jpg');
  bakedTexture.flipY = false;

  return (
    <mesh geometry={nodes.baked.geometry}>
      <meshBasicMaterial map={bakedTexture} />
    </mesh>
  );
};

function App() {
  const cameraY = 5;
  const cameraX = -4;
  const cameraZ = -4;

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h5 className='App-title'>Three.js Journey with react-three-fiber</h5>
      </header>
      <section>
        <Canvas
          gl={{ antialias: false, physicallyCorrectLights: false }}
          dpr={[1, 2]}
          camera={{
            fov: 55,
            near: 0.1,
            far: 1000,
            position: [cameraX, cameraY, cameraZ],
          }}
        >
          <color args={['#111111']} attach='background' />
          <OrbitControls makeDefault />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </section>
    </div>
  );
}

export default App;
