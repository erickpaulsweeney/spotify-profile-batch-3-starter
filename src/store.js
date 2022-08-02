import { configureStore } from "@reduxjs/toolkit";
import spotifyReducer from "./slices/spotifySlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
    reducer: {
        spotify: spotifyReducer, 
        auth: authReducer
    }
});

export default store;