import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";
import { setSelected, getUserData, getFollowingData, getPlaylistData, getRecentData, getLongTermArtistData, getMediumTermArtistData, getShortTermArtistData, getLongTermTrackData, getMediumTermTrackData, getShortTermTrackData } from "../slices/spotifySlice";
import { clearTokens } from "../slices/authSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Profile() {
    const { user, followers, following, artists, tracks, playlists, recent } = useSelector(state => state.spotify);
    const { accessToken } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        let fetch = async () => {
            if (accessToken) {
                await fetchData(accessToken);
            }
            else navigate("/");
            Object.keys(data).forEach(key => {
                if (data[key] === null) navigate('/profile');
            });
            setLoading(false);
        }
        fetch();
        // eslint-disable-next-line
    }, [])

    function fetchData(token) {
        dispatch(getUserData(token));
        dispatch(getFollowingData(token));
        dispatch(getPlaylistData(token));
        dispatch(getRecentData(token));
        dispatch(getLongTermArtistData(token));
        dispatch(getMediumTermArtistData(token));
        dispatch(getShortTermArtistData(token));
        dispatch(getLongTermTrackData(token));
        dispatch(getMediumTermTrackData(token));
        dispatch(getShortTermTrackData(token));
    }

    function handleLogout() {
        dispatch(clearTokens());
        localStorage.clear();
        navigate("/");
    }

    return (
        <div className="container-main">
            <NavBar />
            {/* {console.log(data)} */}
            {(user === null && followers === null && following === null && artists.shortTerm === null && artists.mediumTerm === null && artists.longTerm === null && tracks.shortTerm === null && playlists === null && recent === null) && <div className="loading">Loading...</div>}
            {(user !== null && followers !== null && following !== null && artists.shortTerm !== null && artists.mediumTerm !== null && artists.longTerm !== null && tracks.shortTerm !== null && playlists !== null && recent !== null) && <div className="container-profile">
                <div className="container-info">
                    <div className="container-avatar">
                        <img src={user?.photo} className="user-avatar" alt="User avatar" style={{ filter: user?.photo === 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png' && 'invert(50%)' }} />
                        <div className="user-name">{user?.name}</div>
                    </div>
                    <div className="info-bar">
                        <div className="followers-div">
                            <div className="followers-num">{followers}</div>
                            <div className="followers-text">Followers</div>
                        </div>
                        <div className="following-div">
                            <div className="following-num">{following}</div>
                            <div className="following-text">Following</div>
                        </div>
                        <div className="playlists-div">
                            <div className="playlists-num">{playlists?.length}</div>
                            <div className="playlists-text">Playlists</div>
                        </div>
                    </div>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
                <div className="container-top-items-profile">
                    <div className="container-top-artists-profile">
                        <div className="top-artists-header-profile">
                            Top Artists of All Time
                            <Link to="/top-artists"><button className="see-more-button" onClick={() => dispatch(setSelected('artists'))}>See More</button></Link>
                        </div>
                        <div className="container-artists-list-profile">
                            {artists?.longTerm?.map(el => <div className="artist-item-profile" key={el?.id}>
                                <img src={el?.images[2]?.url} className="artist-photo-profile" alt="" />
                                <div className="artist-name-profile">{el?.name}</div>
                            </div>)}
                        </div>
                    </div>

                    <div className="container-top-tracks-profile">
                        <div className="top-tracks-header-profile">
                            Top Tracks of All Time
                            <Link to="/top-tracks"><button className="see-more-button" onClick={() => dispatch(setSelected('tracks'))}>See More</button></Link>
                        </div>
                        <div className="container-tracks-list-profile">
                            {tracks?.longTerm?.map(el => <div className="track-item-profile" key={el.id}>
                                <div className="track-main-profile">
                                    <img src={el?.album?.images[2]?.url} className="track-photo-profile" alt="" />
                                    <div className="track-info-div">
                                        <div className="track-name-profile">{el?.name}</div>
                                        <div className="track-info-profile">{el?.artists[0]?.name}&nbsp;&nbsp;⋅&nbsp;&nbsp;{el?.album?.name}</div>
                                    </div>
                                </div>
                                <div className="track-duration-profile">{`${Math.floor(el?.duration_ms / 60 / 1000)}:${((Math.floor(el?.duration_ms / 1000)) % 60).toString().padStart(2, '0')}`}</div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Profile;