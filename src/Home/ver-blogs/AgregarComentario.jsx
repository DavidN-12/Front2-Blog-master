import { useState } from 'react';
import enviarComentario from '../../service/Comentario.js';

export default function AgregarComentario({ blogId }) {
    const [comentario, setComentario] = useState('');
    const usuarioString = localStorage.getItem('usuario');
    const usuario = usuarioString ? JSON.parse(usuarioString) : null;

    const handleComentarioChange = (e) => {
        setComentario(e.target.value);
    };

    const handleAddComentario = async () => {
        if (comentario.trim()) {
            try {
                const response = await enviarComentario(comentario, blogId, usuario.id);
                console.log('Comentario creado con éxito:', response);
                setComentario(''); // Limpiar el comentario después de enviarlo con éxito
            } catch (error) {
                console.error('Error al crear el comentario:', error);
            }
        }
    };

    return (
        <div className="flex p-4 gap-6">
            <div className="flex-shrink-0">
                {/* Espacio para la foto del usuario */}
                <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
                    {usuario && usuario.imagenPerfil ? (
                        <img
                            src={usuario.imagenPerfil}
                            alt="Imagen de perfil"
                            className="w-full h-full object-cover rounded-full"
                        />
                    ) : (
                        // Si no hay imagen de perfil, muestra un avatar genérico
                        <div className="text-gray-600 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 14l9-5-9-5-9 5 9 5z"
                                />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex-grow">
                {/* Espacio para el nombre del usuario */}
                {usuario && (
                    <div className="text-sm text-gray-700 font-semibold">{usuario.nombreU}</div>
                )}
                <textarea
                    className="w-full p-2 resize-none overflow-hidden bg-none appearance-none focus:outline-none bg-transparent border-b-2 border-gray-300 focus:border-black"
                    rows="1"
                    placeholder="Añadir un comentario..."
                    value={comentario}
                    onChange={handleComentarioChange}
                    onInput={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                />
                <div className="flex justify-end mt-2">
                    <button
                        className="text-lg px-4 py-2 hover:bg-gray-200 rounded-3xl"
                        onClick={() => setComentario('')}
                    >
                        Cancelar
                    </button>
                    <button
                        className={`text-lg px-4 py-2 rounded-3xl ${comentario.trim() ? 'bg-green-300 hover:bg-green-400' : 'bg-gray-300 cursor-not-allowed'}`}
                        disabled={!comentario.trim()}
                        onClick={handleAddComentario}
                    >
                        Publicar
                    </button>
                </div>
            </div>
        </div>
    );
}
