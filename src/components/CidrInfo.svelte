<script lang="ts">
  import { CIDR } from '$lib/CIDR';
  import { cidr_input } from '$lib/store';
  import isCidr from 'is-cidr';

  let cidr: CIDR | null = null;

  $: {
    cidr = isCidr($cidr_input) ? new CIDR($cidr_input) : null;
  }
</script>

CIDR: {$cidr_input} <br />
Valid? {cidr?.valid ? 'Y' : 'N'}<br />
Start: {cidr?.start ?? 0}<br />
End: {cidr?.end ?? 0}<br />
