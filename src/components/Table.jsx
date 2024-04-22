import { Suspense, useRef, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls, useTexture } from "@react-three/drei";
import SelectMenu from "./SelectMenu";

function Table3D(props) {
  const group = useRef();
  const { nodes, materials } = useLoader(GLTFLoader, "/table.gltf");
  const dayTexture = useTexture(props.selectedTexture);
  return (
    <>
      <group ref={group} {...props} dispose={null} scale={3}>
        <mesh
          geometry={nodes.Industrial_Table_0.children[0].geometry}
          material={materials.Old_Steel}
        >
          <meshStandardMaterial map={dayTexture} color={props.customColors.soul}/>
        </mesh>
        <mesh
          geometry={nodes.GLTF_SceneRootNode.children[0].children[1].geometry}
          material={materials.Old_Steel}
        >
          <meshStandardMaterial color={props.customColors.stripes} />
        </mesh>
      </group>
    </>
  );
}

function Table() {
  const [soul, setSoul] = useState("#490206");
  const [stripes, setStripes] = useState("#ff0000");
  const textureGroups = [
    {
      groupName: "Metal",
      options: [
        { value: "metal/1.jpg", label: "Material 1" },
        { value: "metal/2.jpg", label: "Material 2" },
        { value: "metal/3.jpg", label: "Material 3" },
      ],
    },
    {
      groupName: "Plastic",
      options: [
        { value: "plastic/1.jpg", label: "Material 1" },
        { value: "plastic/2.jpg", label: "Material 2" },
        { value: "plastic/3.jpg", label: "Material 3" },
      ],
    },
    {
      groupName: "Wood",
      options: [
        { value: "wood/1.jpg", label: "Material 1" },
        { value: "wood/2.jpg", label: "Material 2" },
        { value: "wood/3.jpg", label: "Material 3" },
        { value: "wood/4.jpg", label: "Material 4" },
        { value: "wood/5.jpg", label: "Material 5" },
        { value: "wood/6.jpg", label: "Material 6" },
      ],
    },
  ];

  const [selectedTexture, setSelectedTexture] = useState(
    textureGroups[0].options[0].value
  );

  return (
    <div className="App">
      <div className="wrapper">
        <div className="card">
          <div className="product-canvas">
            <Canvas shadows className="transition-all ease-in">
              <Suspense fallback={null}>
                <ambientLight intensity={2} />
                <spotLight
                  intensity={0.9}
                  angle={0.1}
                  penumbra={1}
                  position={[10, 15, 10]}
                  castShadow
                />
                <Table3D
                  customColors={{ soul: soul, stripes: stripes }}
                  selectedTexture={selectedTexture}
                />
                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                />
              </Suspense>
            </Canvas>
          </div>
          <h2>Color chooser</h2>
          <div className="colors">
            <div>
              <input
                type="color"
                id="soul"
                name="soul"
                value={soul}
                onChange={(e) => setSoul(e.target.value)}
              />
              <label htmlFor="soul">Soul</label>
            </div>
            <div>
              <input
                type="color"
                id="stripes"
                name="stripes"
                value={stripes}
                onChange={(e) => setStripes(e.target.value)}
              />
              <label htmlFor="stripes">Tyre</label>
            </div>
            <div className="matirial">
              <SelectMenu
                textureGroups={textureGroups}
                selectedTexture={selectedTexture}
                setSelectedTexture={setSelectedTexture}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
