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
  const shadowMapSize = 1024 * 2;
  const {
    directionalLightPosition,
    directionalLightIntencity,
    ambientLightIntencity,
  } = useControls({
    directionalLightPosition: [1, 3, 2],
    directionalLightIntencity: 5.35,
    ambientLightIntencity: 5,
  });

  return (
    <>
      <directionalLight
        ref={light}
        intensity={directionalLightIntencity}
        position={directionalLightPosition}
        castShadow
        shadow-normalBias={0.05}
        shadow-mapSize-height={shadowMapSize}
        shadow-mapSize-width={shadowMapSize}
        shadow-camera-near={1}
        shadow-camera-far={100}
      />
      <ambientLight intensity={ambientLightIntencity} />
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
          gl={{ antialias: true, physicallyCorrectLights: true }}
          shadows
          dpr={[1, 2]}
          camera={{
            fov: 55,
            near: 0.1,
            far: 1000,
            position: [cameraPosition, cameraPosition, cameraPosition],
          }}
        >
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
