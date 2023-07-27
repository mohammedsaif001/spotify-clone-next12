import Head from 'next/head'
import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
import { getSession } from 'next-auth/react';
import Player from '../components/Player';
import useSpotify from '../hooks/useSpotify';
import { useSession } from 'next-auth/react';
import NoActiveDevices from "../components/NoActiveDevices"

export default function Home() {
  const spotifyApi = useSpotify()
  const { data: session } = useSession();
  const accessToken = spotifyApi.getAccessToken()

  // State to keep track of the availability of an active device
  const [hasActiveDevice, setHasActiveDevice] = useState(false);
  const [hasActivePlayer, setHasActivePlayer] = useState(true);


  // Checking If User has active spotify Session

  useEffect(() => {
    const accessToken = spotifyApi.getAccessToken()
    console.log(accessToken, "accessToken")
    fetch('https://api.spotify.com/v1/me/player/devices', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Check if there are any active devices
        const hasDevice = data.devices.length > 0;
        console.log(data, "devices")
        setHasActiveDevice(hasDevice);
      })
      .catch((error) => {
        console.error('Error fetching player devices:', error);
      });
  }, [session])


  // Checking If user has played a song initially in their local machine

  useEffect(() => {
    if (hasActiveDevice) {
      fetch('https://api.spotify.com/v1/me/player', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      })
        .then((response) => setHasActivePlayer(response.status === 200))
        .catch((error) => {
          console.error('Error fetching player Status:', error);
        });
    }
  }, [session])


  console.log(hasActiveDevice, hasActivePlayer, "hasActiveDevice", "hasActivePlayer")



  return (
    <div className='bg-black h-screen overflow-hidden'>
      <Head>
        <title>Spotify Clone</title>
        <meta name="description" content="Spotify Clone for resume Portfolio using NextJs12, Tailwind" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      {/* Rendering Page If User has active local spotify running and initially played a song in the theor local app */}
      {!hasActiveDevice ? <NoActiveDevices msg={"No active Spotify device found."} instruction={"Please open Spotify on a device and try again."} /> :
        !hasActivePlayer ? <NoActiveDevices msg={"No Active Player Found"} instruction={"Please play a song on your local Spotify player or connect to a supported Spotify Connect device to control Spotify using this app."} /> :
          <><main className='flex'>
            <Sidebar />
            <Center />
          </main>
            <div className='sticky bottom-0'>
              <Player />
            </div>
          </>
      }

    </div>
  )
}


// Fetching Session pre-hand in the server otself
export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session
    }
  }
}
