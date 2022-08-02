import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
    const CLIENT_ID = '932e9c02907842deb18951e39c6f472e';
    const REDIRECT_URI = 'http://localhost:3000/validate';
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'code';
    const SCOPE = 'user-follow-read user-top-read playlist-read-private user-read-recently-played';
    const LINK = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
    const { accessToken } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken !== null) navigate("/profile");
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container-login">
            <div className="login-text">Spotify Profile</div>
            <a href={LINK}><button className="login-button">Log in to Spotify</button></a>
        </div>
    )
}

export default App;