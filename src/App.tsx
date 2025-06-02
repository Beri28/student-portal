import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Results from './pages/Results';
import './App.css'
import Results2 from './pages/Results2';
import Register from './pages/Register';
import { useAuth } from './context/AuthContext';


const App: React.FC = () => {
  const {isAuthenticated,user}=useAuth()
  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated? <Home />:<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/results" element={<Results />} /> */}
        <Route path="/results" element={isAuthenticated?<Results2 />:<Login />} />
      </Routes>
    </Router>
  );
};

export default App;