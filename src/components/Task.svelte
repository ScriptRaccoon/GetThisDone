<script>
    import Fa from "svelte-fa";
    import { faCircleCheck as completeIcon } from "@fortawesome/free-solid-svg-icons";
    import { faCircleCheck as incompleteIcon } from "@fortawesome/free-regular-svg-icons";
    import { onMount } from "svelte";
    import TaskMenu from "./TaskMenu.svelte";
    import { PRIO } from "../enums.js";

    export let task;
    export let canMoveUp = false;
    export let canMoveDown = false;

    let nameInput;
    let showRing = false;
    let showMenu = false;

    onMount(() => {
        if (task.new) {
            delete task.new;
            nameInput?.select();
        }
    });
</script>

<div class="task" class:complete={task.complete}>
    <input type="text" bind:this={nameInput} bind:value={task.name} />

    <select
        class="prioSelect {task.priority}"
        bind:value={task.priority}
    >
        {#each Object.values(PRIO) as val}
            <option value={val}>{val}</option>
        {/each}
    </select>

    <button
        class="menuBtn completeBtn"
        title={task.complete
            ? "Mark as incomplete"
            : "Mark as complete"}
        on:click={() => {
            task.complete = !task.complete;
            showRing = true;
            setTimeout(() => {
                showRing = false;
            }, 250);
        }}
    >
        {#if showRing}
            <span class="ring" />
        {/if}
        <Fa icon={task.complete ? completeIcon : incompleteIcon} />
    </button>

    <TaskMenu
        bind:task
        bind:showMenu
        on:delete
        {canMoveUp}
        {canMoveDown}
        on:moveUp
        on:moveDown
    />
</div>

<style>
    .task {
        display: flex;
        gap: 10px;
        transition: opacity 100ms linear;
        border-bottom: 1px solid var(--gray-color);
        align-items: center;
        position: relative;
    }

    .task.complete > input[type="text"] {
        opacity: 0.4;
    }

    button {
        font-size: 16px;
    }

    .completeBtn {
        color: var(--success-color);
    }

    input[type="text"] {
        flex-grow: 1;
    }

    .prioSelect {
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        background-image: none;
        color: white;
        display: inline;
        padding: 3px 0px;
        border-radius: 5px;
        font-size: 14px;
        width: 40px;
        text-align: center;
    }

    .prioSelect > option {
        background-color: var(--light-gray-color);
        color: black;
    }

    .prioSelect.low {
        background-color: forestgreen;
    }

    .prioSelect.med {
        background-color: orange;
    }

    .prioSelect.high {
        background-color: rgb(253, 51, 51);
    }

    .ring {
        outline: 3px solid forestgreen;
        border-radius: 50%;
        aspect-ratio: 1;
        width: 14px;
        position: absolute;
        animation: grow 250ms ease-out forwards;
    }

    @keyframes grow {
        from {
            opacity: 1;
            transform: translate(1px, 4px) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(1px, 4px) scale(1.6);
        }
    }
</style>
