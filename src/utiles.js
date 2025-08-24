import { get } from 'svelte/store';
import { audioTrack, client, isAudioOn, isVideoOn, userInfoInChanle, videoTrack, rtm ,streamReady ,likes, messages} from './routes/stores';

export const turnOnCamera = async (flag) => {
    const { createCameraVideoTrack } = await import('agora-rtc-sdk-ng')

    flag = (flag == undefined )? !get(isVideoOn) : flag;
    isVideoOn.set(flag)

    if (get(videoTrack)) {
        return get(videoTrack).setEnabled(flag);
    }
    const videoTrackApi = await createCameraVideoTrack();
    videoTrack.set(videoTrackApi)
    get(videoTrack).play("host-stream");
};

export const turnOnMicrophone = async (flag ) => {
    const { createMicrophoneAudioTrack } = await import('agora-rtc-sdk-ng')

    flag = flag == undefined ? !get(isAudioOn) : flag;
    isAudioOn.set(flag);

    if (get(audioTrack)) {
        return get(audioTrack).setEnabled(flag);
    }

    const audioTrackApi = await createMicrophoneAudioTrack();
    audioTrack.set(audioTrackApi);
    get(audioTrack).play();
};

export async function publishVideo() {
    await turnOnCamera(true);
    await get(client).publishVideo(get(videoTrack));
};


export async function publishAudio() {
    await turnOnMicrophone(true);
    await get(client).publishAudio(get(audioTrack));
};

export async function sendMessage(message) {
    if (!get(rtm) || !get(userInfoInChanle)) return;
    try {
        await get(rtm).publish(get(userInfoInChanle).channelName, message.toString());
    } catch (err) {
        console.log(err);
    }
}

export async function unPublishVideo() {
    await turnOnCamera(false);
    await get(client).unpublish(get(videoTrack));
};

export async function unPublishAudio() {
    await turnOnMicrophone(false);
    await get(client).unpublish(get(audioTrack));
};


async function leaveChatChannel() {
  
    if (!get(rtm) || !get(userInfoInChanle)) return;
    await get(rtm).unsubscribe(get(userInfoInChanle).channelName);
    await get(rtm).logout();
    streamReady.update((pre) => ({
        ...pre,
        chat: false
    }));
}

export async function leaveFromChannel() {

    if (!get(userInfoInChanle)) return;
    if (get(userInfoInChanle).role == "host") {
      await unPublishVideo();
      await unPublishAudio();
    }
    await get(client).leave();
    streamReady.update((pre) => ({ ...pre, stream: false }));
    await leaveChatChannel();
    userInfoInChanle.set(null);
    likes.set([]);
    messages.set([]);
  };

