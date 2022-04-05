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
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color={'#282c34'} />
    </mesh>
  );
};

const Lights = (props) => {
  const light = useRef();
  // useHelper(light, DirectionalLightHelper);
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

const Particles = ({ amount, size, spread }) => {
  const positions = new Float32Array(amount * 3);

  for (let i = 0; i < amount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * spread;
  }
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={positions.length / 3}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <pointsMaterial size={size} sizeAttenuation />
    </points>
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
          <fog attach='fog' color='hotpink' near={1} far={60} />
          <OrbitControls />
          <Lights />
          <Particles amount={20000} size={0.05} spread={40} />
          <Physics>
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
            <Plane />
          </Physics>
        </Canvas>
      </section>
    </div>
  );
}

export default App;
