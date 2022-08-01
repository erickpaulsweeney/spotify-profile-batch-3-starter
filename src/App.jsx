// import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
    const CLIENT_ID = '932e9c02907842deb18951e39c6f472e';
    // const CLIENT_SECRET = '956facde83d642aaac0f4d3386aba0f6';
    const REDIRECT_URI = 'http://localhost:3000/profile';
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'token';
    const SCOPE = 'user-follow-read user-top-read playlist-read-private user-read-recently-played';

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem('token');

        if (!token && hash) {
            token = hash.substring(1).split("&").find(el => el.startsWith("access_token")).split("=")[1];
            console.log(token);
        }
    }, [])

    return (
        <div className="container-login">
            <div className="login-text">Spotify Profile</div>
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}><button className="login-button">Log in to Spotify</button></a>
        </div>
    )
}

export default App;