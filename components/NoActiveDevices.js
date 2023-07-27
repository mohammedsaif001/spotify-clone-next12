const NoActiveDevices = ({ msg, instruction }) => {
    return <div className='text-white flex flex-col justify-center items-center w-full h-full'>
        <h2 className="text-lg tracking-wider uppercase">{msg}</h2>
        <p className="text-lg mb-5 tracking-wider font-semibold uppercase">{instruction}</p>
        <img src="https://links.papareact.com/9xl" alt="spotify_logo" className="w-52 mb-5" />
        <button onClick={() => window.location.reload()} className='bg-green-800 p-3 rounded-xl text-lg font-semibold hover:bg-green-900 tracking-wide'>Refresh Page</button>
    </div>
}

export default NoActiveDevices