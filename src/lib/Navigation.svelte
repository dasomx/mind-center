<script>
    let menus = [
        { name: 'Dashboard', link: '/' },
        { name: 'My Clients', link: '/clients' },
        { name: 'My Counselings', link: '/counselings' },
        { name: 'Link / Refer', link: '/links' },
    ];
</script>

<nav>
    {#each menus as menu}
        <a href={menu.link}>{menu.name}</a>
    {/each}
</nav>

<style>
    nav {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        background-color: #f0f0f0;
    }

    a {
        text-decoration: none;
        color: #333;
        margin-right: 10px;
    }
</style>