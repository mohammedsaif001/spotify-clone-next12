import { useSession } from "next-auth/react"
import useSpotify from "../hooks/useSpotify"
import { useRecoilState } from "recoil"
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom"
import { useState } from "react"
import useSongInfo from "../hooks/useSongInfo"
import { useEffect } from "react"

const Player = () => {
    const spotifyApi = useSpotify()
    const { data: session, status } = useSession()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [volume, setVolume] = useState(50)

    const songInfo = useSongInfo()

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                console.log("Now Playing", data?.body?.item)
                setCurrentTrackId(data?.body?.item?.id)

                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing)
                })
            })
        }
    }

    useEffect(() => {
        // This is because initially when the page loads the player is blank no song is selected to fix this the below is written

        if (spotifyApi.getAccessToken() && !currentTrackId) {
            // Fetch the song info
            fetchCurrentSong()
            setVolume(50)
        }
    }, [currentTrackId, spotifyApi, session])

    return (
        <div className="h-[5.6rem] bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
            {/* Left */}
            <div className="flex items-center space-x-4">
                <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images?.[0]?.url} alt="Song_Poster" />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>
        </div>
    )
}



export default Player