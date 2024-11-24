<script lang="ts">
  import { cidr_input } from '$lib/store';
</script>

Please enter CIDR: <input type="string" placeholder="10.0.0.0/8" bind:value={$cidr_input} />
