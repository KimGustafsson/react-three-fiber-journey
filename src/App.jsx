import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { usePlane, Physics } from '@react-three/cannon';
import { OrbitControls, useHelper } from '@react-three/drei';
import { DirectionalLightHelper } from 'three';

import logo from './logo.svg';
import './App.css';

const Box = (props) => {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      castShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'blue'} />
    </mesh>
  );
};

const Plane = (props) => {
  const [ref] = usePlane(() => ({
    position: [0, -1.5, 0],
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));

  return (
    <mesh receiveShadow ref={ref}>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial />
    </mesh>
  );
};

const Lights = (props) => {
  const light = useRef();
  useHelper(light, DirectionalLightHelper);
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
          <OrbitControls />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
          <Physics>
            <Lights />
            <Plane />
          </Physics>
        </Canvas>
      </section>
    </div>
  );
}

export default App;
