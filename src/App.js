import * as THREE from 'three';
import * as React from 'react';
import logo from './logo.svg';
import { Canvas } from "@react-three-fiber";
import './App.css';
  

function Box() {
  return {
    <mesh>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  }
}

export default function App() {
  return <Canvas></Canvas>;
  
  }


