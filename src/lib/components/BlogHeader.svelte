<script lang="ts">
    import type {Post} from "$lib/model/post";

    export let post: Post
</script>

<div class="post">
    <h3>{post.title}</h3>
    <p class="tag">{post.date.toLocaleDateString()}</p>
</div>

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
    }
</style>