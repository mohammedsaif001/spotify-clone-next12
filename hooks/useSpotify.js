import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyAPI = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

const useSpotify = () => {
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            // While refreshing token if we are getting below error defined in [...nextauth].js (Error Catching) throw them to login page as we are not able to refresh the token
            if (session.error === "RefreshAccessTokenError") {
                signIn()
            }

            spotifyAPI.setAccessToken(session?.user?.accessToken)
        }
    }, [session])

    return spotifyAPI;
}
export default useSpotify