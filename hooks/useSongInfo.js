import { useRecoilState } from "recoil"
import useSpotify from "./useSpotify"
import { currentTrackIdState } from "../atoms/songAtom"
import { useState, useEffect } from "react"

// Creating this hook because the data what we recieve for listing songs and playing songs is different however the trackId is same so using this id we are making another API call when a track is played which gets a diff data

const useSongInfo = () => {

    const spotifyApi = useSpotify()
    const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackIdState)
    const [songInfo, setSongInfo] = useState(null)

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentIdTrack) {
                try {
                    const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentIdTrack}`, {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                            Accept: "application/json",
                        }
                    }).then(res => res.json())

                    setSongInfo(trackInfo)
                } catch (error) {
                    console.log(error)
                    console.log("Access Token is ", spotifyApi.getAccessToken())
                }
            }
        }
        fetchSongInfo()
    }, [currentIdTrack, spotifyApi])


    return songInfo
}
export default useSongInfo