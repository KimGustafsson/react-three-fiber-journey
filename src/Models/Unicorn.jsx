/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Unicorn(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/unicorn/model.gltf'
  );
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 1.24, 0]} rotation={[0, Math.PI / 6, 0]} scale={0.7}>
        <primitive object={nodes.Bone} />
        <primitive object={nodes.Bone037} />
        <primitive object={nodes.Bone014} />
        <primitive object={nodes.Bone035} />
        <primitive object={nodes.Bone036} />
        <primitive object={nodes.Bone038} />
        <skinnedMesh
          castShadow
          geometry={nodes.Cube.geometry}
          material={materials['Material.001']}
          skeleton={nodes.Cube.skeleton}
        />
        <skinnedMesh
          castShadow
          geometry={nodes.Cube_1.geometry}
          material={materials['Material.003']}
          skeleton={nodes.Cube_1.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload(
  'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/unicorn/model.gltf'
);
