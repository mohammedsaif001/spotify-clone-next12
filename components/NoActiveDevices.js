const NoActiveDevices = ({ msg, instruction }) => {
    return <div className='text-white'>
        <h2>{msg}</h2>
        <p>{instruction}</p>
        <img src="https://links.papareact.com/9xl" alt="spotify_logo" className="w-52 mb-5" />
        <button onClick={() => window.location.reload()} className='bg-green-800 p-3 rounded-xl text-lg font-semibold hover:bg-green-900'>Refresh Page</button>
    </div>
}

export default NoActiveDevices