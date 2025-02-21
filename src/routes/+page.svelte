<script lang="ts">
	import Counter from '$lib/components/Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcomeFallback from '$lib/images/svelte-welcome.png';
  import { Canvas } from '@threlte/core';
  import { Button, Pane } from 'svelte-tweakpane-ui';
  import { World } from '@threlte/rapier';
  import Scene from '$lib/components/Scene.svelte';
  import { HTML } from '@threlte/extras';

  let resetCounter = $state(0);
  let showDebug = $state(false);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<!-- Debug panel -->
<!-- <Pane title="" position="fixed">
  <Button title="Reset" on:click={() => { resetCounter += 1}} />
  <Button title="Toggle Debug" on:click={() => { showDebug = !showDebug}} />
</Pane> -->

<section>
  <Canvas>
    <World>
      <Scene 
        {resetCounter}
        {showDebug}
      />

      {#snippet fallback()}
        <HTML transform>
          <p class="text-xs">
            It seems your browser<br />
            doesn't support WASM.<br />
            I'm sorry.
          </p>
        </HTML>
      {/snippet}
    </World>
  </Canvas>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
