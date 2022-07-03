import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './Components/LandingPage.jsx'
import Home from './Components/Home.jsx'
import About from './Components/About.jsx';
import React from "react";
import CountryDetail from './Components/CountryDetail.jsx'
import CreateActivity from './Components/CreateActivity.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About/>} />
        <Route path='/countries/:id' element={<CountryDetail />} />
        <Route path='/activity' element={<CreateActivity/>} />
      </Routes>
    </Router>
  );
}

export default App;
