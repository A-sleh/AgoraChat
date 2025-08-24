<script>
  import HomePage from '../components/HomePage.svelte';
	import LoginForm from '../components/LoginForm.svelte'
  import { onMount } from 'svelte';
  import { AgoraRTM, client, isLoggedIn } from './stores';
  import "../app.css"



onMount(async () => {
  const module  = await import('agora-rtc-sdk-ng')
  const AgoraRTC = module.default
  client.set(AgoraRTC.createClient({mode: 'live',codec: 'vp8'}))
})
let on = true
  
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>


<div class="app-layout">
  {#if $isLoggedIn != ''}
  <HomePage />
  {:else }
  <LoginForm />
  {/if}

</div>

<style>
.app-layout {
  height: 80vh;
  width: 70vw;
  background-color: #ffffff;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  border: 1px solid white;
}


</style>
