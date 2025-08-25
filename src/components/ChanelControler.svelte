<script>
    
import { PUBLIC_AGORA_APP_ID } from '$env/static/public';
import { onMount } from 'svelte';
import { rtm, AgoraRTM, client, isLoggedIn, likes, messages, streamReady, userInfoInChanle } from '../routes/stores';
import { publishVideo, publishAudio, changeUserRole } from '../utiles.js'

let channeName = $state('')

const CLIENT_ROLE_BROADCASTER = "host";
const CLIENT_ROLE_AUDIENCE = "audience";

onMount(async () => {
  const AgoraRTMApi = await import("agora-rtm")
  AgoraRTM.set(AgoraRTMApi)

})
  
async function joinToRtmChannel(userInfo) {

    const { RTM } = $AgoraRTM;
    rtm.set(new RTM(PUBLIC_AGORA_APP_ID, userInfo.uid.toString()));

    !$rtm.addEventListener("message", (event) => {
        if (event.message.toString().startsWith("like:")) {
            
          likes.update((pre) => [...new Set([...pre, Number(event.publisher)])]);
        } else {
          messages.update((pre) => [
                ...pre,
                {
                    owner: event.publisher.toString(),
                    message: event.message.toString(),
                },
            ]);
        }
    });

    try {
        await $rtm.login({
            token: userInfo.tokenRtm
        });
        await $rtm.subscribe(userInfo.channelName);
        streamReady.update((pre) => ({
            ...pre,
            chat: true
        }));
    } catch (err) {
        console.log(err);
    }
};


async function onUserPublish( user, mediaType ) {
    
    await $client.subscribe(user, mediaType);

    
    if (mediaType === "video") {
        user.videoTrack.play("stream");
    }
    if (mediaType === "audio") {
        user.audioTrack.play();
    }
    
    await changeUserRole()
};

async function onUserLeft( user, mediaType ) {
    alert(`${user.uid} was leaft`);
};

async function joinChannel(userInfo)  {

    $client.on("user-published", onUserPublish);
    $client.on("user-left", onUserLeft);
    
    await $client.join(
        PUBLIC_AGORA_APP_ID,
        userInfo.channelName,
        userInfo.token || null,
        userInfo.uid
    );

    await $client.setClientRole(userInfo.role);
    
    if (userInfo.role == CLIENT_ROLE_BROADCASTER) {
        publishVideo();
        publishAudio();
    }
    
    // context
    streamReady.update((pre) => ({
        ...pre,
        stream: true
    }));


    await joinToRtmChannel(userInfo);
};
    
function handleSubscribOnChanel(e) {
  
  if (!channeName) return;

  const role = e.submitter.value;
  const uid = Math.floor(Math.random() * 100000);

  try {
      fetch(`/api/agoraToken?uid=${uid}&userName=${$isLoggedIn}&role=${role}&channelName=${channeName}`)
      .then((res) => res.json())
      .then((data) => {
        try {
          joinChannel(data);
          userInfoInChanle.set(data);
          channeName = "" ;
        } catch (err) {
          throw new Error("Erron on join at chanel");
        }
      });
  } catch (err) {
    throw new Error("Some thing went wrong" + err);
  }
}

</script>

{#if !$userInfoInChanle }
<form
    class="chanel-controler"
    onsubmit={handleSubscribOnChanel}
    >
    <label for="">Chanel title</label>
    <input
        type="text"
        bind:value={channeName}
    />
    <div class="chanel-buttons">
        <button value={'host'}>New stream</button>
        <button value={'audience'}>Join</button>
    </div>
</form>
{/if}

<style>
.chanel-controler {
    background-color: #0066ff;
    position: absolute;
    padding: 10px;
    bottom: 0;
    left: 0;
    width: 100%;
    display: grid;
    gap: 0.5rem;

    input {
        padding: 8px 12px;
        font-size: 1.5rem;
        background-color: white;
        color: #0066ff;
        border: none;
    }

    .chanel-buttons {
        width: 100%;
        display: flex;
        gap: 0.4rem;

        button {
            padding: 10px 15px;
            cursor: pointer;
            flex: 1;
        }

        :first-child {
            flex: 2;
        }
    }
}
</style>
