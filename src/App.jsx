import { useRef } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';

import logo from './logo.svg';
import './App.css';

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

const Plane = () => {
  return (
    <mesh rotation-x={-Math.PI / 2} receiveShadow>
      <planeBufferGeometry args={[50, 50]} />
      <meshBasicMaterial color={'#004000'} side={THREE.DoubleSide} />
    </mesh>
  );
};

const House = () => {
  return (
    <mesh>
      <boxBufferGeometry args={[10, 3, 15]} />
      <meshBasicMaterial color={'#330000'} side={THREE.DoubleSide} />
    </mesh>
  );
};

function App() {
  const cameraY = 2.5 * 7;
  const cameraX = 1.5 * 7;
  const cameraZ = 4.5 * 7;

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
            fov: 70,
            near: 0.1,
            far: 1000,
            position: [cameraX, cameraY, cameraZ],
          }}
        >
          <OrbitControls />
          <Plane />
          <House />
          <Lights />
        </Canvas>
      </section>
    </div>
  );
}

export default App;
