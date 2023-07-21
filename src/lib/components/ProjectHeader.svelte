<script lang="ts">
    import type {Project} from "$lib/model/project";
    import Link from "$lib/components/Link.svelte";

    export let project: Project
    export let big = false
</script>

<div class="header">
    <div class="row">
        {#if big}
            <h1 class="title">{project.title}</h1>
        {:else}
            <h3 class="title">{project.title}</h3>
        {/if}
        {#each project.links as link}
            <Link href={link.link}>{link.displayName}</Link>
        {/each}
    </div>
    <div class="row">
        {#each project.tags as tag}
            <p class="tag">{tag}</p>
        {/each}
    </div>
</div>

<style lang="scss">
    .header {
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
    }
</style>