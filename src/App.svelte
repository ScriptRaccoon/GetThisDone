<script>
    import Confirm from "./components/Confirm.svelte";
    import Header from "./components/Header.svelte";
    import List from "./components/List.svelte";
    import MainMenu from "./components/MainMenu.svelte";

    import { lists } from "./stores.js";
    import { FILTER, SORT } from "./enums.js";

    let question = "";
    let confirmedAction = () => {};

    let showAllTasks = false;

    let currentList = $lists[0] ?? null;

    function deleteList(list) {
        confirmedAction = () => {
            $lists = $lists.filter((l) => l.id != list.id);
            currentList = $lists[0] ?? null;
        };
        question = `Do you really want to delete the list '${list.name}'?`;
    }

    let listOfAllTasks = {
        id: "",
        name: "All tasks",
        tasks: [],
        sort: SORT.INITIAL,
        filter: FILTER.ALL,
    };

    $: if (currentList) {
        $lists = $lists;
    }
</script>

<svelte:head>
    <title>Get this done</title>
</svelte:head>

<Header />

<MainMenu bind:currentList bind:showAllTasks />

<Confirm bind:question {confirmedAction} />

<main>
    {#if currentList}
        {#key currentList.id}
            <List
                bind:list={currentList}
                on:delete={() => deleteList(currentList)}
            />
        {/key}
    {:else if showAllTasks}
        <List bind:list={listOfAllTasks} />
    {:else}
        <p class="info">Create your first list.</p>
    {/if}
</main>

<style>
    main {
        padding: 10px 20px;
    }
    .info {
        text-align: center;
        width: 100%;
    }
</style>
