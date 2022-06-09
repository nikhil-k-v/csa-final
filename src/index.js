import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics, usePlane, useBox, useSphere } from "@react-three/cannon";
import "./index.css";


function Box() {
  const [ref, api] = useSphere(() => ({ mass: 1, position: [0, 2, 0] }));

  function handleKeyPress(e){
    console.log("bye")
  }


async function init() {
  window.addEventListener( 'keydown', function(e){
    if(e.key === "w"){
      console.log("man")
      api.velocity.set(0,0,10);
    }
    if(e.key === "s"){
      api.velocity.set(0,0,-10);
    }
    if(e.key === "d"){
      api.velocity.set(-10,0,0);
    }
    if(e.key === "a"){
      api.velocity.set(10,0,0);
    }
    if(e.key === " "){
      api.velocity.set(0,5,0);
    }
  })
  window.addEventListener( 'keyup', function(e){
    api.velocity.set(0,0,0);
  })
}

init();

  return (
    <mesh
      onKeyPress={(e) => handleKeyPress(e)}
      onClick={() => console.log("hello")}
      ref={ref}
      position={[0, 5, 0]}
    >
      <sphereBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

function Plane() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial attach="material" color="lightblue" />
    </mesh>
  );
}

createRoot(document.getElementById('root')).render(
  <Canvas>
      <OrbitControls />
      <Stars />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <Physics>
        <Box /> 
        <Plane />
      </Physics>
    </Canvas>,
)