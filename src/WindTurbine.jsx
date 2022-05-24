import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/turbine.glb');
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ground.geometry}
        material={materials.Material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pole.geometry}
        material={nodes.Pole.material}
        position={[0, 1.7, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Engine.geometry}
        material={nodes.Engine.material}
        position={[0, 9.05, -0.19]}
        scale={0.43}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Knoppen.geometry}
        material={nodes.Knoppen.material}
        position={[0, 9.04, -0.64]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.blade3.geometry}
        material={nodes.blade3.material}
        position={[1.3, 9.04, 0.94]}
        scale={0.36}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.blade1.geometry}
        material={nodes.blade1.material}
        position={[-0.49, 10.25, 0.94]}
        rotation={[0, 0, 1.98]}
        scale={0.36}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.blade2.geometry}
        material={nodes.blade2.material}
        position={[-0.89, 8.07, 0.94]}
        rotation={[0, 0, -2.29]}
        scale={0.36}
      />
    </group>
  );
}

useGLTF.preload('/turbine.glb');
