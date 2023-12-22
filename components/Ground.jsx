import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

export function Ground(props) {
  const path = "/textures/gray_rocks_"
  const format = "_2k.jpg"
  const terrainTextures = useTexture({
    map: path + "diff" + format,
    displacementMap: path + "disp" + format,
    aoMap: path + "ao" + format,
    roughnessMap: path + "rough" + format,
    // metalnessMap: "/textures/aerial_rocks_02_arm_4k_roughness_edited.jpg",
    normalMap: path + "nor_gl" + format,
    // alphaMap: "/textures/alpha.png",
  });
  return (
    <mesh receiveShadow position={[0, 0, -6]} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[10, 10, 100, 100]} />
      <meshStandardMaterial
        {...terrainTextures}
      />
    </mesh>
  );
}
