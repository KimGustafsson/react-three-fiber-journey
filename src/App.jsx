import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { usePlane, Physics, useBox } from '@react-three/cannon';
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';

import fragment from './fragment.glsl';
import vertex from './vertex.glsl';

import logo from './logo.svg';
import './App.css';

const Box = (props) => {
  const { boxScale } = useControls({ boxScale: 1 });
  const [hovered, setHover] = useState(false);
  const [ref, api] = useBox(() => ({ ...props }));

  const onClick = () => {
    api.applyImpulse([0, 5, 2], [0, -1, 0]);
  };

  return (
    <mesh
      scale={boxScale}
      ref={ref}
      onClick={onClick}
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
  return (
    <mesh>
      <planeGeometry attach='geometry' args={[5, 3.5]} />
      <rawShaderMaterial
        attach='material'
        vertexShader={vertex}
        fragmentShader={fragment}
      />
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
        intensity={2}
      />
      <ambientLight intensity={2} />
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
  const { gravity } = useControls({ gravity: -9.81 });
  const cameraPosition = 6;

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h5 className='App-title'>Three.js Journey with react-three-fiber</h5>
      </header>
      <section>
        <Canvas
          gl={{
            antialias: true,
            physicallyCorrectLights: true,
          }}
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
          <Plane />
        </Canvas>
      </section>
    </div>
  );
}

export default App;
