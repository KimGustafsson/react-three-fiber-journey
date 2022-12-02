import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { button, useControls } from 'leva';
import { Perf } from 'r3f-perf';
import {
  MeshReflectorMaterial,
  OrbitControls,
  Text,
  Float,
  Stars,
} from '@react-three/drei';

import logo from './logo.svg';
import './App.css';

const BASE_COLOR = '#111111';
// const BASE_COLOR = 'white';
const TEXT_COLOR = 'whitesmoke';

const Floor = () => {
  const { floorColor } = useControls({ floorColor: 'purple' });
  return (
    <mesh scale={70} rotation-x={-Math.PI / 2} position-y={-1.5}>
      <planeGeometry />
      <MeshReflectorMaterial
        resolution={512}
        blur={[1000, 1000]}
        mixBlur={0.5}
        mirror={1}
        color={floorColor}
      />
    </mesh>
  );
};

const Box = () => {
  const ref = useRef();
  const { position, rotationModifier, color } = useControls('box', {
    position: {
      value: {
        positionX: 2,
        positionY: 0,
        positionZ: 0,
      },
      step: 0.1,
    },
    rotationModifier: {
      value: 0,
      step: 0.001,
    },
    color: '#000000',
  });

  useFrame((_state, d) => {
    ref.current.rotation.y += -d - rotationModifier;
    ref.current.rotation.x += d + rotationModifier;
  });

  return (
    <mesh
      scale={1.5}
      position={[position.positionX, position.positionY, position.positionZ]}
      ref={ref}
    >
      <boxGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Sphere = () => {
  const { position, color } = useControls('sphere', {
    position: {
      value: {
        positionX: -2,
        positionY: 0,
        positionZ: 0,
      },
      step: 0.1,
    },
    color: '#000000',
    alert: button(() => alert('Yoo')),
  });

  return (
    <mesh
      scale={1.5}
      position={[position.positionX, position.positionY, position.positionZ]}
    >
      <sphereGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Lights = () => {
  const { lightColor, lightIntensity, ambient } = useControls('lights', {
    lightColor: 'whitesmoke',
    lightIntensity: 2,
    ambient: 0.3,
  });

  return (
    <>
      <pointLight
        position={[-5, 8, 5]}
        intensity={lightIntensity}
        color={lightColor}
      />
      <ambientLight intensity={ambient} />
    </>
  );
};

const Scene = () => {
  const ref = useRef();
  return (
    <group ref={ref}>
      <Box />
      <Sphere />
      <Float>
        <Text
          fontSize={0.5}
          position-y={2}
          font={'inter-v12-latin-regular.woff'}
          color={TEXT_COLOR}
        >
          REACT-THREE-FIBER
        </Text>
      </Float>
      <Floor />
    </group>
  );
};

function App() {
  const { perf, stars } = useControls({
    perf: true,
    stars: true,
  });
  const cameraY = 2;
  const cameraX = 0;
  const cameraZ = 15;

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h5 className='App-title'>Three.js Journey with react-three-fiber</h5>
      </header>
      <section>
        <Canvas
          gl={{ antialias: true }}
          dpr={[1, 2]}
          shadows
          camera={{
            fov: 55,
            near: 0.1,
            far: 1000,
            position: [cameraX, cameraY, cameraZ],
          }}
        >
          {perf && <Perf position='bottom-left' />}
          {stars && <Stars />}
          <color args={[BASE_COLOR]} attach='background' />
          <OrbitControls makeDefault maxPolarAngle={Math.PI / 2} />
          <fog args={[BASE_COLOR, 20, 40]} attach={'fog'} />
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
