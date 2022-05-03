import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { usePlane, Physics } from '@react-three/cannon';
import { ScrollControls, Scroll, useScroll } from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as THREE from 'three';

import logo from './logo.svg';
import './App.css';

const TorusKnot = (props) => {
  const gradientMap = useLoader(TextureLoader, '3.jpg');
  gradientMap.magFilter = THREE.NearestFilter;
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame(() => {
    mesh.current.rotation.x += 0.005;
    mesh.current.rotation.y += 0.0055;
  });
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      castShadow
    >
      <torusKnotGeometry args={[1 / 2, 0.4 / 2, 100, 16]} />
      {/* <meshStandardMaterial color={hovered ? 'hotpink' : 'blue'} /> */}
      <meshToonMaterial gradientMap={gradientMap} color={'purple'} />
    </mesh>
  );
};

const Cone = (props) => {
  const gradientMap = useLoader(TextureLoader, '3.jpg');
  gradientMap.magFilter = THREE.NearestFilter;
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame(() => {
    mesh.current.rotation.x += 0.005;
    mesh.current.rotation.y += 0.0055;
  });
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      castShadow
    >
      <coneGeometry args={[1, 2, 8]} />
      <meshToonMaterial gradientMap={gradientMap} color={'hotpink'} />
    </mesh>
  );
};

const Sphere = (props) => {
  const gradientMap = useLoader(TextureLoader, '3.jpg');
  gradientMap.magFilter = THREE.NearestFilter;
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame(() => {
    mesh.current.rotation.x += 0.005;
    mesh.current.rotation.y += 0.0055;
  });
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      castShadow
    >
      <sphereGeometry args={[1, 32 / 2, 16 / 2]} />
      <meshToonMaterial gradientMap={gradientMap} color={'turquoise'} />
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
  const shadowMapSize = 512 * 2;

  return (
    <>
      <directionalLight
        {...props}
        ref={light}
        position={[2, 5, 2]}
        castShadow
        shadow-mapSize-height={shadowMapSize}
        shadow-mapSize-width={shadowMapSize}
        shadow-camera-near={1}
        shadow-camera-far={100}
      />
      <ambientLight intensity={0.1} />
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

const Geometries = () => {
  const { viewport, mouse } = useThree();
  const ref = useRef();

  useFrame(() => {
    ref.current.position.z += (mouse.x / 2 - ref.current.position.z) * 0.02;
    ref.current.position.y += (-mouse.y / 2 - ref.current.position.y) * 0.02;
  });

  return (
    <group ref={ref}>
      <TorusKnot position={[0, 0, -viewport.width + viewport.width / 1.4]} />
      <Cone position={[0, -viewport.height, 0 + viewport.width / 8]} />
      <Sphere
        position={[
          0,
          -viewport.height * 2,
          -viewport.width + viewport.width / 1.4,
        ]}
      />
    </group>
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
      <Suspense fallback={null}>
        <section className='canvas-section'>
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{
              fov: 55,
              near: 0.1,
              far: 1000,
              position: [cameraPosition, 0, scrollY],
            }}
          >
            <ScrollControls pages={3} distance={1} damping={5}>
              <Scroll>
                <fog attach='fog' color='hotpink' near={1} far={60} />
                <Lights />
                <Particles amount={2000} size={0.05} spread={40} />
                <Geometries />
              </Scroll>
              <Scroll html className={'scroll-wrapper'}>
                <section className='content'>
                  <div className='section'>PORTFOLIO</div>
                  <div className='section'>GALLERY</div>
                  <div className='section'>CONTACT</div>
                </section>
              </Scroll>
            </ScrollControls>
          </Canvas>
        </section>
      </Suspense>
    </div>
  );
}

export default App;
