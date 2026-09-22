import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import AuthLayout from '../src/components/AuthLayout';
import InputField from '../src/components/InputField';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorBackend, setErrorBackend] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorBackend(null);

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el servidor');
      }

      localStorage.setItem('user_token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setErrorBackend(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Bienvenido de nuevo" subtitle="Ingresa a tu cuenta para continuar">
      <form className="mt-6" onSubmit={handleSubmit}>
        {errorBackend && (
          <div className="p-3 mb-4 text-red-400 bg-red-900/20 border-red-500/30 rounded-lg">
            {errorBackend}
          </div>
        )}

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
          disabled={loading}
          className={`group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white transition-colors mt-6 font-semibold shadow-lg ${
            loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30'
          }`}
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <LogIn size={18} className="text-indigo-300 group-hover:text-indigo-200" />
          </span>
          {loading ? 'verificando...' : 'Iniciar Sesión'}
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

