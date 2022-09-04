<script>
    import { createEventDispatcher } from "svelte";
    import Fa from "svelte-fa";
    import {
        faPlus,
        faTrashCan,
    } from "@fortawesome/free-solid-svg-icons";
    const dispatch = createEventDispatcher();
</script>

<div>
    <button
        title="add task"
        class="menuBtn addBtn"
        on:click={() => dispatch("addTask")}
    >
        <Fa icon={faPlus} />
    </button>

    <button
        title="delete list"
        class="menuBtn"
        on:click={() => dispatch("delete")}
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
