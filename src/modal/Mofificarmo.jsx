import { useState, useEffect } from 'react';
import updateBlog from '../service/Blogs'; // Ajusta la ruta según sea necesario
import { Editor } from '@tinymce/tinymce-react';

const MBlog = ({ isOpen, onClose, blogData, onSave }) => {
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [imagen, setImagen] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        if (blogData) {
            setTitulo(blogData.titulo);
            setContenido(blogData.contenido);
        }
    }, [blogData]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (!blogData) {
                console.error('blogData no está definido');
                return;
            }

            const updatedBlogData = {
                id: blogData.id,
                titulo,
                contenido,
                imagenUrl: imagen ? URL.createObjectURL(imagen) : blogData.imagenUrl
            };

            await updateBlog(updatedBlogData);
            setShowSuccessMessage(true);
            onSave(updatedBlogData);
            onClose();
        } catch (error) {
            console.error('Error al guardar el blog:', error);
            setShowErrorMessage(true);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImagen(e.target.files[0]);
        }
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-[1200px] pt-6">
                        <h2 className="text-3xl font-bold mb-6">Modifique su blog: </h2>
                        <hr className="my-6" />
                        <div className="flex gap-6">
                            <div className="flex-1">
                                <form className="text-2xl" onSubmit={handleSave}>
                                    <div>
                                        <div className="flex gap-2 items-center mb-4">
                                            <label htmlFor="titulo" className="font-mono">Titulo: </label>
                                            <input
                                                id="titulo"
                                                type="text"
                                                className="appearance-none focus:outline-none focus:ring-0 border-b-2 border-black w-full"
                                                value={titulo}
                                                onChange={(e) => setTitulo(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="input-imagen" title="Seleccione la foto desde sus archivos" className="cursor-pointer font-mono">
                                            Seleccionar foto de portada:
                                        </label>
                                        <div title="De click en seleccionar foto de portada">
                                            <div className="bg-gray-200 rounded-xl my-4">
                                                <div className="rounded border flex items-center justify-center overflow-hidden mb-2 h-48">
                                                    {imagen ? (
                                                        <img
                                                            src={URL.createObjectURL(imagen)}
                                                            alt="Imagen seleccionada"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-gray-500 flex items-center justify-center text-4xl w-full">+</span>
                                                    )}
                                                </div>
                                                <input
                                                    id="input-imagen"
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleImageChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-start space-x-4 text-xl">
                                        <button
                                            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg"
                                            type="button"
                                            onClick={onClose}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            className="bg-green-100 text-green-700 px-4 py-2 rounded-lg"
                                            type="submit"
                                        >
                                            Modificar
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="flex-1">
                                <label className="block text-2xl mb-2 font-mono">Contenido:</label>
                                <Editor
                                    apiKey="tu-api-key-de-tinymce"
                                    value={contenido}
                                    init={{
                                        height: 300,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar:
                                            'undo redo | formatselect | bold italic backcolor | ' +
                                            'alignleft aligncenter alignright alignjustify | ' +
                                            'bullist numlist outdent indent | removeformat | help'
                                    }}
                                    onEditorChange={(content) => setContenido(content)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showSuccessMessage && (
                <div
                    className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-60"
                    role="alert"
                >
                    <strong className="font-bold">¡Éxito!</strong>
                    <span className="block sm:inline"> El blog se ha modificado correctamente.</span>
                    <button onClick={() => setShowSuccessMessage(false)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <title>Close</title>
                            <path d="M14.354 5.646a.5.5 0 0 1 0 .708l-8 8a.5.5 0 0 1-.708-.708l8-8a.5.5 0 0 1 .708 0z"></path>
                            <path d="M5.646 5.646a.5.5 0 0 1 0 0l8 8a.5.5 0 0 1-.708.708l-8-8a.5.5 0 0 1 0-.708z"></path>
                        </svg>
                    </button>
                </div>
            )}
            {showErrorMessage && (
                <div
                    className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-60"
                    role="alert"
                >
                    <strong className="font-bold">¡Error!</strong>
                    <span className="block sm:inline"> Hubo un problema al modificar el blog.</span>
                    <button onClick={() => setShowErrorMessage(false)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <title>Close</title>
                            <path d="M14.354 5.646a.5.5 0 0 1 0 .708l-8 8a.5.5 0 0 1-.708-.708l8-8a.5.5 0 0 1 .708 0z"></path>
                            <path d="M5.646 5.646a.5.5 0 0 1 0 0l8 8a.5.5 0 0 1-.708.708l-8-8a.5.5 0 0 1 0-.708z"></path>
                        </svg>
                    </button>
                </div>
            )}
        </>
    );
};

export default MBlog;
