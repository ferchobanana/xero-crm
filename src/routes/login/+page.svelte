<script lang="ts">

    import { enhance } from "$app/forms"
    import type { PageData, ActionData } from "./$types"

    // export let data: PageData
    export let form: ActionData

</script>

<div class="login">

    <form method="POST" use:enhance>
        <h1>Inicia sesión</h1>

        <label for="email">Correo electronico</label>
        <input type="email" name="email" id="email">

        <label for="password">Cpntraseña</label>
        <input type="password" name="password" id="password">

        <button>Iniciar sesión</button>

        <p>{ form?.message ?? ""}</p>
    </form>

</div>