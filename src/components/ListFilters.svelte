<script>
    import { FILTER, SORT } from "../enums.js";
    export let list;
</script>

<div>
    <label>
        <small>Sort by</small>

        <select bind:value={list.sort}>
            <option value={SORT.INITIAL}>initial</option>
            <option value={SORT.PRIORITY}>priority</option>
            <option value={SORT.ALPHABETICALLY}>alphabetically</option
            >
        </select>
    </label>
    <label>
        <small>Filter tasks</small>

        <select bind:value={list.filter}>
            <option value={FILTER.ALL}>all</option>
            <option value={FILTER.INCOMPLETE}>incomplete</option>
            <option value={FILTER.COMPLETE}>complete</option>
        </select>
    </label>
</div>

<style>
    div {
        display: flex;
        gap: 20px;
    }
    small {
        color: var(--gray-color);
    }
</style>
