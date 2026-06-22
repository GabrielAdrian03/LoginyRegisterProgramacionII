import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirecciona la raíz directamente al Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Rutas principales */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Ruta comodín para capturar errores 404 */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
