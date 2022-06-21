import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export default function Model({ speed = 1, ...rest }) {
  const group = useRef();
  const { nodes, animations } = useGLTF('/turbine_anim.glb');
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    actions?.KnoppenAction.play();
    actions?.KnoppenAction.setEffectiveTimeScale(speed);
  });
  return (
    <group ref={group} {...rest} dispose={null}>
      <group name='Scene'>
        <mesh
          name='Pole'
          castShadow
          receiveShadow
          geometry={nodes.Pole.geometry}
          material={nodes.Pole.material}
          position={[0, 1.7, 0]}
        />
        <mesh
          name='Engine'
          castShadow
          receiveShadow
          geometry={nodes.Engine.geometry}
          material={nodes.Engine.material}
          position={[0, 9.05, -0.19]}
          scale={0.43}
        />
        <mesh
          name='Knoppen'
          castShadow
          receiveShadow
          geometry={nodes.Knoppen.geometry}
          material={nodes.Knoppen.material}
          position={[0, 9.04, -0.64]}
          rotation={[0, 0, 0.01]}
        >
          <mesh
            name='blade1'
            castShadow
            receiveShadow
            geometry={nodes.blade1.geometry}
            material={nodes.blade1.material}
            position={[-0.39, 1.24, 1.57]}
            rotation={[0, 0, 1.87]}
            scale={[0.36, 0.36, 0.36]}
          />
          <mesh
            name='blade2'
            castShadow
            receiveShadow
            geometry={nodes.blade2.geometry}
            material={nodes.blade2.material}
            position={[-0.86, -0.95, 1.57]}
            rotation={[0, 0, -2.28]}
            scale={0.36}
          />
          <mesh
            name='blade3'
            castShadow
            receiveShadow
            geometry={nodes.blade3.geometry}
            material={nodes.blade3.material}
            position={[1.25, -0.2, 1.57]}
            rotation={[0, 0, -0.16]}
            scale={0.36}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload('/turbine_anim.glb');
