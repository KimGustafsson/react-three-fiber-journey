import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { button, useControls } from 'leva';
import { Perf } from 'r3f-perf';
import { useGesture } from '@use-gesture/react';
import { useSpring, a } from '@react-spring/three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Unicorn from './Models/Unicorn';
import {
  MeshReflectorMaterial,
  OrbitControls,
  Text,
  Float,
  Stars,
  ContactShadows,
  Environment,
} from '@react-three/drei';

import logo from './logo.svg';
import './App.css';

const BASE_COLOR = '#111111';
const TEXT_COLOR = 'indigo';

const Dodecahedron = () => {
  const { viewport, size } = useThree();
  const aspect = size.width / viewport.width;

  const [spring, set] = useSpring(() => ({
    position: [-3, 2, 0],
    rotation: [0, 0, 0],
    config: { friction: 15 },
  }));

  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) =>
      set({
        position: [x / aspect, -y / aspect, 0],
        rotation: [y / aspect, x / aspect, 0],
      }),
  });

  return (
    <a.mesh style={{ touchAction: 'none' }} {...spring} {...bind()} castShadow>
      <dodecahedronBufferGeometry />
      <meshNormalMaterial />
    </a.mesh>
  );
};

// Mat floor with shadows
const MatFloor = () => {
  const { floorColor } = useControls({ floorColor: '#272727' });
  return (
    <mesh scale={70} rotation-x={-Math.PI / 2} position-y={0} receiveShadow>
      <planeGeometry />
      <meshPhongMaterial color={floorColor} />
    </mesh>
  );
};

// Shiny floor
const ShinyFloor = () => {
  const { floorColor } = useControls({ floorColor: 'purple' });
  return (
    <mesh scale={70} rotation-x={-Math.PI / 2} position-y={0}>
      <planeGeometry />
      <MeshReflectorMaterial
        resolution={512 * 4}
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
        positionX: 3,
        positionY: 2,
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
      castShadow
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
        positionX: -6,
        positionY: 2,
        positionZ: 0,
      },
      step: 0.1,
    },
    color: '#000000',
    alert: button(() => alert('Yoo')),
  });

  return (
    <mesh
      castShadow
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
        castShadow
        position={[-5, 8, 5]}
        intensity={lightIntensity}
        color={lightColor}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={50}
        shadow-camera-top={7}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      />
      <ambientLight intensity={ambient} />
    </>
  );
};

const Scene = ({ floorType }) => {
  const ref = useRef();
  return (
    <group ref={ref}>
      <Box />
      <Dodecahedron />
      <Sphere />
      <Unicorn position={[0, 1, 0]} />
      <Float>
        <Text
          castShadow
          fontSize={1}
          position-y={6}
          font={'inter-v12-latin-regular.woff'}
          color={TEXT_COLOR}
        >
          NELIA
        </Text>
      </Float>
      {floorType === 'mat' ? <MatFloor /> : <ShinyFloor />}
    </group>
  );
};

function App() {
  const { perf, stars, orbitControlsOn, floorType } = useControls({
    perf: true,
    stars: true,
    orbitControlsOn: true,
    floorType: { value: 'mat', options: ['mat', 'shiny'] },
  });
  const { bloomIntensity, luminanceThreshold } = useControls('effects', {
    bloomIntensity: 1.8,
    luminanceThreshold: 0.5,
  });

  const cameraY = 10;
  const cameraX = 0;
  const cameraZ = 18;

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h5 className='App-title'>Three.js Journey with react-three-fiber</h5>
      </header>
      <Canvas
        shadows
        gl={{ antialias: true }}
        dpr={[1, 2]}
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
        {orbitControlsOn && (
          <OrbitControls
            makeDefault
            maxPolarAngle={Math.PI / 2}
            enableDamping
          />
        )}
        <fog args={[BASE_COLOR, 20, 40]} attach={'fog'} />
        <Suspense fallback={null}>
          <Lights />
          <Environment intensity={2} preset='night' />
          <Scene floorType={floorType} />
        </Suspense>
        {/* <EffectComposer>
          <Bloom
            intensity={bloomIntensity}
            luminanceThreshold={luminanceThreshold}
          />
        </EffectComposer> */}
      </Canvas>
    </div>
  );
}

export default App;
