import { FaEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import blogs from "../../../service/Blogs.js";
import ModificarBlogModal from "../../../modal/Mofificarmo.jsx"; // Importa el componente del modal de edición

const Blog = ({ id, titulo, imagenUrl, fechaCreacion, onDelete }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [blogData, setBlogData] = useState(null);

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const date = `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()}`;
        const hours = `${dateTime.getHours()}`.padStart(2, '0');
        const minutes = `${dateTime.getMinutes()}`.padStart(2, '0');
        return `${date} ${hours}:${minutes}`;
    };

    const handleDelete = async () => {
        const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este blog?");
        if (confirmed) {
            try {
                await blogs.deleteBlog(id);
                onDelete(id); // Elimina el blog de la interfaz después de borrarlo
            } catch (error) {
                console.error("Error al eliminar el blog:", error);
            }
        }
    };

    const handleEdit = async () => {
        try {
            const response = await blogs.getBlogById(id);
            const { titulo, contenido, imagenUrl } = response.data;
            setBlogData({ id, titulo, contenido, imagenUrl }); // Pasa los datos del blog al estado del modal
            setModalOpen(true);
        } catch (error) {
            console.error("Error al obtener el blog:", error);
        }
    };

    const handleSaveBlog = async (blogData) => {
        try {
            console.log("Guardando blog:", blogData);
            // Aquí deberías implementar la lógica para guardar los cambios del blog
            setModalOpen(false); // Cierra el modal después de guardar
        } catch (error) {
            console.error("Error al guardar el blog:", error);
        }
    };

    return (
        <div className="bg-gray-50 p-4 shadow-md rounded-lg flex gap-6 hover:shadow-xl transition-shadow duration-300 h-[150px] relative">
            {/* Contenido del blog */}
            <div className="w-[40%] bg-green-100 rounded">
                <Link to={`/blog/${id}`} key={id}>
                    <img src={imagenUrl} alt="Imagen del Blog" className="w-full h-full object-cover rounded" />
                </Link>
            </div>
            <div className="w-[60%] p-4 rounded-lg ">
                <h2 className="text-xl font-bold overflow-hidden">{titulo}</h2>
                <h5 className="font-mono text-gray-400 text-md">{formatDateTime(fechaCreacion)}</h5>
                <div className="mt-4 flex-grow">
                    {/* Aquí puedes mostrar un fragmento del contenido del blog */}
                </div>
                <div className="flex justify-end items-end mt-4">
                    <button
                        title="Editar Blog"
                        className="text-xl text-blue-500 mr-2 focus:outline-none"
                        onClick={handleEdit} // Abre el modal con los datos del blog
                    >
                        <FaEdit className="inline-block align-text-bottom" />
                    </button>
                    <button
                        title="Eliminar blog"
                        className="text-xl text-red-500 focus:outline-none"
                        onClick={handleDelete} // Llama a la función handleDelete para eliminar el blog
                    >
                        <FiDelete className="inline-block align-text-bottom" />
                    </button>
                </div>
            </div>

            {/* Modal para editar el blog */}
            {isModalOpen && (
                <ModificarBlogModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    blogData={blogData} // Pasa los datos del blog al modal de edición
                    onSave={handleSaveBlog} // Pasa la función para guardar el blog al modal
                />
            )}

            {/* Elemento oculto para almacenar el ID del blog */}
            <span className="hidden blog-id">{id}</span>
        </div>
    );
};

export default Blog;
