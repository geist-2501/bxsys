<script>
    export let markdown
</script>

<div class="reset">
    <svelte:component this={markdown} />
</div>

<style lang="scss">
    :global(.reset > *) {
        margin: revert;
    }
</style>