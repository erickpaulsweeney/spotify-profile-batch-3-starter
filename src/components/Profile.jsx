import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";
import { setUser, setFollowers, setFollowing, setArtists, setTracks, setPlaylists, setRecent, setSelected } from "../slices/spotifySlice";
import { Link } from "react-router-dom";

function Profile() {
    const data = useSelector(state => state.spotify);
    const user = data.user;
    const followers = data.followers;
    const following = data.following;
    const artists = data.top_artists;
    const tracks = data.top_tracks;
    const playlists = data.playlists;
    const recent = data.recent;
    const dispatch = useDispatch();

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem('token');

        if (!token && hash) {
            token = hash.substring(1).split("&").find(el => el.startsWith("access_token")).split("=")[1];
            localStorage.setItem('token', token);
            window.location.hash = '';
            fetchData(token);
        }
        else {
            fetchData(token);
        }
        // eslint-disable-next-line
    }, [])

    async function fetchData(input) {
        // user data
        let userResponse = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${input}`,
                'Content-Type': 'application/json'
            }
        });
        let userData = await userResponse.json();

        // following
        let followingResponse = await fetch('https://api.spotify.com/v1/me/following?type=artist', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${input}`,
                'Content-Type': 'application/json'
            }
        });
        let followingData = await followingResponse.json();

        // playlists
        let playlistResponse = await fetch('https://api.spotify.com/v1/me/playlists', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${input}`,
                'Content-Type': 'application/json'
            }
        });
        let playlistData = await playlistResponse.json();

        // recent tracks
        let recentResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${input}`,
                'Content-Type': 'application/json'
            }
        });
        let recentData = await recentResponse.json();

        // top artists
        let longTermArtistResponse = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=long_term', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${input}`,
                'Content-Type': 'application/json'
            }
        });
        let longTermArtistData = await longTermArtistResponse.json();

        let mediumTermArtistResponse = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=medium_term', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${input}`,
                'Content-Type': 'application/json'
            }
        });
        let mediumTermArtistData = await mediumTermArtistResponse.json();

        let shortTermArtistResponse = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=short_term', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${input}`,
                'Content-Type': 'application/json'
            }
        });
        let shortTermArtistData = await shortTermArtistResponse.json();

        // top tracks
        let longTermTrackResponse = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${input}`,
                'Content-Type': 'application/json'
            }
        });
        let longTermTrackData = await longTermTrackResponse.json();

        let mediumTermTrackResponse = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${input}`,
                'Content-Type': 'application/json'
            }
        });
        let mediumTermTrackData = await mediumTermTrackResponse.json();

        let shortTermTrackResponse = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${input}`,
                'Content-Type': 'application/json'
            }
        });
        let shortTermTrackData = await shortTermTrackResponse.json();

        let userPayload = { name: userData.display_name, photo: userData.images[0].url };
        let followersPayload = userData.followers.total;
        let followingPayload = followingData.artists.items;
        let playlistPayload = playlistData.items;
        let artistPayload = { longTerm: longTermArtistData.items, mediumTerm: mediumTermArtistData.items, shortTerm: shortTermArtistData.items };
        let trackPayload = { longTerm: longTermTrackData.items, mediumTerm: mediumTermTrackData.items, shortTerm: shortTermTrackData.items };
        let recentPayload = recentData.items;

        dispatch(setUser(userPayload));
        dispatch(setFollowers(followersPayload));
        dispatch(setFollowing(followingPayload));
        dispatch(setPlaylists(playlistPayload));
        dispatch(setArtists(artistPayload));
        dispatch(setTracks(trackPayload));
        dispatch(setRecent(recentPayload));
        // console.log(data);
        console.log(data);
    }

    return (
        <div className="container-main">
            <NavBar />
            {!(user && followers && following && artists && tracks && playlists && recent) && <div className="loading">Loading...</div>}
            {(user && followers && following && artists && tracks && playlists && recent) && <div className="container-profile">
                <div className="container-info">
                    <div className="container-avatar">
                        <img src={user.photo} className="user-avatar" alt="User avatar" />
                        <div className="user-name">{user.name}</div>
                    </div>
                    <div className="info-bar">
                        <div className="followers-div">
                            <div className="followers-num">{followers}</div>
                            <div className="followers-text">Followers</div>
                        </div>
                        <div className="following-div">
                            <div className="following-num">{following.length}</div>
                            <div className="following-text">Following</div>
                        </div>
                        <div className="playlists-div">
                            <div className="playlists-num">{playlists.length}</div>
                            <div className="playlists-text">Playlists</div>
                        </div>
                    </div>
                    <button className="logout-button">Logout</button>
                </div>
                <div className="container-top-items-profile">
                    <div className="container-top-artists-profile">
                        <div className="top-artists-header-profile">
                            Top Artists of All Time
                            <Link to="/top-artists"><button className="see-more-button" onClick={() => dispatch(setSelected('artists'))}>See More</button></Link>
                        </div>
                        <div className="container-artists-list-profile">
                            {artists.longTerm.map(el => <div className="artist-item-profile" key={el.id}>
                                <img src={el.images[2].url} className="artist-photo-profile" alt="" />
                                <div className="artist-name-profile">{el.name}</div>
                            </div>)}
                        </div>
                    </div>

                    <div className="container-top-tracks-profile">
                        <div className="top-tracks-header-profile">
                            Top Tracks of All Time
                            <Link to="/top-tracks"><button className="see-more-button" onClick={() => dispatch(setSelected('tracks'))}>See More</button></Link>
                        </div>
                        <div className="container-tracks-list-profile">
                            {tracks.longTerm.map(el => <div className="track-item-profile" key={el.id}>
                                <div className="track-main-profile">
                                    <img src={el.album.images[2].url} className="track-photo-profile" alt="" />
                                    <div className="track-info-div">
                                        <div className="track-name-profile">{el.name}</div>
                                        <div className="track-info-profile">{el.artists[0].name}&nbsp;&nbsp;⋅&nbsp;&nbsp;{el.album.name}</div>
                                    </div>
                                </div>
                                <div className="track-duration-profile">{`${Math.floor(el.duration_ms / 60 / 1000)}:${((Math.floor(el.duration_ms / 1000)) % 60).toString().padStart(2, '0')}`}</div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Profile;