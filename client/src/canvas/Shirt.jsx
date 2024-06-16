import React from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import state from "../store";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_baked.glb");
  // const { nodes, materials } = useGLTF("/hoodie.glb");
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  const title = snap.titleDecal;

  useFrame((state, delta) => {
    // Update rotation based on delta time
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
  });

  const stateString = JSON.stringify(snap);
  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
        scale={snap.scale}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]} //rotation of texture
            // scale={!snap.value ? 0.5 : snap.value / 50}
            scale={snap.value / 50}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.1]}
            rotation={[0, 0, 0]} //rotation of logo
            scale={0.15}
            map={logoTexture}
            // map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}

        {snap.isTitle && (
          <Decal
            position={[0, 0.15, -0.1]}
            scale={0.15}
            value={title}
            map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}

        {/* {snap.isLogoTexture && (
          <Decal
            position={[-0.27, 0.05, 0.1]}
            rotation={[0, 0, 0]} //rotation of logo
            scale={0.15}
            map={logoTexture}
            map-anisotropy={50}
            depthTest={true}
            depthWrite={false}
          />
        )} */}

        {/* {snap.isLogoTexture && (
          <Decal
            position={[0.27, 0.05, 0.1]}
            rotation={[0, 0, 0]} //rotation of logo
            scale={0.15}
            map={logoTexture}
            map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )} */}
      </mesh>
    </group>
  );
};

export default Shirt;
