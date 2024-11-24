<script lang="ts">
  import { onMount } from 'svelte';

  import { cidr_input } from '$lib/store';
  import { CIDR } from '$lib/CIDR';
  import isCidr from 'is-cidr';

  let canvas: HTMLCanvasElement;
  let canvas_context: CanvasRenderingContext2D | null = null;

  function drawCidr(cidr: CIDR) {
    // Wait for context to be captured
    if (canvas_context === null) {
      return;
    }

    canvas_context.fillStyle = 'red';
    canvas_context.fillRect(0, 0, 1024, 1024);

    const x =
      (cidr.octet1 % 16) * 16 ** 3 +
      (cidr.octet2 % 16) * 16 ** 2 +
      (cidr.octet3 % 16) * 16 +
      (cidr.octet4 % 16);

    const y =
      Math.floor(cidr.octet1 / 16) * 16 ** 3 +
      Math.floor(cidr.octet2 / 16) * 16 ** 2 +
      Math.floor(cidr.octet3 / 16) * 16 +
      Math.floor(cidr.octet4 / 16);

    canvas_context.fillStyle = 'green';
    canvas_context.fillRect(x, y, 256, 256);
  }

  function render() {
    if (isCidr($cidr_input)) {
      drawCidr(new CIDR($cidr_input));
    }
  }

  onMount(() => {
    canvas_context = canvas.getContext('2d');
    render();
  });
  // TODO: use render function and remain reactive.
  $: {
    if (isCidr($cidr_input)) {
      drawCidr(new CIDR($cidr_input));
    }
  }
</script>

<canvas width="1024" height="1024" bind:this={canvas} />
