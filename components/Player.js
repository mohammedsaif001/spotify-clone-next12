import { useSession } from "next-auth/react"
import useSpotify from "../hooks/useSpotify"
import { useRecoilState } from "recoil"
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom"
import { useState, useCallback } from "react"
import useSongInfo from "../hooks/useSongInfo"
import { debounce } from "lodash"
import { useEffect } from "react"
import { SwitchHorizontalIcon, VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline"
import { RewindIcon, FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, VolumeUpIcon } from "@heroicons/react/solid"

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
                    setIsPlaying(data?.body?.is_playing)
                })
            })
        }
    }

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data?.body.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false)
            }
            else {
                spotifyApi.play();
                setIsPlaying(true)
            }
        })
    }

    useEffect(() => {
        // This is because initially when the page loads the player is blank no song is selected to fix this the below is written

        if (spotifyApi.getAccessToken() && !currentTrackId) {
            // Fetch the song info
            fetchCurrentSong()
            setVolume(50)
        }
    }, [currentTrackId, spotifyApi, session])

    // Implementing Debouncing so that the api doesnt trigger on each onchange but after certain amt of time

    const debounceAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((err) => {
                console.log(err.msg)
            })
        }, 300),
        [],
    )


    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debounceAdjustVolume(volume)
        }
    }, [volume])

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

            {/* Center */}
            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button" />
                <RewindIcon className="button"
                // onClick={() => spotifyApi.skipToPrevious()}  //Api Not Working
                />
                {isPlaying ? (
                    <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
                ) : (
                    <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
                )}
                <FastForwardIcon className="button"
                // onClick={() => spotifyApi.skipToNext()} //Api Not Working
                />
                <ReplyIcon className="button" />
            </div>

            {/* Right */}
            <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                <VolumeDownIcon onClick={() => volume > 0 && setVolume(volume - 10)} className="button" />
                <input value={volume} onChange={e => setVolume(Number(e.target.value))} className="w-14 md:w-28" type="range" min={0} max={100} />
                <VolumeUpIcon onClick={() => volume < 100 && setVolume(volume + 10)} className="button" />
            </div>
        </div>
    )
}



export default Player