<script lang="ts">
    import type {Project} from "$lib/model/project";
    import Link from "$lib/components/Link.svelte";

    export let project: Project | null
</script>

{#if project === null}
    <p>Couldn't load project</p>
{:else}
    <div class="project">
        <div class="row">
            <h3 class="title">{project.title}</h3>
            {#each project.links as link}
                <Link href={link.link}>{link.displayName}</Link>
            {/each}
        </div>
        <div class="row">
            {#each project.tags as tag}
                <p class="tag">{tag}</p>
            {/each}
        </div>
        <div class="row">
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

        .row {
            display: flex;
            flex-direction: row;
            align-items: baseline;
            margin: 6px 0;

            .title {
                margin-right: 18px;
            }

            > * {
                margin-right: 12px
            }

            .tag {
                background-color: white;
                color: #131313;
                padding: 4px 8px;
                border-radius: 4px;
                margin: unset 12px unset 0;
            }
        }

        .link {
            display: flex; // Weird hack.
            margin-top: 10px;
        }
    }
</style>