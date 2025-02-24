<script lang="ts">
  import * as THREE from 'three';
  import { T, useTask } from '@threlte/core';
  import { interactivity, OrbitControls } from '@threlte/extras';
  import { Spring } from 'svelte/motion';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  import { useLoader } from '@threlte/core';
  import { useGltf } from '@threlte/extras';
  import { onMount } from 'svelte';


  let { 
    resetCounter = 0,
    showDebug = false
  }: { resetCounter?: Number; showDebug?: Boolean } = $props();
  
  // Reactive box position
  let boxPosition = $state<[number, number, number]>([0, 1, 0]);

  // Define island bounderies
  const islandBounderies = {
    minX: -5,
    maxX: 5,
    minZ: -5,
    maxZ: 5
  };

  //  Handle keyboard input
  function handleKeyDown(event: KeyboardEvent) {
    const [x, y, z] = boxPosition;
    let newX = x, newZ = z;

    switch (event.key) {
      case 'ArrowUp': boxPosition = [x, y, z - 0.5]; break;
      case 'ArrowDown': boxPosition = [x, y, z + 0.5]; break;
      case 'ArrowLeft': boxPosition = [x - 0.5, y, z]; break;
      case 'ArrowRight': boxPosition = [x + 0.5, y, z]; break;
    }
  }

  // Attach and remove event listener
  onMount(() => {
    console.log("onMount");
    console.log("@@@@boxPosition", boxPosition);
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });
  let rotation = $state(0);
  // const grass_text_gltf = useLoader(GLTFLoader).load('/assets/fluffy_grass_text.gltf');
  
  const scale = new Spring(1);

  useTask((delta) => {
    rotation += delta
  });

  // interactivity()
  // $inspect("resetCounter", resetCounter);
  // $inspect("showDebug", showDebug);
</script>

<T.PerspectiveCamera
  makeDefault
  position={[-17, 12, -10]}
  fov={75}
  aspect={window.innerWidth / window.innerHeight}
  near={0.1}
  far={1000}
  oncreate={(ref) => {
    ref.lookAt(0, 0, 0)
  }}
>
  <!-- <OrbitControls enableDamping target={[0, 0, 0]} /> -->
</T.PerspectiveCamera>

<T.DirectionalLight
  position={[0, 10, 10]}
  castShadow
/>

<T.Mesh
  rotation.y={rotation}
  position={boxPosition}
  scale={scale.current}
  onpointerenter={() => {
    scale.target = 1.5
  }}
  onpointerleave={() => {
    scale.target = 1
  }}
  castShadow
>
  <T.BoxGeometry args={[1, 2, 1]} />
  <T.MeshStandardMaterial color="hotpink" />
</T.Mesh>

{#await useGltf('/assets/island.glb') then gltf}
  <T is={gltf.scene} />
{/await}

<!-- <T.Mesh
  rotation.x={-Math.PI / 2}
  position.y={0}
  receiveShadow
>
  <T.CircleGeometry args={[6, 40]} />
  <T.MeshStandardMaterial color="white" />
</T.Mesh> -->
