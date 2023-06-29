<script  lang="ts">
    import type {PageData} from "./$types"
    export let data: PageData

    const { project } = data
</script>

<svelte:component this={project} />
