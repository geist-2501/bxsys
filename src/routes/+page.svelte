<script lang="ts">
    import ProjectPreview from "$lib/components/ProjectPreview.svelte";
    import BlogPreview from "$lib/components/BlogPreview.svelte";

    export let data;
</script>

<div class="root">
    <div class="welcome">
        <h3>Fáilte,</h3>
        <p class="translation">(welcome)</p>
    </div>
    <h1>I'm Blair Cross.</h1>
    <h2>I like reinforcement learning and pragmatic DX.</h2>
    <h4>I also ramble incoherently. Read at yer own risk, ye mighty.</h4>
    <div class="featured">
        <div class="post">
            <h4>Featured post.</h4>
            <BlogPreview blog={data.blog} />
        </div>
        <div class="project">
            <h4>Featured project.</h4>
            <ProjectPreview project={data.project} />
        </div>
    </div>
</div>

<style lang="scss">
    .root {
        h1, h2, h3, h4, p {
            margin: 0.5rem 0;
        }

        .welcome {
            display: flex;
            flex-direction: row;
            align-items: baseline;

            > * {
                margin: 0;
            }

            .translation {
                color: #A6A6A6;
                margin-left: 15px;
            }
        }
    }

    .featured {
        display: grid;
        grid-template-columns: 2fr;
        grid-template-rows: 1fr;

        margin-top: 64px;

        .post {
            grid-column: 1 / span 1;
            margin-right: 20px;
        }

        .project {
            grid-column: 2 / span 1;
            margin-left: 20px;
        }
    }
</style>