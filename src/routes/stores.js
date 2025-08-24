import { writable } from "svelte/store"


// user store 
export const isLoggedIn = writable('')
export const userInfoInChanle = writable(null)

// Live stream store
export const videoTrack = writable(null);
export const audioTrack = writable(null);
export const messages = writable([])
export const likes = writable([])
export const isAudioOn = writable(false)
export const isVideoOn = writable(false)
export const client = writable(null)
export const AgoraRTM = writable(null)
export const rtm = writable(null)
export const streamReady = writable({
    stream: false,
    chat: false
})


