import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import InputField from '../components/InputField';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de Login:', formData);
    // Aquí conectarías con tu API de autenticación
  };

  return (
    <AuthLayout title="Bienvenido de nuevo" subtitle="Ingresa a tu cuenta para continuar">
      <form className="mt-6" onSubmit={handleSubmit}>
        <InputField
          label="Correo Electrónico"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@correo.com"
          icon={Mail}
        />
        <InputField
          label="Contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          icon={Lock}
        />

        <button
          type="submit"
          className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-colors mt-6 font-semibold shadow-lg shadow-indigo-600/30"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <LogIn size={18} className="text-indigo-300 group-hover:text-indigo-200" />
          </span>
          Iniciar Sesión
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-400">
        ¿No tienes una cuenta?{' '}
        <Link to="/register" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
          Regístrate aquí
        </Link>
      </p>
    </AuthLayout>
  );
}
