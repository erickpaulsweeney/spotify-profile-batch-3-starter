import NavBar from "./NavBar";
import { useSelector } from "react-redux/es/exports";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Recent() {
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
            <div className="container-recent">
                <div className="recent-header">
                    <div className="recent-header-text">Recently Played Tracks</div>
                </div>
                <div className="container-recent-main">
                    {data.recent && data.recent.map(el => <div className="recent-item" key={el.track.id}>
                        <div className="recent-main">
                            <img src={el.track.album.images[2].url} className="recent-photo" alt="" />
                            <div className="recent-info-div">
                                <div className="recent-name">{el.track.name}</div>
                                <div className="recent-info">{el.track.artists[0].name}&nbsp;&nbsp;⋅&nbsp;&nbsp;{el.track.album.name}</div>
                            </div>
                        </div>
                        <div className="recent-duration">{`${Math.floor(el.track.duration_ms / 60 / 1000)}:${((Math.floor(el.track.duration_ms / 1000)) % 60).toString().padStart(2, '0')}`}</div>
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default Recent;