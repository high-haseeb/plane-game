"use client";
import { Model, playerPos } from "@/components/Player";
import { Box, Environment, OrbitControls, Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { PointerLockControls, KeyboardControls } from "@react-three/drei";
import { Ground } from "@/components/Ground";
import { Physics, RigidBody } from "@react-three/rapier";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "w", "W"] },
          { name: "backward", keys: ["ArrowDown", "s", "S"] },
          { name: "left", keys: ["ArrowLeft", "a", "A"] },
          { name: "right", keys: ["ArrowRight", "d", "D"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <Canvas>
          {/* <Physics> */}
          <Suspense fallback={<Html>Loading...</Html>}>
            {/* <Player /> */}
            <Model />
          </Suspense>
          <Environment preset="city" />
          <Ground />
          {/* </Physics> */}
          {/* <PointerLockControls /> */}
        </Canvas>
      </KeyboardControls>
    </div>
  );
}
const Player = () => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      state.camera.position.set(ref.current.translation);
    }
  });
  return <Model />;
};
