<script>
    import Fa from "svelte-fa";
    import { faPlus } from "@fortawesome/free-solid-svg-icons";
    import { scale } from "svelte/transition";
    import { lists } from "../stores.js";
    import { FILTER, SORT } from "../enums.js";
    export let currentList;
    export let showAllTasks;

    function addList() {
        const newList = {
            name: "New list",
            id: crypto.randomUUID(),
            tasks: [],
            new: true,
            filter: FILTER.ALL,
            sort: SORT.INITIAL,
        };
        $lists = [...$lists, newList];

        currentList = newList;
    }
</script>

<menu>
    <button
        class="menuBtn addBtn"
        on:click={addList}
        title="add list"
    >
        <Fa icon={faPlus} />
    </button>
    {#if $lists.length >= 2}
        <button
            transition:scale={{ duration: 200 }}
            class="listBtn"
            class:current={showAllTasks}
            on:click={() => {
                showAllTasks = true;
                currentList = null;
            }}
        >
            All tasks
        </button>
    {/if}
    <div class="lists">
        {#each $lists as list (list.id)}
            <button
                transition:scale={{ duration: 200 }}
                class="listBtn"
                class:current={currentList == list}
                on:click={() => {
                    showAllTasks = false;
                    currentList = list;
                }}
            >
                {list.name}
            </button>
        {/each}
    </div>
</menu>

<style>
    menu {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding: 0px 10px;
    }

    .addBtn {
        color: var(--success-color);
    }

    .lists {
        display: flex;
        gap: 10px;
        overflow-x: auto;
        padding: 20px 0px;
    }

    .listBtn {
        background-color: var(--primary-color);
        padding: 5px 12px;
        border-radius: 100vw;
        color: white;
        white-space: nowrap;
    }

    .listBtn:hover,
    .listBtn:focus-visible {
        filter: brightness(1.2);
    }

    .listBtn.current {
        background-color: var(--secondary-color);
    }
</style>
