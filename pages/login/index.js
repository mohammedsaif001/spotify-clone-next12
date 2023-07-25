import { getProviders, signIn } from "next-auth/react"

const LoginPage = ({ providers }) => {
    const providersArray = Object.values(providers);

    return (
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
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
