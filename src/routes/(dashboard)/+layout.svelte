<script>
    import DashboardSideMenu from '$lib/components/DashboardSideMenu.svelte';
</script>

<div class="app">

    <DashboardSideMenu></DashboardSideMenu>

    <main>
        <slot></slot>
    </main>

</div>

<style>
    .app {
        display: flex;
        background-color: var(--background-light-color);
    }
    main {
        flex: 1;
        padding: 30px 20px;
    }
</style>