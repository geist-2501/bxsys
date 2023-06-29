<script lang="ts">
    export let href: string;
</script>

<a href={href} class="link"><slot/></a>

<style lang="scss">
    .link {
        text-transform: uppercase;
        text-decoration: none;

        transition: transform 0.2s ease-in-out;

        &:hover {
            transform: skewX(-20deg);
        }
    }
</style>