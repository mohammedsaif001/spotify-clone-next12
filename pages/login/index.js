import { getProviders, signIn } from "next-auth/react"

const LoginPage = ({ providers }) => {
    const providersArray = Object.values(providers);

    return (
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
            <h3 className="text-white w-[80vw] text-sm md:text-xl leading-relaxed tracking-widest mb-10"><span className="text-xl md:text-2xl font-bold ">Important Notice 1:</span> This project requires an active Spotify instance running on your local machine for proper functionality. Please ensure that you have the Spotify desktop or mobile app installed and logged in before proceeding.<span className="text-xl md: text-2xl font-bold block mt-5">Important Notice 2:</span>To establish a connection, please play a song on your local Spotify app. Once a song is playing, you will be able to fully interact with this project, control playback, and access additional features. <span className="block text-center font-semibold text-xl md:text-2xl uppercase mt-5"> Thank you for your understanding and cooperation 😊</span></h3>
            <img src="https://links.papareact.com/9xl" alt="spotify_logo" className="w-52 mb-5" />
            {providersArray.map((provider, index) => (
                <div key={provider.name}>
                    <button className="bg-[#18D860] rounded-full text-white p-5"
                        onClick={() => signIn(provider.id, {
                            callbackUrl: "/"
                        })}
                    >Login with {provider.name}</button>
                </div>
            ))}
        </div>
    );
};

export const getServerSideProps = async () => {
    const providers = await getProviders();
    return {
        props: { providers },
    };
};


export default LoginPage
