import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const ENCODED = 'OTMyZTljMDI5MDc4NDJkZWIxODk1MWUzOWM2ZjQ3MmU6OTU2ZmFjZGU4M2Q2NDJhYWFjMGY0ZDMzODZhYmEwZjY=';
// 'https://spotify-profile-mern.netlify.app/validate'

export const getToken = createAsyncThunk('auth/getToken', async (code) => {
    console.log(code)
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${ENCODED}`
        }, 
        body: new URLSearchParams({
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': 'http://localhost:3000/validate'
        }).toString()
    });

    if (response.status !== 200) {
        throw new Error('Something went wrong...');
    }

    const data = await response.json();
    console.log(data)
    return { accessToken: data.access_token, refreshToken: data.refresh_token }
})

const authSlice = createSlice({
    name: 'auth', 
    initialState: {
        accessToken: window.localStorage.getItem('access_token'),
        refreshToken: window.localStorage.getItem('refresh_token'),
        loading: true,
        error: null
    }, 
    reducers: {
        clearTokens: (state, action) => {
            state.accessToken = null;
            state.refreshToken = null;
        }
    },
    extraReducers: {
        [getToken.fulfilled] : (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            window.localStorage.setItem('access_token', action.payload.accessToken);
            window.localStorage.setItem('refresh_token', action.payload.refreshToken);
            state.loading = false;
        }, 
        [getToken.rejected] : (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        }
    }
})

export const { clearTokens } = authSlice.actions;
export default authSlice.reducer;