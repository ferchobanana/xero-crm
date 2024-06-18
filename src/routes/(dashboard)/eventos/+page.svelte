<script lang="ts">
    import { page } from '$app/stores';

    export let data

    type paginationObj = {
        count: number
        limit: number
    }

    // Action para la paginacion
    function pagination(node: HTMLDivElement, obj: paginationObj) {
        node.innerHTML = ""
        let current_page = Number($page.url.searchParams.get('p')) ?? 0

        // Calculamos la cantidad de paginas
        const pages = Math.ceil(obj.count / obj.limit)

        // Insertamos una opcion de pagina segun la cantidad de paginas
        for(let i = 1; i <= pages; i++) {
            if(current_page === i) {
                node.innerHTML += `<a class="selected-page" href="?p=${i}">${i}</a>`
            } else {
                node.innerHTML += `<a href="?p=${i}">${i}</a>`
            }
        }
    }

</script>

<div>
    <h1>Tus eventos</h1>

    <div class="events">
        {#each data.events as e}
            <div class="event card">
                <p class="event-type">{ e.type }</p>
                <p class="name">{ e.event.name }</p>
                <p>{ e.event.number }</p>
                <p>{ e.event.email }</p>
                <p class="price">{ e.event.value } { e.event.currency }</p>
            </div>
        {/each}
    </div>

    {#if data.count > data.pageLimit}
        <div class="base-pagination" use:pagination={{count: data.count, limit: data.pageLimit}}>
            <a href="?p=1">1</a>
            <a href="?p=2">2</a>
        </div>
    {/if}

</div>

<style>

    h1 {
        font-size: 50px;
        margin-bottom: 30px;
    }

    .events {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .event-type {
        font-weight: 600;
        font-size: 20px;
    }
    .price {
        font-weight: 500;
        color: #2cc28b;
    }

</style>