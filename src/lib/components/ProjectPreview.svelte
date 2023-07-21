<script lang="ts">
    import type {Project} from "$lib/model/project";
    import Link from "$lib/components/Link.svelte";
    import ProjectHeader from "$lib/components/ProjectHeader.svelte";

    export let project: Project | null
</script>

{#if project === null}
    <p>Couldn't load project</p>
{:else}
    <div class="project">
        <ProjectHeader project={project} />
        <div class="description">
            <p>{project.description}</p>
        </div>

        <div class="link">
            <Link href={`projects/${project.slug}`}>Read more</Link>
        </div>
    </div>
{/if}

<style lang="scss">
    .project {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .description {
            margin: 6px 0;
        }

        .link {
            display: flex; // Weird hack.
            margin-top: 10px;
        }
    }
</style>