import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "./header/Header.jsx";
import usuarioService from '../service/UsuarioService';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const navigate = useNavigate();

  const toggleMostrarContraseña = () => {
    setMostrarContraseña(!mostrarContraseña);
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();
    try {
      const response = await usuarioService.iniciarSesion({ correo, contraseña });
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
      navigate('/dashboard');
    } catch (error) {
      setError('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#C7E9DD] to-[#ACEBC9]">
      <Header />
      <div className="flex bg-white rounded-lg shadow-lg w-full max-w-4xl">
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-4xl font-bold text-[#ACEBC9]">BlogWise</h1>
          <h2 className="text-xl mt-4">Bienvenido de vuelta !!!</h2>
          <h1 className="text-3xl font-bold mt-2">Log In</h1>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <form className="mt-8 space-y-6" onSubmit={iniciarSesion}>
            <div>
              <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="correo"
                name="correo"
                placeholder="login@gmail.com"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#ACEBC9] focus:border-[#ACEBC9]"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <div className="relative mt-1">
                <input
                  type={mostrarContraseña ? "text" : "password"}
                  id="contraseña"
                  name="contraseña"
                  placeholder="********"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#ACEBC9] focus:border-[#ACEBC9] pr-10"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={toggleMostrarContraseña}
                  className="absolute inset-y-0 right-0 px-4 py-2 text-gray-600"
                >
                  {mostrarContraseña ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              <a href="/Recoverypass" className="text-sm text-[#ACEBC9] hover:underline float-right mt-2">¿Olvidó su contraseña?</a>
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-[#ACEBC9] text-white rounded-md hover:bg-green-500 transition duration-150 ease-in-out">LOGIN</button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">¿Aún no tienes cuenta? <a href="/register" className="text-[#ACEBC9] hover:underline">Regístrate gratis</a></p>
          </div>
        </div>
        <div className="hidden md:block w-1/2 bg-[#E0E0E0] rounded-r-lg overflow-hidden">
          <img src="src/assets/login.jpg" alt="Login illustration" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;