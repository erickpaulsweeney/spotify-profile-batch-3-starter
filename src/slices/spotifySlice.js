import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUserData = createAsyncThunk("spotify/getUserData", async (input) => {
    return fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${input}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
});

export const getFollowingData = createAsyncThunk("spotify/getFollowingData", async (input) => {
    return fetch('https://api.spotify.com/v1/me/following?type=artist', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${input}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
});

export const getPlaylistData = createAsyncThunk("spotify/getPlaylistData", async (input) => {
    return fetch('https://api.spotify.com/v1/me/playlists', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${input}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
});

export const getRecentData = createAsyncThunk("spotify/getRecentData", async (input) => {
    return fetch('https://api.spotify.com/v1/me/player/recently-played', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${input}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
});

export const getLongTermArtistData = createAsyncThunk("spotify/getLongTermArtistData", async (input) => {
    return fetch('https://api.spotify.com/v1/me/top/artists?time_range=long_term', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${input}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
});

export const getMediumTermArtistData = createAsyncThunk("spotify/getMediumTermArtistData", async (input) => {
    return fetch('https://api.spotify.com/v1/me/top/artists?time_range=medium_term', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${input}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
});

export const getShortTermArtistData = createAsyncThunk("spotify/getShortTermArtistData", async (input) => {
    return fetch('https://api.spotify.com/v1/me/top/artists?time_range=short_term', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${input}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
});

export const getLongTermTrackData = createAsyncThunk("spotify/getLongTermTrackData", async (input) => {
    return fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${input}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
});

export const getMediumTermTrackData = createAsyncThunk("spotify/getMediumTermTrackData", async (input) => {
    return fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${input}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
});

export const getShortTermTrackData = createAsyncThunk("spotify/getShortTermTrackData", async (input) => {
    return fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${input}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
});

const spotifySlice = createSlice({
    name: 'spotify', 
    initialState: {
        user: null,
        followers: null,
        following: null,
        artists: { longTerm: null, mediumTerm: null, shortTerm: null },
        tracks: { longTerm: null, mediumTerm: null, shortTerm: null }, 
        playlists: null,
        recent: null, 
        selected: 'profile', 
    }, 
    reducers: {
        setSelected: (state, action) => {
            state.selected = action.payload;
        }
    }, 
    extraReducers: {
        [getUserData.fulfilled] : (state, action) => {
            console.log(action.payload)
            let photoLink = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png';
            let userObj = { name: action.payload.display_name, photo: photoLink };
            let followersVal = action.payload.followers.total;
            state.user = userObj;
            state.followers = followersVal;
        }, 
        [getFollowingData.fulfilled] : (state, action) => {
            let followingList = action.payload.artists.items.length;
            state.following = followingList;
        }, 
        [getPlaylistData.fulfilled] : (state, action) => {
            let playlistList = action.payload.items;
            state.playlists = playlistList;
        }, 
        [getRecentData.fulfilled] : (state, action) => {
            let recentList = action.payload.items;
            state.recent = recentList;
        }, 
        [getLongTermArtistData.fulfilled] : (state, action) => {
            let longTermArtistList = action.payload.items;
            state.artists.longTerm = longTermArtistList;
        },
        [getMediumTermArtistData.fulfilled] : (state, action) => {
            let mediumTermArtistList = action.payload.items;
            state.artists.mediumTerm = mediumTermArtistList;
        },
        [getShortTermArtistData.fulfilled] : (state, action) => {
            let shortTermArtistList = action.payload.items;
            state.artists.shortTerm = shortTermArtistList;
        }, 
        [getLongTermTrackData.fulfilled] : (state, action) => {
            let longTermTrackList = action.payload.items;
            state.tracks.longTerm = longTermTrackList;
        },
        [getMediumTermTrackData.fulfilled] : (state, action) => {
            let mediumTermTrackList = action.payload.items;
            state.tracks.mediumTerm = mediumTermTrackList;
        },
        [getShortTermTrackData.fulfilled] : (state, action) => {
            let shortTermTrackList = action.payload.items;
            state.tracks.shortTerm = shortTermTrackList;
        } 
    }
});

export const { setUser, setFollowers, setFollowing, setArtists, setTracks, setPlaylists, setRecent, setSelected } = spotifySlice.actions;
export default spotifySlice.reducer;