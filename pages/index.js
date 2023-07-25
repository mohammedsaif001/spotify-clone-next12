import Head from 'next/head'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <Head>
        <title>Spotify Clone</title>
        <meta name="description" content="Spotify Clone for resume Portfolio using NextJs12, Tailwind" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Sidebar />
        {/* Center */}
      </main>
      <div>
        {/* Player */}
      </div>
    </div>
  )
}
