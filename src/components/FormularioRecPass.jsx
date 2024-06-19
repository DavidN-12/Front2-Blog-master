import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import usuarioService from '../service/UsuarioService';
import Header from "./header/Header.jsx";

const FormularioRecPass = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  console.log("Token:", token);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setMensaje('Las contraseñas no coinciden');
      return;
    }

    try {
      await usuarioService.actualizarContraseña(token, newPassword);
      setMensaje('Contraseña cambiada con éxito');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#C7E9DD] to-[#ACEBC9]">
      <Header />
      <div className="flex bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div className="w-full p-8">
          <h1 className="text-4xl font-bold text-[#ACEBC9] text-center">BlogWise</h1>
          <h2 className="text-2xl mt-4 font-bold text-center">Recuperar Contraseña</h2>
          <h3 className="text-xl mt-4 font-light text-center">Introduce tu nueva contraseña</h3>
          {mensaje && <p className="text-center text-red-500 mt-4">{mensaje}</p>}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Nueva Contraseña:</label>
              <div className="relative mt-1">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  placeholder="Nueva Contraseña"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#ACEBC9] focus:border-[#ACEBC9] pr-10"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowNewPassword}
                  className="absolute inset-y-0 right-0 px-4 py-2 text-gray-600"
                >
                  {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Contraseña:</label>
              <div className="relative mt-1">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirmar Contraseña"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#ACEBC9] focus:border-[#ACEBC9] pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowConfirmPassword}
                  className="absolute inset-y-0 right-0 px-4 py-2 text-gray-600"
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#ACEBC9] text-white rounded-md hover:bg-green-500 transition duration-150 ease-in-out"
            >
              Cambiar Contraseña
            </button>
          </form>
        </div>
        <div className="hidden md:block w-1/2 bg-[#E0E0E0] rounded-r-lg overflow-hidden">
          <img src="src/assets/contraseña2.jpg" alt="Recover Password illustration" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default FormularioRecPass;
