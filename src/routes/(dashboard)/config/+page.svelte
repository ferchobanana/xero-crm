<script>
	import { enhance } from '$app/forms';
    export let form
    export let data
</script>

<div>

    <h1>Configuración</h1>

    <form method="POST" class="card">

        <div class="input-container">
            <label for="dataset_id" class="base-label">Identificador de conjunto de datos</label>
            <input type="text" class="base-input" id="dataset_id"
                    name="dataset_id" placeholder="ID" value={data.config?.datasetID ?? ""}>
        </div>

        <div class="input-container">
            <label for="token" class="base-label">Token de API</label>
            <input type="password" class="base-input" id="token"
                    name="token" placeholder="Token" value={data.config?.APIToken ?? ""}>
        </div>

        <button class="base-button">Guardar</button>

        <p class="form-message">{ form?.message ?? "" }</p>
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