import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsuarioService from '../service/UsuarioService';
import Header from "./header/Header.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormularioRegistro = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [nombreU, setNombreU] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [fnacimiento, setFechaNacimiento] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [mostrarConfirmarContraseña, setMostrarConfirmarContraseña] = useState(false);
  const [correoError, setCorreoError] = useState('');
  const [nombreUError, setNombreUError] = useState('');
  const navigate = useNavigate();

  const toggleMostrarContraseña = () => {
    setMostrarContraseña(!mostrarContraseña);
  };

  const toggleMostrarConfirmarContraseña = () => {
    setMostrarConfirmarContraseña(!mostrarConfirmarContraseña);
  };

  const guardarUsuario = (e) => {
    e.preventDefault();

    if (contraseña !== confirmarContraseña) {
      setMensaje('Las contraseñas no coinciden');
      return;
    }

    UsuarioService.registrarUsuario({ nombre, apellido, correo, nombreU, contraseña, fnacimiento })
      .then(() => {
        setMensaje('Usuario registrado con éxito');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      })
      .catch((error) => {
        if (error.response) {
          const responseData = error.response.data;
          if (responseData.includes('correo')) {
            setCorreoError(responseData);
            setMensaje('El correo electrónico ya está registrado');
          } else if (responseData.includes('nombre de usuario')) {
            setNombreUError(responseData);
            setMensaje('El nombre de usuario ya está en uso');
          } else {
            setMensaje('Error al registrar usuario');
          }
        } else {
          setMensaje('Error al conectar con el servidor');
        }
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#C7E9DD] to-[#ACEBC9]">
      <Header />
      <div className="flex bg-white rounded-lg shadow-lg w-full max-w-4xl">
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-4xl font-bold text-[#ACEBC9] text-center">BlogWise</h1>
          <h2 className="text-xl mt-4 text-center">Crea tu cuenta</h2>
          <h1 className="text-3xl font-bold mt-2 text-center">Registrarse</h1>
          {mensaje && <p className="text-red-500 mt-4 text-center">{mensaje}</p>}
          <form className="mt-8 space-y-6" onSubmit={guardarUsuario}>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Ej: Juan"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#ACEBC9] focus:border-[#ACEBC9]"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  placeholder="Ej: Fiallos"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#ACEBC9] focus:border-[#ACEBC9]"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                id="correo"
                name="correo"
                placeholder="Correo electrónico"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#ACEBC9] focus:border-[#ACEBC9]"
                value={correo}
                onChange={(e) => {
                  setCorreo(e.target.value);
                  setCorreoError('');
                }}
                required
              />
              {correoError && <p className="text-red-500 mt-1">{correoError}</p>}
            </div>
            <div>
              <label htmlFor="nombreU" className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
              <input
                type="text"
                id="nombreU"
                name="nombreU"
                placeholder="Nombre de Usuario"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#ACEBC9] focus:border-[#ACEBC9]"
                value={nombreU}
                onChange={(e) => {
                  setNombreU(e.target.value);
                  setNombreUError('');
                }}
                required
              />
              {nombreUError && <p className="text-red-500 mt-1">{nombreUError}</p>}
            </div>
            <div>
              <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <div className="relative mt-1">
                <input
                  type={mostrarContraseña ? "text" : "password"}
                  id="contraseña"
                  name="contraseña"
                  placeholder="Contraseña"
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
            </div>
            <div>
              <label htmlFor="confirmarContraseña" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
              <div className="relative mt-1">
                <input
                  type={mostrarConfirmarContraseña ? "text" : "password"}
                  id="confirmarContraseña"
                  name="confirmarContraseña"
                  placeholder="Confirme su contraseña"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#ACEBC9] focus:border-[#ACEBC9] pr-10"
                  value={confirmarContraseña}
                  onChange={(e) => setConfirmarContraseña(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={toggleMostrarConfirmarContraseña}
                  className="absolute inset-y-0 right-0 px-4 py-2 text-gray-600"
                >
                  {mostrarConfirmarContraseña ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {contraseña !== confirmarContraseña && <p className="text-red-500 mt-1">Las contraseñas no coinciden</p>}
            </div>
            <div>
              <label htmlFor="fnacimiento" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
              <input
                type="date"
                id="fnacimiento"
                name="fnacimiento"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#ACEBC9] focus:border-[#ACEBC9]"
                value={fnacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#ACEBC9] text-white rounded-md hover:bg-green-500 transition duration-150 ease-in-out"
            >
              Registrarse
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">¿Ya tienes cuenta? <a href="/login" className="text-[#ACEBC9] hover:underline">Inicia sesión aquí</a></p>
          </div>
        </div>
        <div className="hidden md:block md:w-1/2 rounded-r-lg">
          <img src="src/assets/registro.jpg" alt="Register illustration" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default FormularioRegistro;