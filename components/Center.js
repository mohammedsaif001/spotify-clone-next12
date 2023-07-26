import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash"
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import { signOut } from "next-auth/react"

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
]

const Center = () => {
    const { data: session } = useSession();
    const [color, setColor] = useState(null)
    const spotifyApi = useSpotify()

    // const [playlistID, setPlaylistID] = useRecoilState(playlistIdState) If you want only readonly access then use the below import
    const playlistID = useRecoilValue(playlistIdState)
    const [playlist, setPlaylist] = useRecoilState(playlistState)


    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [playlistID])

    useEffect(() => {

        // getting songs from playlist
        spotifyApi.getPlaylist(playlistID).then((data) => {
            setPlaylist(data?.body)
        }).catch((err) => {
            console.log("Something Went Wrong", err.message)
        })
    }, [spotifyApi, playlistID])

    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <header className="absolute top-5 right-8">
                <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white" onClick={signOut}>
                    <img
                        src={session?.user?.image}
                        alt="spotify_image"
                        className="rounded-full w-10 h-10"
                    />
                    <h2>{session?.user?.name}</h2>
                    <ChevronDownIcon className="h-5 w-5" />
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
                <img src={playlist?.images[0]?.url || `https://styles.redditmedia.com/t5_2qofj/styles/communityIcon_2y6i62hipc731.png`} alt="Playlist_Image" className="h-44 w-44 shadow-2xl" />
                <div>
                    <p>PLAYLIST</p>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
                </div>
            </section>

            <div>
                <Songs />
            </div>
        </div>
    );
};
export default Center;
