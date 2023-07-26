import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
import { getSession } from 'next-auth/react';

export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <Head>
        <title>Spotify Clone</title>
        <meta name="description" content="Spotify Clone for resume Portfolio using NextJs12, Tailwind" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex'>
        <Sidebar />
        <Center />
      </main>
      <div>
        {/* Player */}
      </div>
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
