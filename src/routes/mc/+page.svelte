<!-- Dashboard -->
<script lang="ts">
    /** @type {import('./$types').PageData} */
	export let data;
    console.log('data', data);
</script>
<h1>Dashboard</h1>
<p>Welcome to the dashboard</p>
<div>
    My Clients({data.clients.length})
    
</div>

<div>
    Active Individual counseling({data.counselings.length})
</div>

<div>
    Link/Refer List({data.links.length})
</div>