import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import blogs from '../../service/Blogs.js'; // Supongo que este es tu servicio para obtener blogs
import Tags from "./Tags.jsx";
import axios from 'axios';
import BlogsRecientes from "./BlogsRecientes.jsx";
import { FaArrowLeft } from "react-icons/fa";
import AgregarComentario from "./AgregarComentario.jsx";
import Comentario from "./Comentario.jsx";

const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const date = `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()}`;
    const hours = `${dateTime.getHours()}`.padStart(2, '0');
    const minutes = `${dateTime.getMinutes()}`.padStart(2, '0');
    return `${date} ${hours}:${minutes}`;
};

function VerBlog() {
    const [blog, setBlog] = useState(null);
    const [blogsRecientes, setBlogsRecientes] = useState([]);
    const [comentarios, setComentarios] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await blogs.getBlogById(id);
                setBlog(response.data);
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };

        const fetchBlogsRecientes = async () => {
            try {
                const response = await blogs.getBlogsRecientes();
                setBlogsRecientes(response.data.slice(0, 5)); // Limitar a 5 blogs recientes
            } catch (error) {
                console.error('Error fetching recent blogs:', error);
            }
        };

        const fetchComentarios = async () => {
            try {
                const response = await axios.get(`http://localhost:4445/auth/comentarios/${id}`);
                setComentarios(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchBlog();
        fetchBlogsRecientes();
        fetchComentarios();
    }, [id]);

    const handleAddComentario = (nuevoComentario) => {
        setComentarios([nuevoComentario, ...comentarios]);
    };

    return (
        <>
            <nav className="container mx-auto py-2 px-4 font-mono mb-6">
                <div className="flex items-center gap-2">
                    <FaArrowLeft />
                    <Link to="/dashboard">Regresar</Link>
                </div>
            </nav>
            <div className="container mx-auto flex flex-wrap lg:flex-nowrap xl:px-44">
                <main className="w-full lg:w-2/3 h-full mb-6 lg:mb-0">
                    {blog ? (
                        <div>
                            <h1 className="text-4xl font-bold mx-3 py-6 pt-14 break-words w-full">
                                {blog.titulo}
                            </h1>
                            <div className="mx-3">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center">
                                            {blog.imagenAutor ? (
                                                <img
                                                    src={blog.imagenAutor}
                                                    alt="Imagen de autor"
                                                    className="w-full h-full object-cover rounded-full"
                                                />
                                            ) : (
                                                <div className="text-gray-600 flex items-center justify-center">
                                                    {/* Icono o avatar genérico si no hay imagen */}
                                                </div>
                                            )}
                                        </div>
                                        <h1 className="text-green-600">{blog.autor}</h1>
                                    </div>
                                    <div className="flex items-center mx-3">
                                        <div className="flex gap-2">
                                            <Tags />
                                            <Tags />
                                        </div>
                                        <h3 className="text-sm text-gray-500 pl-2">
                                            {formatDateTime(blog.fechaCreacion)}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div className="bg-gray-200 h-[350px] mx-3 rounded">
                                <img
                                    src={blog.imagenUrl}
                                    alt="Imagen del Blog"
                                    className="w-full h-full object-cover rounded"
                                />
                            </div>
                            <div
                                className="mx-3 mt-3 text-lg text-gray-800 leading-relaxed text-justify"
                                dangerouslySetInnerHTML={{ __html: blog.contenido }}
                            ></div>
                            <h1 className="text-3xl mb-3 font-semibold mt-8 py-3 border-b-4 border-green-600">
                                Comentarios
                            </h1>
                            <AgregarComentario
                                userId={localStorage.getItem('userId')}
                                blogId={id}
                                onAddComentario={handleAddComentario}
                            />
                            {comentarios.map((comentario) => (
    <Comentario
        key={comentario.idComentario}
        nombreUsuario={comentario.nombreUsuario}
        comentario={comentario.comentario}
        fotoUsuario={comentario.fotoUsuario} // Asegúrate de pasar la URL de la imagen del usuario
    />
))}
                        </div>
                    ) : (
                        <p>Cargando...</p>
                    )}
                </main>
                <aside className="w-full lg:w-1/3 lg:ml-6">
                    <h1 className="text-3xl mb-5 font-semibold mt-8 lg:mt-0 py-3 border-b-4 border-green-600">Blogs recientes</h1>
                    <div className="pl-4">
                        {blogsRecientes.map((blogReciente) => (
                            <BlogsRecientes
                                key={blogReciente.id}
                                id={blogReciente.id}
                                imagenUrl={blogReciente.imagenUrl}
                                fechaCreacion={blogReciente.fechaCreacion}
                                titulo={blogReciente.titulo}
                                autor={blogReciente.autor}
                            />
                        ))}
                    </div>
                </aside>
            </div>
        </>
    );
}

export default VerBlog;
