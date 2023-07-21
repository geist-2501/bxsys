<script lang="ts">
    import type {Post} from "$lib/model/post";
    import Link from "$lib/components/Link.svelte";
    import BlogHeader from "$lib/components/BlogHeader.svelte";

    export let post: Post | null
</script>

{#if post === null}
    <p>Couldn't load post</p>
{:else}
    <div class="post">
        <BlogHeader post={post} />
        <p>{post.description}</p>
        <div class="link">
            <Link href={`blog/${post.slug}`}>Read More</Link>
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

        .link {
            display: flex; // Weird hack.
            margin-top: 10px;
        }
    }
</style>