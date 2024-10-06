<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let name: string;

  const dispatch = createEventDispatcher();

  const on = async (name: string) => {
    try { 
      const response = await fetch("/on", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const res = await response.json();
      
      if( res.stdout !== undefined ) {
        console.log(res.stdout);
        dispatch("status", `sent packet to ${name}!`);
      }
    } catch(e) {
      console.error(e);
      dispatch("status", `Error sending packet to ${name}!`);
    }
  };
</script>

<button on:click={() => on(name)}>
  {name}
</button>
