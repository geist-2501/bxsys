<script lang="ts">
    import type {Blog} from "$lib/model/blog";
    import Link from "$lib/components/Link.svelte";

    export let blog: Blog | null
</script>

{#if blog === null}
    <p>Couldn't load blog</p>
{:else}
    <div class="post">
        <h3>{blog.title}</h3>
        <p class="tag">{blog.date.toLocaleDateString()}</p>
        <p>{blog.description}</p>
        <div class="link">
            <Link href={`blog/${blog.slug}`}>Read More</Link>
        </div>
    </div>
{/if}

<style lang="scss">
    .post {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        > * {
            margin: 6px 0;
        }

        .tag {
            background-color: white;
            color: #131313;
            padding: 4px 8px;
            border-radius: 4px;
            margin: unset 12px unset 0;
        }

        .link {
            display: flex; // Weird hack.
            margin-top: 10px;
        }
    }
</style>