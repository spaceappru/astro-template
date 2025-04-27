<svelte:options customElement={{ tag: "spaceapp-example", shadow: "none" }} />

<script lang="ts">
  interface Props {
    name?: string;
  }

  let { name = "никто" }: Props = $props();
</script>

<h2 class="bg-blue-200 text-red-700">Привет, {name}!</h2>
