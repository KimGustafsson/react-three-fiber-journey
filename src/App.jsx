import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Html,
  useProgress,
  Environment,
} from '@react-three/drei';
import { useControls } from 'leva';

import WindTurbine from './WindTurbine';

import logo from './logo.svg';
import './App.css';

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

const Lights = () => {
  const light = useRef();
  const shadowMapSize = 512 * 2;

  return (
    <>
      <directionalLight
        ref={light}
        position={[3, 5, 2]}
        castShadow
        shadow-mapSize-height={shadowMapSize}
        shadow-mapSize-width={shadowMapSize}
        shadow-camera-near={1}
        shadow-camera-far={100}
      />
      <ambientLight intensity={1} />
    </>
  );
};

function App() {
  const cameraPosition = 6;

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h5 className='App-title'>Three.js Journey with react-three-fiber</h5>
      </header>
      <section>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{
            fov: 55,
            near: 0.1,
            far: 1000,
            position: [cameraPosition, cameraPosition, cameraPosition],
          }}
        >
          <fog attach='fog' color='#CCC' near={1} far={30} />
          <OrbitControls />
          <Lights />
          <Suspense fallback={<Loader />}>
            <WindTurbine scale={0.4} position={[0, -1.5, 0]} />
            {/* <Environment preset='forest' background /> */}
          </Suspense>
        </Canvas>
      </section>
    </div>
  );
}

export default App;
