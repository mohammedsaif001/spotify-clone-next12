import { atom } from "recoil";

export const currentTrackIdState = atom({
    key: "currentTrackIdState", //unique id(with respect to other atoms/selectors)
    default: null
})

export const isPlayingState = atom({
    key: "isPlayingState",
    default: false
})