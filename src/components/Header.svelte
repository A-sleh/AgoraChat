<script>
  
  import { isAudioOn, isLoggedIn, isVideoOn, userInfoInChanle } from '../routes/stores.js';
  import { publishVideo, publishAudio, turnOnCamera, turnOnMicrophone, unPublishVideo, unPublishAudio} from '../utiles.js'


function handleLogout() {
  isLoggedIn.set('')
}

</script>


<div class="header">
    <h3>
      Hello <span>{$isLoggedIn }</span>
    </h3>
    {#if $userInfoInChanle?.role == 'host'}
      <div class="steam-controlers">
        {#if !$isVideoOn }
          <button onclick={ () => publishVideo()}>Open viedo</button>
        {:else }
          <button onclick={() => unPublishVideo()}>Close viedo</button>
        {/if }
        {#if !$isAudioOn }
          <button onclick={() => publishAudio()}>Open audio</button>
        {:else }
          <button onclick={() => unPublishAudio()}>Close audio</button>
        {/if }
      </div>
    {/if }
    <button onclick={() =>handleLogout()}>Logout</button>
  </div>

  <style>
.header {
  background-color: #0066ff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-weight: 400;
  }

  button {
    padding: 8px 10px;
    cursor: pointer;
  }
  /* .steam-controlers {
    display: flex;
    gap: 10px;
    cursor: pointer;
  } */
}

</style>