import { useState, useEffect } from 'react';
import axios from 'axios';


const Modal = ({ show, onClose }) => {
    const [user, setUser] = useState(null);
    const [imagen, setImagen] = useState(null);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('usuario');
        try {
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setNombre(parsedUser.nombreU); // Asignamos el nombre de usuario al campo nombre
                setEmail(parsedUser.correo); // Asignamos el correo electrónico al campo email
                // Puedes asignar más campos como apellido o contraseña si es necesario
            }
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
        }
    }, []);

    const handleImagenSeleccionada = (e) => {
        const archivo = e.target.files[0];
        if (archivo) {
            setImagen(archivo);
        }
    };

    const handleGuardarCambios = async () => {
        try {
            // Preparar los datos para enviar al servidor
            const formData = new FormData();
            formData.append('imagen', imagen);
            formData.append('nombre', nombre);
            formData.append('email', email);
            formData.append('contraseña', contraseña);

            // Enviar la solicitud al servidor para subir la imagen y actualizar la información del usuario
            const response = await axios.post(`http://localhost:4445/auth/usuario/${user.id}/imagen-perfil`, formData);

            console.log('Respuesta del servidor:', response.data);

            // Cerrar el modal después de guardar los cambios
            onClose();
        } catch (error) {
            console.error('Error al guardar los cambios:', error);
            // Manejar el error aquí según sea necesario
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                    aria-label="Cerrar modal"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">Configuración:</h2>
                <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        {imagen ? (
                            <img
                                src={URL.createObjectURL(imagen)}
                                alt="Imagen seleccionada"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-gray-500 text-2xl">+</span>
                        )}
                    </div>
                    <label htmlFor="input-imagen" className="ml-4 cursor-pointer text-blue-500">
                        Cambiar foto de perfil
                    </label>
                    <input
                        id="input-imagen"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImagenSeleccionada}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Nombre de usuario:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Correo electrónico:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Contraseña:</label>
                    <input
                        type="password"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        placeholder="Nueva contraseña"
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="flex justify-end">
                    <button onClick={onClose} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg mr-2">
                        Cerrar
                    </button>
                    <button onClick={handleGuardarCambios} className="bg-green-100 text-green-700 px-4 py-2 rounded-lg">
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
