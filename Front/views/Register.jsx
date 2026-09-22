import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import AuthLayout from '../src/components/AuthLayout';
import InputField from '../src/components/InputField';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de Registro:', formData);
  };

  return (
    <AuthLayout title="Crea tu cuenta" subtitle="Únete hoy y disfruta de todos los beneficios">
      <form className="mt-6" onSubmit={handleSubmit}>
        <InputField
          label="Nombre Completo"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Juan Pérez"
          icon={User}
        />
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
          placeholder="Mínimo 8 caracteres"
          icon={Lock}
        />

        <button
          type="submit"
          className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-cyan-600 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-colors mt-6 font-semibold shadow-lg shadow-cyan-600/30"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <UserPlus size={18} className="text-cyan-200 group-hover:text-cyan-100" />
          </span>
          Registrarse
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-400">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
          Inicia sesión
        </Link>
      </p>
    </AuthLayout>
  );
}

