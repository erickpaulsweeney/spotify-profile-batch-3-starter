import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Profile from "./components/Profile"
import TopArtists from './components/TopArtists';
import TopTracks from './components/TopTracks';
import Recent from './components/Recent';
import Playlists from './components/Playlists';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/profile"  element={<Profile />}/>
                <Route path="/top-artists" element={<TopArtists />} />
                <Route path="/top-tracks" element={<TopTracks />} />
                <Route path="/recent" element={<Recent />} />
                <Route path="/playlists" element={<Playlists />} />
            </Routes>
        </BrowserRouter>
    </Provider>

);