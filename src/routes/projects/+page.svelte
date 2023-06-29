<script lang="ts">
    import type {PageData} from "./$types"
    import ProjectPreview from "$lib/components/ProjectPreview.svelte";
    export let data: PageData
</script>
{#each data.projects as project}
    <ProjectPreview project={project} />
{/each}