import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const playerPos = new THREE.Vector3(0, 0.5, 0);
const speed = 0.05;
export function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/player.gltf");

  const { actions, mixer } = useAnimations(animations, group);
  const [, get] = useKeyboardControls();
  const [isMovingBack, setMovingBack] = useState(false);
  const [isMovingFront, setMovingFront] = useState(false);
  const [isMovingRight, setMovingRight] = useState(false);
  useFrame(({ camera, delta }) => {
    const { forward, backward, left, right, jump } = get();
    if (jump) {

      actions.jump.reset();
      actions.jump.setLoop(THREE.LoopOnce);
      actions.jump.play();
    }
    if (backward) {
      playerPos.add(new THREE.Vector3(0, 0, speed));
      actions.back.paused = false;
      actions.back.play();
      setMovingBack(true);
    } else if (isMovingBack) {
      actions.back.paused = true;
    }
    if (forward) {
      playerPos.add(new THREE.Vector3(0, 0, -speed));
      actions.run.paused = false;
      actions.run.play();
      setMovingFront(true);
    } else if (isMovingFront) {
      actions.run.paused = true;
    }
    if (right) {
      playerPos.add(new THREE.Vector3(speed, 0, 0));
      actions.right.paused = false;
      actions.right.play();
      setMovingRight(true);
    } else if (isMovingRight) {
      actions.right.paused = true;
    }

    if (left) {
      playerPos.add(new THREE.Vector3(-speed, 0, 0));
      actions.left.paused = false;
      actions.left.play();
      setMovingRight(true);
    } else if (isMovingRight) {
      actions.left.paused = true;
    }
    const matrix = new THREE.Matrix4().multiply(
      new THREE.Matrix4().makeTranslation(
        playerPos.x,
        playerPos.y,
        playerPos.z,
      ),
    );
    group.current.matrixAutoUpdate = false;
    group.current.matrix.copy(matrix);
    group.current.matrixWorldNeedsUpdate = true;

    const cameraMatrix = new THREE.Matrix4()
      .multiply(
        new THREE.Matrix4().makeTranslation(
          playerPos.x,
          playerPos.y,
          playerPos.z,
        ),
      )
      .multiply(new THREE.Matrix4().makeRotationX(-0.4))
      .multiply(new THREE.Matrix4().makeTranslation(0, 1.5, 3));
    camera.matrixAutoUpdate = false;
    camera.matrix.copy(cameraMatrix);
    camera.matrixWorldNeedsUpdate = true;
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Armature"
          rotation={[Math.PI / 2, 0, Math.PI]}
          scale={0.01}
        >
          <primitive object={nodes.mixamorigHips} />
          <group name="Ch15">
            <skinnedMesh
              name="Mesh"
              geometry={nodes.Mesh.geometry}
              material={materials.Ch15_body}
              skeleton={nodes.Mesh.skeleton}
            />
            <skinnedMesh
              name="Mesh_1"
              geometry={nodes.Mesh_1.geometry}
              material={materials.Ch15_body1}
              skeleton={nodes.Mesh_1.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/player.gltf");
