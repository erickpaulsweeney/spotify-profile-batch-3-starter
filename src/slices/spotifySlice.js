import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchData = createAsyncThunk()

const spotifySlice = createSlice({
    name: 'spotify', 
    initialState: {
        client_id: '932e9c02907842deb18951e39c6f472e',
        client_secret: '956facde83d642aaac0f4d3386aba0f6',
        authorize: 'https://accounts.spotify.com/authorize', 
        user: null,
        followers: null,
        following: null,
        top_artists: null,
        top_tracks: null, 
        playlists: null,
        recent: null, 
        selected: 'profile'
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
    }
});

export const { setUser, setFollowers, setFollowing, setArtists, setTracks, setPlaylists, setRecent, setSelected } = spotifySlice.actions;
export default spotifySlice.reducer;