import { writable, derived } from "svelte/store";
import { debounce } from "./util.js";

export const lists = writable(
    JSON.parse(localStorage.getItem("lists")) ?? []
);

lists.subscribe(
    debounce(($lists) => {
        localStorage.setItem("lists", JSON.stringify($lists));
    }, 200)
);

export const allTasks = derived(lists, ($lists) =>
    $lists.map((l) => l.tasks).flat()
);
