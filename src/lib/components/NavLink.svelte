<script lang="ts">
    import { page } from "$app/stores";

    export let link: string;
    export let text: string;

    function getPath(currentPath: string) {
      selected = currentPath === link
    }

    let selected: boolean;
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