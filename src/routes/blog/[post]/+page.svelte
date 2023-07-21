<script  lang="ts">
    import MarkdownRenderer from "$lib/components/MarkdownRenderer.svelte";
    import BlogHeader from "$lib/components/BlogHeader.svelte";
    import type {BlogPageData} from "./+page";

    export let data: BlogPageData

    const { post, metadata } = data
</script>

<div class="container">
    <div class="header">
        <BlogHeader post={metadata} />
    </div>
    <MarkdownRenderer markdown={post} />
</div>

<style lang="scss">
    .container {
        max-width: 60vw;

        .header {
            margin-bottom: 20px;
        }
    }
</style>