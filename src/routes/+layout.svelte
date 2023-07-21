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
        color: white;
        box-sizing: border-box;
        font-weight: normal;
        margin: 0;
    }

    :global(code) {
        font-family: 'JetBrains Mono', monospace;

        > * {
            font-family: 'JetBrains Mono', monospace;

        }
    }

    :global(h1) {
        font-size: 48px;
    }

    :global(h2) {
        font-size: 40px;
    }

    :global(h3) {
        font-size: 36px;
    }

    :global(h4) {
        font-size: 24px;
    }

    :global(p, a) {
        font-size: 20px;
    }

    .logo {
        margin-left: -23px;
        height: 80px;
    }

    .page {
        font-family: Rubik, sans-serif;

        position: relative;
        overflow: auto;
        background-color: var(--col-bg);
        width: 100%;
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
    }
</style>