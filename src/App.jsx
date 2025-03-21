//App.jsx
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import RegistrarAdmin from './components/RegistrarAdmin';
import Registro from './components/registro';
import Rifa from './components/rifa';
import VistaGanadores from './components/vista_ganadores';
import './styles/App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/registrar_Admin" element={<RegistrarAdmin />} />
        <Route path="/rifa" element={<Rifa />} />
        <Route path="/ganadores" element={<VistaGanadores />} />
      </Routes>
    </Router>
  );
}

export default App;
