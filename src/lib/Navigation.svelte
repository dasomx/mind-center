<script>
    let menus = [
        { name: 'Menu 1', link: '/menu1' },
        { name: 'Menu 2', link: '/menu2' },
        { name: 'Menu 3', link: '/menu3' },
        { name: 'Menu 4', link: '/menu4' },
        { name: 'Menu 5', link: '/menu5' }
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