import React, { useRef, useState } from "react";
import { Canvas, ThreeElements, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
// import domPieceColor from "../../../public/img/dom-piece.jpg";

// All textures are CC0 textures from: https://cc0textures.com/
const domPieceColor = () => `/img/dom-piece.jpg`;

function Box(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  // const [clicked, click] = useState(false);
  const [colorMap] = useLoader(TextureLoader, [domPieceColor()]);
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
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
      <meshStandardMaterial displacementScale={0.2} map={colorMap} />
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
