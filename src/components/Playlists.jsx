import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Playlists() {
    const data = useSelector(state => state.spotify);
    const navigate = useNavigate();
    // eslint-disable-next-line
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        Object.keys(data).forEach(key => {
            if (data[key] === null) navigate('/profile');
        });
        setLoading(false);
        // eslint-disable-next-line
    }, [])


    return (
        <div className="container-main">
            <NavBar />
            <div className="container-playlist">
                <div className="playlist-header-text">Your Playlists</div>
                <div className="container-playlist-main">
                    {data.playlists && data.playlists.map(el => <div key={el.id} className="playlist-item">
                        <img src={el.images[0].url} className="playlist-image" alt={el.name} />
                        <div className="playlist-name">{el.name}</div>
                        <div className="playlist-num">{el.tracks.total} tracks</div>
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default Playlists;