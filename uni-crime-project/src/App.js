import './css/main.css'
import MainPage from './map_scripts/mainPage.js';
import MapPage from './map_scripts/mapPage.js';

import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from 'react'
import ReactDOM from 'react-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapPage/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
