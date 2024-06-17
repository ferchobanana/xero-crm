<script>
	import { enhance } from '$app/forms';
    import { paisesLatam as paises } from "$lib/utils/paises"
    export let form
</script>

<div>
    <h1>Crea un nuevo evento</h1>

    <form action="/?/createEvent" method="POST" class="card" use:enhance>

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
            <select id="" class="base-input" name="country">
                {#each paises as pais}
                    <option value={ pais }>{ pais }</option>
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
            <input type="text" class="base-input" placeholder="$">
        </div>

        <div class="input-container">
            <label for="" class="base-label">Moneda</label>
            <select name="value" id="" class="base-input">
                <option value="USD">USD</option>
                <option value="MSN">MXN</option>
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
</style>