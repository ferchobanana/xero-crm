<script>
    import DashboardSideMenu from '$lib/components/DashboardSideMenu.svelte';
</script>

<svelte:head>
    <!-- Meta Pixel Code -->
    <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '2166614673723344');
    fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" alt="" style="display:none"
    src="https://www.facebook.com/tr?id=2166614673723344&ev=PageView&noscript=1"
    /></noscript>
    <!-- End Meta Pixel Code -->   
</svelte:head>

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