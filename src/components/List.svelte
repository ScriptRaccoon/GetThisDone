<script>
    import { fade, fly } from "svelte/transition";
    import { flip } from "svelte/animate";
    import { onMount } from "svelte";
    import Task from "./Task.svelte";
    import ListControl from "./ListControl.svelte";
    import ListFilters from "./ListFilters.svelte";
    import { lists, allTasks } from "../stores.js";
    import { PRIO, FILTER, SORT } from "../enums.js";

    export let list;

    let nameInput;

    $: {
        if (list.id.length == 0) {
            list.tasks = $allTasks;
        }
    }

    function addTask() {
        const newTask = {
            name: "New task",
            id: crypto.randomUUID(),
            complete: false,
            new: true,
            list: list.id,
            priority: PRIO.LOW,
        };
        list.tasks = [...list.tasks, newTask];
    }

    function deleteTask(task) {
        list.tasks = list.tasks.filter((t) => t.id != task.id);
        if (list.id.length == 0) {
            const theList = $lists.find((l) => l.id == task.list);
            if (theList) {
                theList.tasks = theList.tasks.filter(
                    (t) => t.id != task.id
                );
            }
            $lists = $lists;
        }
    }

    function moveTaskUp(index) {
        if (index == 0) return;
        list.tasks = [
            ...list.tasks.slice(0, index - 1),
            list.tasks[index],
            list.tasks[index - 1],
            ...list.tasks.splice(index + 1, list.tasks.length),
        ];
    }

    function moveTaskDown(index) {
        if (index == list.tasks.length - 1) return;
        list.tasks = [
            ...list.tasks.slice(0, index),
            list.tasks[index + 1],
            list.tasks[index],
            ...list.tasks.splice(index + 2, list.tasks.length),
        ];
    }

    onMount(() => {
        if (list.new && list.id) {
            delete list.new;
            nameInput?.select();
        }
    });

    $: filteredTasks =
        list.filter === FILTER.ALL
            ? list.tasks
            : list.filter == FILTER.COMPLETE
            ? list.tasks.filter((t) => t.complete)
            : list.tasks.filter((t) => !t.complete);

    $: sortedTasks =
        list.sort === SORT.INITIAL
            ? filteredTasks
            : list.sort == SORT.PRIORITY
            ? [
                  ...filteredTasks.filter(
                      (t) => t.priority === PRIO.HIGH
                  ),
                  ...filteredTasks.filter(
                      (t) => t.priority === PRIO.MED
                  ),
                  ...filteredTasks.filter(
                      (t) => t.priority === PRIO.LOW
                  ),
              ]
            : [...filteredTasks].sort((a, b) =>
                  a.name > b.name ? 1 : -1
              );
</script>

<section class="list">
    <input
        type="text"
        bind:value={list.name}
        bind:this={nameInput}
        disabled={list.id.length == 0}
    />

    <menu
        style={list.id.length == 0 ? "justify-content: flex-end" : ""}
    >
        {#if list.id.length > 0}
            <ListControl on:addTask={addTask} on:delete />
        {/if}
        <ListFilters bind:list />
    </menu>

    {#if list.tasks.length > 0}
        <ul>
            {#each sortedTasks as task, index (task.id)}
                <li
                    animate:flip={{ duration: 200 }}
                    in:fly|local={{ x: -50, duration: 200 }}
                    out:fly|local={{ x: +50, duration: 200 }}
                >
                    <Task
                        canMoveUp={list.sort == SORT.INITIAL &&
                            list.id.length > 0 &&
                            index > 0}
                        canMoveDown={list.sort == SORT.INITIAL &&
                            list.id.length > 0 &&
                            index < list.tasks.length - 1}
                        bind:task
                        on:delete={() => deleteTask(task)}
                        on:moveUp={() => moveTaskUp(index)}
                        on:moveDown={() => moveTaskDown(index)}
                    />
                </li>
            {/each}
        </ul>
    {:else}
        <p in:fade|local={{ delay: 200 }}>
            Create the first task in this list.
        </p>
    {/if}
</section>

<style>
    menu {
        padding: 10px 0px;
        display: flex;
        justify-content: space-between;
    }

    @media (max-width: 480px) {
        menu {
            flex-direction: column;
            gap: 10px;
        }
    }

    .list {
        max-width: 600px;
        margin: 0 auto;
    }

    input[type="text"] {
        font-size: 30px;
        margin-block: 10px;
        border-radius: 3px;
        width: 100%;
    }

    ul {
        list-style-type: none;
    }

    input[type="text"]:disabled {
        color: unset;
    }
</style>
