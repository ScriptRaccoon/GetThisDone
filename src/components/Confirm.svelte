<script>
    import { scale, fade } from "svelte/transition";
    export let question = "";
    export let confirmedAction = false;
</script>

{#if question}
    <div class="back" transition:fade={{ duration: 200 }} />
    <aside transition:scale={{ duration: 200 }}>
        <p>{question}</p>
        <menu>
            <button
                on:click={() => {
                    confirmedAction();
                    question = "";
                }}>Yes</button
            >
            <button
                on:click={() => {
                    question = "";
                }}>Cancel</button
            >
        </menu>
    </aside>
{/if}

<style>
    .back {
        position: fixed;
        inset: 0;
        background-color: #0005;
        z-index: 9;
    }
    aside {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        border-radius: 10px;
        box-shadow: 0px 0px 15px #0004;
        padding: 25px;
        max-width: 400px;
        background-color: white;
    }
    p {
        padding-bottom: 20px;
        font-size: 20px;
    }
    menu {
        display: flex;
        justify-content: center;
        gap: 20px;
    }
    button {
        border: 1px solid var(--gray-color);
        padding: 5px 12px;
        border-radius: 5px;
    }
    button:hover,
    button:focus-visible {
        background-color: var(--gray-color);
        color: white;
    }
</style>
