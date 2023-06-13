<script>
    import { page } from "$app/stores";

    export let link;
    export let text;

    function getPath(currentPath) {
      selected = currentPath === link
    }

    let selected;
    $: getPath($page.url.pathname)
</script>

<a href="{link}" class:selected>{text}</a>

<style>
    a {
        text-transform: uppercase;
        text-decoration: none;
    }

    .selected {
        font-style: italic;
    }
</style>