import NavBar from "./NavBar";
import { useSelector } from "react-redux/es/exports";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TopTracks() {
    const data = useSelector(state => state.spotify);
    const navigate = useNavigate();

    let [filter, setFilter] = useState('longTerm');

    useEffect(() => {
        Object.keys(data).forEach(key => {
            if (data[key] === null) navigate('/profile');
        });
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container-main">
            <NavBar />
            <div className="container-top-tracks">
                <div className="top-tracks-header">
                    <div className="top-tracks-text">Top Tracks</div>
                    <div className="filter-group">
                        <div className={filter === 'longTerm' ? 'longterm-button selected-tracks' : 'longterm-button'}
                            onClick={() => {
                                if (filter !== 'longTerm') {
                                    setFilter('longTerm');
                                }
                            }}>All Time</div>
                        <div className={filter === 'mediumTerm' ? 'mediumterm-button selected-tracks' : 'mediumterm-button'}
                            onClick={() => {
                                if (filter !== 'mediumTerm') {
                                    setFilter('mediumTerm');
                                }
                            }}>Last 6 months</div>
                        <div className={filter === 'shortTerm' ? 'shortterm-button selected-tracks' : 'shortterm-button'}
                            onClick={() => {
                                if (filter !== 'shortTerm') {
                                    setFilter('shortTerm');
                                }
                            }}>Last 4 weeks</div>
                    </div>
                </div>
                <div className="container-tracks-main">
                    {data.tracks && data.tracks[filter].map(el => <div className="track-item" key={el.id}>
                        <div className="track-main">
                            <img src={el.album.images[2].url} className="track-photo" alt="" />
                            <div className="track-info-div">
                                <div className="track-name">{el.name}</div>
                                <div className="track-info">{el.artists[0].name}&nbsp;&nbsp;⋅&nbsp;&nbsp;{el.album.name}</div>
                            </div>
                        </div>
                        <div className="track-duration">{`${Math.floor(el.duration_ms / 60 / 1000)}:${((Math.floor(el.duration_ms / 1000)) % 60).toString().padStart(2, '0')}`}</div>
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default TopTracks;