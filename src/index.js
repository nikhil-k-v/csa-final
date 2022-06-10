import { createRoot } from 'react-dom/client'
import React, { useRef, useState, useMemo, useEffect} from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, PerspectiveCamera } from "@react-three/drei";
import { Physics, usePlane, useBox, useSphere, useHeightfield, useTrimesh } from "@react-three/cannon";
import "./index.css";
import * as THREE from 'three';
import { Vector3 } from 'three';





function Sphere() {
  const {camera, set} = useThree();
  
  const [ref, api] = useSphere(() => ({ mass: 10, position: [0, 3, 10] }));
   const cameraRef = useRef(null);

   const v = new Vector3();

  useFrame(() => {
     if (!cameraRef.current || !ref.current) return
     ref.current.getWorldPosition(v)
     cameraRef.current.lookAt(v)
   })
  
  useEffect(() => {
    const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    cam.position.set(0,5,20);
    set({camera: cam });
  }, [])

  const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

  function handleKeyPress(e){
    console.log("bye")
  }


async function init() {
  let forwardKeyVel = 0;
  let sideKeyVel = 0;
  window.addEventListener( 'keydown', function(e){
    if(e.key === "w"){
      forwardKeyVel = -10;
    }
    if(e.key === "s"){
      forwardKeyVel = 10;
    }
    if(e.key === "d"){
      sideKeyVel = 10;
    }
    if(e.key === "a"){
      sideKeyVel = -10;
    }
    api.velocity.set(sideKeyVel,0,forwardKeyVel);
  })
  window.addEventListener( 'keyup', function(e){
    if(e.key === "w"){
      forwardKeyVel = 0;
    }
    if(e.key === "s"){
      forwardKeyVel = 0;
    }
    if(e.key === "d"){
      sideKeyVel = 0;
    }
    if(e.key === "a"){
      sideKeyVel = 0;
    }
    api.velocity.set(sideKeyVel,0,forwardKeyVel);
  })
}



  init();

  return (
    <mesh
      onKeyPress={(e) => handleKeyPress(e)}
      onClick={() => console.log("hello")}
      ref={ref}
      position={[0, 3, 10]}
    >
      <PerspectiveCamera ref={cameraRef} makeDefault position={[-40, 10, 20]} />
      <sphereBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
    
  );
}


function Brick({x, y}) {
  const [ref, api] = useBox(() => ({ mass: 1, position: [x, y, 15] }));
  return (
    <mesh ref={ref} position={[0, 10, 0]} onClick={() => api.velocity.set(0,0,-100)}>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="orange" />
    </mesh>
  );
}

function Ramp({x}) {
  const [ref, api] = useBox(() => ({ mass: 0.1, position: [x, 10, -15], rotation: [-Math.PI / 4, 0, 0] , args: [10, 10, 10] }));
  return (
    <mesh ref={ref} position={[10, 10, -15]} rotation={[-Math.PI / 4, 0, 0]} onClick={() => api.velocity.set(0,50,0)}>
      <boxBufferGeometry attach="geometry" args={[10, 10, 10]}/>
      <meshLambertMaterial attach="material" color="lightgreen" />
    </mesh>
  );
}
function Tower({y}) {
  const [ref, api] = useBox(() => ({ mass: 1, position: [15, y, 15] }));
  return (
    <mesh ref={ref} position={[0, 10, 0]}>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="red" />
    </mesh>
  );
} 

function Ball({y}) {
  const [ref, api] = useSphere(() => ({ mass: 1, position: [-15, y, 15] }));
  return (
    <mesh ref={ref} position={[0, 10, 0]} onClick={() => api.velocity.set(0,0,-100)}>
      <sphereBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="red" />
    </mesh>
  );
} 



const brickWall = [
  ['1',0,2],
  ['2',0.55,3],
  ['3',1.1,2],
  ['4',2.2,2],
  ['5',1.65,3],


]

function Plane() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 1000]} />
      <meshLambertMaterial attach="material" color="lightblue" />
    </mesh>
  );
}

const doggos =
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
const boxGeo = "https://media.discordapp.net/attachments/447895797108047903/984274208890699806/unknown.png?width=1228&height=676";
const hue = "https://media.discordapp.net/attachments/447895797108047903/984274335227346944/unknown.png?width=1221&height=676";
const scene = "https://media.discordapp.net/attachments/447895797108047903/984274766447902750/unknown.png?width=1310&height=676";
const intro = "https://media.discordapp.net/attachments/447895797108047903/984274662404010004/unknown.png?width=1221&height=676";
const helloWorld = "https://media.discordapp.net/attachments/447895797108047903/984274516257689640/unknown.png?width=1224&height=676";

const Texture = ({ texture, x, y}) => {
  const [ref, api] = useBox(() => ({ mass: 3, position: [x, 5, y] }));
  return (
    <mesh position={[x,5,y]}>
      <boxBufferGeometry attach="geometry" args={[13,10,1]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
};
const Image = ({ url, x, y }) => {
  const texture = useMemo(() => new THREE.TextureLoader().load(url), [url]);
  return <Texture texture={texture} x ={x} y={y}/>;
};




createRoot(document.getElementById('root')).render(
  <Canvas>
      <OrbitControls />
      <Stars />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <Physics>
        <Sphere /> 
        {brickWall.map((b) => (<Brick x={b[1]} y={b[2]} key={b[0]} />))}
        <Plane />
        <Tower y={2}/>
        <Tower y={3}/>
        <Tower y={4}/>
        <Tower y={5}/>
        <Tower y={6}/>
        <Ball y={2} />
        <Ball y={3} />
        <Ball y={4} />
        <Ball y={5} />
        <Ball y={6} />
        <Ball y={7} />
        <Ball y={8} />
        <Ball y={9} />
        <Image url={boxGeo}  x={0} y={-7}/>
        <Image url={hue}  x={15} y={4}/>
        <Image url={scene}  x={-15} y={8}/>
        <Image url={intro}  x={30} y={12}/>
        <Image url={helloWorld}  x={-30} y={16}/>
        <Ramp x={0}/>
        <Ramp x={10}/>
        <Ramp x={-10}/>
        <Ramp x={-20}/>
        <Ramp x={20}/>
        <Ramp x={-30}/>
        <Ramp x={30}/>
        <Ramp x={40}/>
        <Ramp x={-40}/>
      </Physics>
    </Canvas>,
)