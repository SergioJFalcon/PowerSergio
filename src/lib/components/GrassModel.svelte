<script lang="ts">
  import * as THREE from 'three';
  import { T } from '@threlte/core';
  import { useGltf, useTexture, InstancedMesh, Instance } from '@threlte/extras';

  const gltf = useGltf('/assets/grassLODs.glb');
  // const texture = useTexture('/assets/grass_model.png');
  // const assets = Promise.all([gltf, texture]);
  const assets = Promise.all([gltf]);
</script>

{#await useGltf('/assets/grassLODs.glb') then gltf}
  <T is={gltf.scene} />
{/await}