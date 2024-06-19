import { useState } from 'react';
import usuarioService from '../service/UsuarioService';
import Header from './header/Header.jsx';
import { useNavigate } from 'react-router-dom';

function RecoverPassword() {
  const [correo, setCorreo] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRecoverPassword = () => {
    usuarioService.resetearContraseña(correo)
      .then(response => {
        console.log("Correo electrónico enviado con éxito:", response);
        setMessage("Revise su correo electrónico para restablecer la contraseña.");
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      })
      .catch(error => {
        console.error("Error al enviar correo electrónico:", error);
        if (error.response && error.response.status === 400) {
          setMessage("El correo electrónico no está registrado.");
        } else {
          setMessage("Ocurrió un error al enviar el correo electrónico.");
        }
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#C7E9DD] to-[#ACEBC9]">
      <Header />
      <div className="flex bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div className="w-full p-8">
          <h1 className="text-4xl font-bold text-[#ACEBC9] text-center">BlogWise</h1>
          <h2 className="text-2xl mt-4 font-bold text-center">Recuperar cuenta</h2>
          {message && <p className="text-center text-red-500 mt-4">{message}</p>}
          <form className="mt-8 space-y-6">
            <div>
              <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Ingrese su correo electrónico:</label>
              <input
                type="email"
                id="correo"
                name="correo"
                placeholder="Ejemplo: maria123@outlook.com"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#ACEBC9] focus:border-[#ACEBC9]"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <button
              type="button"
              className="w-full py-2 px-4 bg-[#ACEBC9] text-white rounded-md hover:bg-green-500 transition duration-150 ease-in-out"
              onClick={handleRecoverPassword}
            >
              Recuperar contraseña
            </button>
          </form>
        </div>
        <div className="hidden md:block w-1/2 bg-[#E0E0E0] rounded-r-lg overflow-hidden">
          <img src="src/assets/contraseña.jpg" alt="Recover Password illustration" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default RecoverPassword;
