<script>
    import { slide } from "svelte/transition";
    import Fa from "svelte-fa";
    import {
        faBars,
        faXmark,
    } from "@fortawesome/free-solid-svg-icons";
    import { lists } from "../stores.js";
    import { clickOutside } from "../actions.js";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let showMenu;
    export let task;
    export let canMoveUp;
    export let canMoveDown;

    let chosenList = task.list;

    function moveTaskToList() {
        showMenu = false;
        const index = $lists.findIndex((l) => l.id == task.list);
        if (index < 0) return;
        $lists[index].tasks = $lists[index].tasks.filter(
            (t) => t.id != task.id
        );
        task.list = chosenList;
        const newIndex = $lists.findIndex((l) => l.id == task.list);
        $lists[newIndex].tasks = [...$lists[newIndex].tasks, task];
    }
</script>

<div>
    <button
        class="menuBtn menuToggler"
        on:click={() => (showMenu = !showMenu)}
    >
        {#if showMenu}
            <Fa icon={faXmark} />
        {:else}
            <Fa icon={faBars} />
        {/if}
    </button>
    {#if showMenu}
        <menu
            transition:slide={{ duration: 100 }}
            use:clickOutside
            on:click_outside={() => {
                setTimeout(() => (showMenu = false), 100);
            }}
        >
            <button on:click={() => dispatch("delete")}>Delete</button
            >

            {#if canMoveUp}
                <button
                    transition:slide|local={{ duration: 200 }}
                    on:click={() => {
                        showMenu = false;
                        dispatch("moveUp");
                    }}>Move up</button
                >
            {/if}

            {#if canMoveDown}
                <button
                    transition:slide|local={{ duration: 200 }}
                    on:click={() => {
                        showMenu = false;
                        dispatch("moveDown");
                    }}>Move down</button
                >
            {/if}

            <select
                bind:value={chosenList}
                on:change={moveTaskToList}
            >
                {#each $lists as list (list.id)}
                    <option value={list.id}>{list.name}</option>
                {/each}
            </select>
        </menu>
    {/if}
</div>

<style>
    .menuToggler {
        width: 20px;
    }

    menu {
        position: absolute;
        right: 0;
        z-index: 5;
        background-color: white;
        display: flex;
        flex-direction: column;
        border: 1px solid var(--gray-color);
        box-shadow: 0px 0px 8px #0006;
        font-size: 14px;
        border-radius: 4px;
    }

    menu button {
        padding: 5px 10px;
        text-align: left;
    }

    menu button:hover,
    menu button:focus-visible {
        background-color: var(--light-gray-color);
    }
</style>
