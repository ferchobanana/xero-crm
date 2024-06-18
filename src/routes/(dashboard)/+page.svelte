<script lang="ts">
	import { enhance } from '$app/forms';
    import { page } from '$app/stores'

    import { paisesLatam as paises } from "$lib/utils/paises"
    import LoadingPage from "$lib/components/LoadingPage.svelte"
    export let form

    let loading = false

    $: if(form?.message) {
        loading = false
    }

    function pageLoading() {
        loading = true
    }

    // let pageMessage: string | null = $page.url.searchParams.get('msg')

</script>

<div>

    {#if loading}
        <LoadingPage></LoadingPage>
    {/if}

    <!-- {#if pageMessage}
        <div class="page-message">
            <p>{ pageMessage }</p>
        </div>
    {/if} -->

    <h1>Crea un nuevo evento</h1>

    <form action="/?/createEvent" method="POST" class="card" use:enhance on:submit={pageLoading}>

        <div class="input-container">
            <label for="" class="base-label">Nombre *</label>
            <input type="text" class="base-input" name="name" placeholder="Nombre completo"> 
        </div>
        
        <div class="input-container">
            <label for="" class="base-label">Número celular *</label>
            <input type="text" class="base-input" name="number" placeholder="Número">
        </div>

        <div class="input-container">
            <label for="" class="base-label">Correo electrónico (opcional)</label>
            <input type="text" class="base-input" name="email" placeholder="Email">
        </div>

        <div class="input-container">
            <label for="" class="base-label">País *</label>
            <select id="" class="base-input" name="country" value="mx">
                {#each paises as p}
                    <option value={ p.code }>{ p.name }</option>
                {/each}
            </select>
        </div>

        <div class="input-container">
            <label for="" class="base-label">Tipo de evento *</label>
            <select name="event-type" id="" class="base-input">
                <option value="Purchase">Comprar</option>
                <option value="Lead">Cliente potencial</option>
            </select>
        </div>

        <div class="input-container">
            <label for="" class="base-label">Valor de la compra (opcional)</label>
            <input type="text" class="base-input" name="value" placeholder="$">
        </div>

        <div class="input-container">
            <label for="" class="base-label">Moneda</label>
            <select name="currency" id="" class="base-input" value="MXN">
                <option value="USD">USD</option>
                <option value="MXN">MXN</option>
            </select>
        </div>

        <button class="base-button">Crear evento</button>

        <p>{ form?.message ?? "" }</p>
    </form>

</div>

<style>
    h1 {
        font-size: 50px;
        margin-bottom: 30px;
    }

    form {
        width: 600px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
    .input-container {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    button {
        width: 200px;
    }

    .page-message {
        width: 400px;
        display: grid;
        place-items: center;
        background-color: #fff;
        height: 60px;
        color: #2cc28b;
        font-weight: 500;
        border-radius: 10px;
        margin-bottom: 20px;
        box-shadow: 0px 0px 50px -20px rgba(0, 0, 0, 0.1);
    }
</style>