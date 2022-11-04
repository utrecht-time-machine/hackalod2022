import React, { useRef, useState } from "react";
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

const getDomTexture = (level: number): string => {
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

  return `/img/level${level}/${randomIntFromInterval(0, maxImages)}`;
};

function Box(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  // const [clicked, click] = useState(false);

  let level = 0;
  const cubeArray = useLoader(TextureLoader, [
    getDomTexture(level),
    getDomTexture(level),
    getDomTexture(level),
    getDomTexture(level),
    getDomTexture(level),
    getDomTexture(level),
  ]);

  useFrame((state, delta) => (ref.current.rotation.y -= 0.01));
  return (
    <mesh
      {...props}
      ref={ref}
      // scale={clicked ? 1.5 : 1}
      // onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      {/*<meshStandardMaterial color={hovered ? "hotpink" : "orange"} />*/}
      <meshStandardMaterial attach="material-0" map={cubeArray[0]} />
      <meshStandardMaterial attach="material-1" map={cubeArray[1]} />
      <meshStandardMaterial attach="material-2" map={cubeArray[2]} />
      <meshStandardMaterial attach="material-3" map={cubeArray[3]} />
      <meshStandardMaterial attach="material-4" map={cubeArray[4]} />
      <meshStandardMaterial attach="material-5" map={cubeArray[5]} />
    </mesh>
  );
}

const DomRenderer = (props: {}) => {
  const boxHeightRatio = 1.5;
  const baseHeight = -2;
  return (
    <Canvas style={{ height: "800px" }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box
        position={[0, baseHeight + 0, 0]}
        scale={[1.2, 1.2 * boxHeightRatio, 1.2]}
      />
      <Box
        position={[0, baseHeight + 1.15 * boxHeightRatio, 0]}
        scale={[1.1, 1.1 * boxHeightRatio, 1.1]}
      />
      <Box
        position={[
          0,
          baseHeight + 1.15 * boxHeightRatio + 1.05 * boxHeightRatio,
          0,
        ]}
        scale={[1, 1 * boxHeightRatio, 1]}
      />
    </Canvas>
  );
};

export default DomRenderer;
