<script>
    let active = false;
</script>

<div
    on:mouseenter={() => active = true}
    on:mouseleave={() => active = false}
    class="proverb"
>
    <p class="text" class:showing={!active}>Chan eil thu tuilleach 's sean airson ionnsachadh fhathast</p>
    <p class="text" class:showing={active}>(From Gaelic) We are to learn as long as we live</p>
</div>

<style lang="scss">
    .proverb {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;

        font-style: italic;

        p {
            margin: 0;
        }
    }

    .text {
        grid-column: 1 / span 1;
        grid-row: 1 / span 1;
        color: transparent;
        transition: color 0.2s ease-in;
    }

    .showing {
        color: #A6A6A6;
    }
</style>