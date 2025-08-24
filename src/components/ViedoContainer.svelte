<script>
import Comments from './Comments.svelte';
import { audioTrack, likes } from './../routes/stores.js';
import { streamReady, userInfoInChanle } from "../routes/stores";
import { leaveFromChannel, sendMessage } from '../utiles.js';


let sendLike = $state(false)

async function onLikeClicked() {
    if (!$userInfoInChanle || sendLike) return;
    await sendMessage("like:");
    sendLike = true ;
}


</script>

<div class="viedo-container">
    {#if $streamReady.stream }
    <button class="leave-channel" onclick={leaveFromChannel}>
        leave
    </button>
    {/if}
    
    <video id={"stream"}></video>
    
    {#if $streamReady.chat }
    <div class="likes-container">
        {$likes?.length || 0}
        {#if !sendLike }
            <button onclick={onLikeClicked}>
                like
            </button>
        {/if}
    </div>
    {/if}
    {#if $streamReady.chat }
        <Comments />
    {/if}
    
</div>

<style>
.viedo-container {
  position: relative;
  height: 100%;
  width: 100%;
  video {
    height: 100%;
    width: 100%;
  }

  .leave-channel {
    position: absolute;
    top: 2%;
    right: 10px;
    padding: 5px 10px;
    background-color: rgb(247, 21, 21);
    color: white;
    border-radius: 4px;
    cursor: pointer;
    z-index: 100000;
  }

  .likes-container {
    position: absolute;
    bottom: 50%;
    left: 10px;
    padding: 10px;
    background-color: white;
    color: #0066ff;
    font-weight: bold;
    border-radius: 5px;
    display: grid;
    text-align: center;

    button {
      background-color: #0066ff;
    }
  }
}

</style>
