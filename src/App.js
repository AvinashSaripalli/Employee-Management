import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Sidebar from './Components/Sidebar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sidebar" element={<Sidebar/>} />
        <Route path="/" element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;
