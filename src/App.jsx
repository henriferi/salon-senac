import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Matches from './pages/Matches'; 
import LoginRegister from './pages/LoginRegister'; 
import Feedback from './pages/Feedback'; 
import About from './pages/About';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/about" element={<About />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/home" element={<Home />} /> 
      </Routes>
    </Router>
  );
};

export default App;
