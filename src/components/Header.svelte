<script>
    import Fa from "svelte-fa";
    import { faGithub } from "@fortawesome/free-brands-svg-icons";
</script>

<header>
    <a
        href="https://github.com/ScriptRaccoon/GetThisDone"
        target="_blank"
        title="GitHub repository"
    >
        <Fa icon={faGithub} />
    </a>
    <h1>Get this done</h1>
</header>

<style>
    header {
        text-align: center;
        padding: 20px 0px;
        background: var(--primary-color);
        color: white;
        position: relative;
    }
    h1 {
        font-weight: 400;
    }
    a {
        position: absolute;
        color: inherit;
        top: 5px;
        right: 8px;
    }
</style>
