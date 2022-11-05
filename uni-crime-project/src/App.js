import './css/main.css'
import MainPage from './map_scripts/mainPage.js';

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
