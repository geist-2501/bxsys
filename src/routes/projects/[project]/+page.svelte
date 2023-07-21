<script lang="ts">
    import type {ProjectPageData} from "./+page.js";
    import ProjectHeader from "$lib/components/ProjectHeader.svelte";
    import MarkdownRenderer from "$lib/components/MarkdownRenderer.svelte";
    export let data: ProjectPageData

    const { project, metadata } = data
</script>

<div class="container">
    <div class="header">
        <ProjectHeader project={metadata} big />
    </div>
    <MarkdownRenderer markdown={project} />
</div>

<style lang="scss">
    .container {
        max-width: 60vw;

        .header {
            margin-bottom: 20px;
        }
    }
</style>
