import React, { useRef, useState, useEffect } from "react";
import { Canvas, ThreeElements, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
// import domPieceColor from "../../../public/img/dom-piece.jpg";

// All textures are CC0 textures from: https://cc0textures.com/
const domPieceColor = () => `/img/dom-piece.jpg`;
const dom2 =
  "https://images.unsplash.com/photo-1606820811250-10f94663a029?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9tJTIwdG93ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60";

// Source: https://stackoverflow.com/a/7228322
function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getSingleDomTexture = (level: number): string => {
  let maxImages;
  switch (level) {
    case 0:
      maxImages = 36;
      break;
    case 1:
      maxImages = 47;
      break;
    case 2:
      maxImages = 56;
      break;
    case 3:
      maxImages = 46;
      break;
    default:
      throw Error("Level not valid");
  }

  const imgUrl = `/img/level${level}/${randomIntFromInterval(
    1,
    maxImages
  )}.png`;
  return imgUrl;
};

const generateNewDomTextureCube = (level: number) => {
  const textureCube = [
    getSingleDomTexture(level),
    getSingleDomTexture(level),
    getSingleDomTexture(level),
    getSingleDomTexture(level),
    getSingleDomTexture(level),
    getSingleDomTexture(level),
  ];
  console.log(textureCube);
  return textureCube;
};

const initialCube = {
  0: generateNewDomTextureCube(0),
  1: generateNewDomTextureCube(1),
  2: generateNewDomTextureCube(2),
};

function DomBox(props: { three: ThreeElements["mesh"]; textureCube: any }) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);

  useFrame((state, delta) => (ref.current.rotation.y -= 0.01));
  return (
    <mesh
      {...props.three}
      ref={ref}
      // scale={clicked ? 1.5 : 1}
      // onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      {/*<meshStandardMaterial color={hovered ? "hotpink" : "orange"} />*/}
      <meshStandardMaterial attach="material-0" map={props.textureCube[0]} />
      <meshStandardMaterial attach="material-1" map={props.textureCube[1]} />
      <meshStandardMaterial attach="material-2" map={props.textureCube[2]} />
      <meshStandardMaterial attach="material-3" map={props.textureCube[3]} />
      <meshStandardMaterial attach="material-4" map={props.textureCube[4]} />
      <meshStandardMaterial attach="material-5" map={props.textureCube[5]} />
    </mesh>
  );
}

const DomRenderer = (props: {}) => {
  const boxHeightRatio = 1.5;
  const baseHeight = -2;

  const cubeArray0 = useLoader(TextureLoader, initialCube[0]);
  const cubeArray1 = useLoader(TextureLoader, initialCube[1]);
  const cubeArray2 = useLoader(TextureLoader, initialCube[2]);
  const domTexture = [cubeArray0, cubeArray1, cubeArray2];

  return (
    <Canvas style={{ height: "800px" }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <DomBox
        three={{
          position: [0, baseHeight + 0, 0],
          scale: [1.2, 1.2 * boxHeightRatio, 1.2],
        }}
        textureCube={domTexture[0]}
      />
      <DomBox
        three={{
          position: [0, baseHeight + 1.15 * boxHeightRatio, 0],
          scale: [1.1, 1.1 * boxHeightRatio, 1.1],
        }}
        textureCube={domTexture[1]}
      />
      <DomBox
        three={{
          position: [
            0,
            baseHeight + 1.15 * boxHeightRatio + 1.05 * boxHeightRatio,
            0,
          ],
          scale: [1, 1 * boxHeightRatio, 1],
        }}
        textureCube={domTexture[2]}
      />
    </Canvas>
  );
};

export default DomRenderer;
