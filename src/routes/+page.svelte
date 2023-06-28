<div class="root">
    <div class="welcome">
        <h3>Fáilte,</h3>
        <p class="translation">(welcome)</p>
    </div>
    <h1>I'm Blair Cross.</h1>
    <h3>Welcome to my silly little corner of the internet.</h3>
    <h2>I like reinforcement learning and pragmatic DX.</h2>
    <h4>I also ramble incoherently. Read at yer own risk, ye mighty.</h4>
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
</style>