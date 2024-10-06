<script lang="ts">
  import Device from "./Device.svelte";
  import svelteLogo from "$lib/images/svelte.svg";
  import viteLogo from "$lib/images/vite.svg";
  import { onMount } from "svelte";

  let names: Array<string> = [];
  let status: string = "Ready to wake!";
  onMount(async () => {
    console.log("Device mounted");

    const resNames = await fetch("/list");
    names = await resNames.json();
  });

  const statusHandler = (e:CustomEvent) => {
	console.log(e);
	status = e.detail;
  };
</script>

<svelte:head>
  <title>Wake On Lan Server</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Wake On Lan Server</h1>

  <div>
    <h2>Devices to wake</h2>
    <div class="card">
      {#each names as name}
        <Device {name} on:status={statusHandler} />
      {/each}
    </div>

	<div class="card">
		<h3>{status}</h3>
	</div>
    <p>
      Check out <a
        href="https://github.com/sveltejs/kit#readme"
        target="_blank"
        rel="noreferrer">SvelteKit</a
      >, the official Svelte app framework powered by Vite!
    </p>

    <p class="read-the-docs">
      Click on the Vite and Svelte logos to learn more
    </p>
  </div>
</section>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>