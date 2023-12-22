"use client";
import { Model, playerPos } from "@/components/Player";
import { Box, Environment, OrbitControls, Html , Sky} from "@react-three/drei";
import { Canvas, useFrame , useThree} from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { PointerLockControls, KeyboardControls } from "@react-three/drei";
import { Ground } from "@/components/Ground";
import { Physics, RigidBody } from "@react-three/rapier";
import { Plane } from "@/components/Plane";

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
          <Suspense fallback={<Html>Loading...</Html>}>
          {/* <Physics> */}
            {/* <Player /> */}
            <Model />
            <Plane/>
          <Environment preset="city" />
          <Ground />
          <Sky/>
          {/* </Physics> */}
          {/* <PointerLockControls /> */}
          {/* <FPSCameraControls/> */}
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  );
}
