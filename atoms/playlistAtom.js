import { atom } from "recoil";

export const playlistIdState = atom({
    key: "playlistIdState",
    default: "1Jk5XW4YSUPY9LojIRWFSq"  //Default Playlist Id will be shown on initial render should be public playlist
})

export const playlistState = atom({
    key: "playlistState",
    default: null
})