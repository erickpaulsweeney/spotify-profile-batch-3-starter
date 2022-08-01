import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUserData = createAsyncThunk("profile/getUserData", async (input) => {
    return fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${input}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
});

export const getFollowingData = createAsyncThunk("profile/getFollowingData", async (input) => {
    return fetch('https://api.spotify.com/v1/me/following?type=artist', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${input}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
});

export const getPlaylistData = createAsyncThunk("profile/getPlaylistData", async (input) => {
    return fetch('https://api.spotify.com/v1/me/playlists', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${input}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
});

export const getRecentData = createAsyncThunk("profile/getRecentData", async (input) => {
    return fetch('https://api.spotify.com/v1/me/player/recently-played', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${input}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
});

export const getLongTermArtistData = createAsyncThunk("profile/getLongTermArtistData", async (input) => {
    return fetch('https://api.spotify.com/v1/me/top/artists?time_range=long_term', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${input}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
});

export const getMediumTermArtistData = createAsyncThunk("profile/getMediumTermArtistData", async (input) => {
    return fetch('https://api.spotify.com/v1/me/top/artists?time_range=medium_term', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${input}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
});

export const getShortTermArtistData = createAsyncThunk("profile/getShortTermArtistData", async (input) => {
    return fetch('https://api.spotify.com/v1/me/top/artists?time_range=short_term', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${input}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
});

export const getLongTermTrackData = createAsyncThunk("profile/getLongTermTrackData", async (input) => {
    return fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${input}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
});

export const getMediumTermTrackData = createAsyncThunk("profile/getMediumTermTrackData", async (input) => {
    return fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${input}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
});

export const getShortTermTrackData = createAsyncThunk("profile/getShortTermTrackData", async (input) => {
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
        client_id: '932e9c02907842deb18951e39c6f472e',
        client_secret: '956facde83d642aaac0f4d3386aba0f6',
        authorize: 'https://accounts.spotify.com/authorize', 
        user: null,
        followers: null,
        following: null,
        top_artists: { longTerm: null, mediumTerm: null, shortTerm: null },
        top_tracks: { longTerm: null, mediumTerm: null, shortTerm: null }, 
        playlists: null,
        recent: null, 
        selected: 'profile', 
    }, 
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }, 
        setFollowers: (state, action) => {
            state.followers = action.payload;
        }, 
        setFollowing: (state, action) => {
            state.following = action.payload;
        }, 
        setArtists: (state, action) => {
            state.top_artists = action.payload;
        }, 
        setTracks: (state, action) => {
            state.top_tracks = action.payload;
        }, 
        setPlaylists: (state, action) => {
            state.playlists = action.payload;
        },
        setRecent: (state, action) => {
            state.recent = action.payload;
        }, 
        setSelected: (state, action) => {
            state.selected = action.payload;
        }
    }, 
    extraReducers: {
        [getUserData.fulfilled] : (state, action) => {
            let userObj = { name: action.payload.display_name, photo: action.payload.images[0].url };
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
            state.top_artists.longTerm = longTermArtistList;
        },
        [getMediumTermArtistData.fulfilled] : (state, action) => {
            let mediumTermArtistList = action.payload.items;
            state.top_artists.mediumTerm = mediumTermArtistList;
        },
        [getShortTermArtistData.fulfilled] : (state, action) => {
            let shortTermArtistList = action.payload.items;
            state.top_artists.shortTerm = shortTermArtistList;
        }, 
        [getLongTermTrackData.fulfilled] : (state, action) => {
            let longTermTrackList = action.payload.items;
            state.top_tracks.longTerm = longTermTrackList;
        },
        [getMediumTermTrackData.fulfilled] : (state, action) => {
            let mediumTermTrackList = action.payload.items;
            state.top_tracks.mediumTerm = mediumTermTrackList;
        },
        [getShortTermTrackData.fulfilled] : (state, action) => {
            let shortTermTrackList = action.payload.items;
            state.top_tracks.shortTerm = shortTermTrackList;
        } 
    }
});

export const { setUser, setFollowers, setFollowing, setArtists, setTracks, setPlaylists, setRecent, setSelected } = spotifySlice.actions;
export default spotifySlice.reducer;