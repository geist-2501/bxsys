<script lang="ts">
    import type {PageData} from "./$types"
    import BlogPreview from "$lib/components/BlogPreview.svelte";
    export let data: PageData
</script>
{#each data.posts as post}
    <BlogPreview post={post} />
{/each}