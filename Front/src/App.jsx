import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "../views/Login";
import Register from "../views/Register";
import ProtectedRoute from './components/ProtectedRoutes';

function Dashboard(){
  const cerrarSesion = () => {
    localStorage.removeItem('user_token');
    window.location.reload();
  }

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h1>Bienvenido al Sistema</h1>
      <button onClick={cerrarSesion}> Cerrar Sesion</button>
    </div>
  )
};


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Ruta raíz (/): Redirecciona automáticamente al login si entran al sitio por primera vez */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* 2. Ruta real del Login (Descomentada y corregida) */}
        <Route path="/login" element={<Login />} />
        
        {/* 3. Ruta del Registro */}
        <Route path="/register" element={<Register />} />

        {/* 4. Ruta Protegida para el Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute> 
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 5. Comodín: Cualquier ruta inválida (ej: /loquesea) te manda al login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
