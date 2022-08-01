import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../slices/spotifySlice";
import { Link } from "react-router-dom";

function NavBar() {
    const data = useSelector(state => state.spotify);
    const dispatch = useDispatch();

    return (
        <div className="container-navbar">
            <div className="container-spotify-icon">
                <img src="/images/spotify.ico" alt="Spotify icon" className="spotify-icon" />
            </div>

            <div className="nav-buttons">
                <Link to="/profile">
                    <div className={data.selected === 'profile' ? 'profile-button selected' : 'profile-button'} onClick={(ev) => {
                        dispatch(setSelected('profile'));
                    }}>
                        <img src="/images/user.png" alt="User icon" className="profile-icon" />
                        <div className="profile-text">Profile</div>
                    </div>
                </Link>

                <Link to="/top-artists">
                    <div className={data.selected === 'artists' ? 'artists-button selected' : 'artists-button'} onClick={(ev) => {
                        dispatch(setSelected('artists'));
                    }}>
                        <img src="/images/artist.png" alt="Artist icon" className="artist-icon" />
                        <div className="artist-text">Top Artists</div>
                    </div>
                </Link>

                <Link to="/top-tracks">
                    <div className={data.selected === 'tracks' ? 'tracks-button selected' : 'tracks-button'} onClick={() => {
                        dispatch(setSelected('tracks'));
                    }}>
                        <img src="/images/tracks.png" alt="Track icon" className="track-icon" />
                        <div className="track-text">Top Tracks</div>
                    </div>
                </Link>

                <div className={data.selected === 'recent' ? 'recent-button selected' : 'recent-button'} onClick={() => {
                    dispatch(setSelected('recent'));
                }}>
                    <img src="/images/recent.png" alt="Track icon" className="track-icon" />
                    <div className="track-text">Recent</div>
                </div>
                <div className={data.selected === 'playlists' ? 'tracks-button selected' : 'tracks-button'} onClick={() => {
                    dispatch(setSelected('playlists'));
                }}>
                    <img src="/images/playlist.png" alt="Track icon" className="track-icon" />
                    <div className="track-text">Playlists</div>
                </div>
            </div>

            <div className="container-github-icon">
                <img src="/images/github.png" alt="Github icon" className="github-icon" />
            </div>
        </div>
    )
}

export default NavBar;