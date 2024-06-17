<script>
    import { enhance } from "$app/forms";
    import Logo from "$lib/imgs/logo.png"
</script>

<div class="side-menu">
    <div class="logo">
        <img src={Logo} alt="">
    </div>

    <div class="options">
        <a href="/">Crear evento</a>
        <a href="/eventos">Eventos</a>
        <a href="/config">Configuraciones</a>
    </div>

    <form action="/?/logout" method="POST" use:enhance>
        <button class="base-button">Cerrar sesion</button>
    </form>
</div>

<style>
    .side-menu {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 300px;
        height: 100vh;
        padding: 40px 15px;
        background-color: var(--background-dark-color);
    }

    /* Logo */
    .logo {
        width: 100%;
        display: grid;
        place-items: center;
        margin-bottom: 60px;
    }
    .logo img {
        width: 80%;
    }

    .options {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .options a {
        color: #fff;
        text-decoration: none;
        font-size: 18px;
    }

    form {
        position: absolute;
        bottom: 30px;
        left: 0;
        width: 100%;
        display: grid;
        place-items: center;
    }
</style>