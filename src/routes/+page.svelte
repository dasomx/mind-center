<script>
	import { goto } from '$app/navigation';
    import Button from '@smui/button'
</script>
<h1>Welcome to Mind Center</h1>

<Button on:click={()=>goto('/auth/login')}>Login</Button>