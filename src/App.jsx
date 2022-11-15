import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import logo from './logo.svg';
import './App.css';

const Floor = () => {
  return (
    <mesh scale={10} rotation-x={-Math.PI / 2} position-y={-3} receiveShadow>
      <planeGeometry />
      <meshStandardMaterial color={'greenyellow'} />
    </mesh>
  );
};

const Box = () => {
  const ref = useRef();
  useFrame((_state, d) => {
    ref.current.rotation.y += -d;
    ref.current.rotation.x += d;
  });

  return (
    <mesh scale={1.5} position-x={2} ref={ref} castShadow receiveShadow>
      <boxGeometry />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  );
};

const Sphere = () => {
  return (
    <mesh scale={1.5} position-x={-2} castShadow receiveShadow>
      <sphereGeometry />
      <meshStandardMaterial color={'mediumpurple'} />
    </mesh>
  );
};

const Lights = () => {
  return (
    <>
      <pointLight
        position={[2, 5, -3]}
        intensity={3}
        color={'pink'}
        castShadow
      />
      <ambientLight intensity={0.3} />
    </>
  );
};

const Scene = () => {
  const ref = useRef();
  return (
    <>
      <Floor />
      <group ref={ref}>
        <Box />
        <Sphere />
      </group>
    </>
  );
};

function App() {
  const cameraY = 2;
  const cameraX = 0;
  const cameraZ = -8;

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
          shadows
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
            <Lights />
            <Scene />
          </Suspense>
        </Canvas>
      </section>
    </div>
  );
}

export default App;
