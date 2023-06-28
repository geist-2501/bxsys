<script>
    import '$lib/fonts.css'
    import NavLink from "$lib/components/NavLink.svelte"
    import logoSmall from "$lib/svg/logo-small.svg"
    import logo from "$lib/svg/logo.svg"
    import Proverb from "$lib/components/Proverb.svelte";

    // Theme.
    const backgroundColour = '#131313'
</script>

<div class="page" style="--col-bg: {backgroundColour}">
    <div class="header">
        <a href="/">
            <img class="logo" src={logo} alt="Logo" />
        </a>
        <div class="links">
            <NavLink link="/projects" text="projects" />
            <NavLink link="/blog" text="blog" />
            <NavLink link="/contact" text="contact" />
        </div>
    </div>
    <div>
        <slot></slot>
    </div>
    <div class="footer">
        <img class="logo-small" src={logoSmall} alt="Logo" />
        <p>2023</p>
        <div>
            <Proverb />
        </div>
    </div>
</div>


<style lang="scss">
    :global(*) {
        font-family: Rubik, sans-serif;
        color: white;
        box-sizing: border-box;
        font-weight: normal;
    }

    .logo {
        margin-left: -23px;
        height: 80px;
    }

    .page {
        position: relative;
        overflow: auto;
        background-color: var(--col-bg);
        width: 100vw;
        min-height: 100vh;
        padding: 200px 10vw;

        display: flex;
        align-items: center;

        .header {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;

            display: flex;
            align-items: center;

            padding: 20px 10vw;
        }
    }

    .links {
        margin-left: 60px;
    }

    .links > :global(a) {
        margin: 0 40px;
    }

    .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;

        padding: 20px 10vw;

        display: flex;
        flex-direction: row;
        align-items: baseline;

        .logo-small {
            height: 12px;
        }

        > * {
            margin: 0 8px;
        }

        .proverb {
            color: #A6A6A6;
            font-style: italic;
        }
    }
</style>