import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import logo from './logo.svg';
import './App.css';

function Box(props) {
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
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

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
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Canvas>
      </section>
    </div>
  );
}

export default App;
