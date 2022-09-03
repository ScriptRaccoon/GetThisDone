<script>
    import Fa from "svelte-fa";
    import {
        faPlus,
        faTrashCan,
    } from "@fortawesome/free-solid-svg-icons";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let addTask = () => {};
</script>

<div>
    <button
        class="menuBtn addBtn"
        on:click={addTask}
        title="add task"
    >
        <Fa icon={faPlus} />
    </button>
    <button
        class="menuBtn"
        on:click={() => dispatch("delete")}
        title="delete list"
    >
        <Fa icon={faTrashCan} />
    </button>
</div>

<style>
    div {
        display: flex;
        gap: 10px;
    }
    .addBtn {
        color: var(--success-color);
    }
</style>
