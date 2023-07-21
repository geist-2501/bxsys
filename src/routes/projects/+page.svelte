<script lang="ts">
    import ProjectPreview from "$lib/components/ProjectPreview.svelte";
    import type {ProjectsPageData} from "./+page";
    export let data: ProjectsPageData
</script>
{#each data.projects as project}
    <div class="container">
        <ProjectPreview project={project} />
    </div>
{/each}

<style>
    .container {
        margin-bottom: 64px;
        max-width: 500px;
    }
</style>