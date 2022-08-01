import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TopArtists() {
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
            <div className="container-top-artists">
                <div className="top-artists-header">
                    <div className="top-artists-text">Top Artists</div>
                    <div className="filter-group">
                        <div className={filter === 'longTerm' ? 'longterm-button selected-artists' : 'longterm-button'} 
                            onClick={() => {
                                if (filter !== 'longTerm') {
                                    setFilter('longTerm');
                                }
                            }}>All Time</div>
                        <div className={filter === 'mediumTerm' ? 'mediumterm-button selected-artists' : 'mediumterm-button'} 
                            onClick={() => {
                                if (filter !== 'mediumTerm') {
                                    setFilter('mediumTerm');
                                }
                            }}>Last 6 months</div>
                        <div className={filter === 'shortTerm' ? 'shortterm-button selected-artists' : 'shortterm-button'} 
                            onClick={() => {
                                if (filter !== 'shortTerm') {
                                    setFilter('shortTerm');
                                }
                            }}>Last 4 weeks</div>
                    </div>
                </div>
                <div className="container-artists-main">
                    {data.top_artists && data.top_artists[filter].map(el => <div key={el.id} className="top-artist-item">
                        <img src={el.images[0].url} className="artist-photo" alt={el.name} />
                        <div className="artist-name">{el.name}</div>
                    </div>)}
                </div>
            </div>
        </div>

    )
};

export default TopArtists;