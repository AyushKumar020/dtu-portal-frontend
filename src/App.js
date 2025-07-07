
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import Calculator from './pages/Calculator';
import HamburgerMenu from './pages/HamBurgerMenu';
import ResultCard from './pages/ResultCard';
function App() {
  return (
    <Router>
      {/* <HamburgerMenu color="white" /> */}

      <Routes>
        <Route path="/ResultCard" element={<ResultCard />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/" element={<Home />} />
        <Route path="/results/:roll_no" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;


