<script>
    import '$lib/fonts.css'
    import NavLink from "$lib/components/NavLink.svelte"

    // Theme.
    const backgroundColour = '#131313'
</script>

<div class="page" style="--col-bg: {backgroundColour}">
    <div class="header">
        <a href="/">
            <img class="logo" src="logo.svg" alt="Logo" />
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
        <img class="logo-small" src="logo-small.svg" alt="Logo" />
        <p>2023</p>
    </div>
</div>


<style>
    :global(*) {
        font-family: Rubik, sans-serif;
        color: white;
        box-sizing: border-box;
        font-weight: normal;
    }

    .header {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;

        display: flex;
        align-items: center;

        padding: 20px 10vw;
    }

    .logo {
        margin-left: -20px;
        height: 80px;
    }

    .logo-small {
        height: 12px;
        margin-right: 8px;
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
    }

    .footer p {
        margin: 0;
    }
</style>