import Logo from "../components/header/Logo.jsx";
import BlogsRecientes from "../Home/ver-blogs/BlogsRecientes";
import { useEffect, useState } from "react";
import blogs from "../service/Blogs.js";

export default function Explore() {
    const [allBlogs, setAllBlogs] = useState([]); // Todos los blogs
    const [blogsRecientes, setBlogsRecientes] = useState([]); // Blogs paginados
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 6; // Número de blogs por página

    useEffect(() => {
        const fetchBlogsRecientes = async () => {
            try {
                const response = await blogs.getBlogsRecientes();
                setAllBlogs(response.data); // Suponemos que la respuesta devuelve un arreglo de blogs
                paginateBlogs(response.data, 1); // Paginar al cargar
            } catch (error) {
                console.error('Error fetching recent blogs:', error);
            }
        };

        fetchBlogsRecientes();
    }, []);

    useEffect(() => {
        paginateBlogs(allBlogs, currentPage);
    }, [currentPage, allBlogs]);

    const paginateBlogs = (blogs, page) => {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        setBlogsRecientes(blogs.slice(startIndex, endIndex));
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(allBlogs.length / limit)) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center mt-6">
                <section className="text-center">
                    <h1 className="font-mono text-3xl mb-3">Bienvenido a la comunidad de</h1>
                    <div className="flex justify-center">
                        <Logo />
                    </div>
                </section>
            </div>

            <h1 className="mx-4 pb-6 mt-3 text-2xl md:text-3xl lg:text-4xl">Listado de blogs disponibles:</h1>
            <div className="grid mt-2 mx-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogsRecientes.map((blog) => (
                    <BlogsRecientes
                        key={blog.id}
                        id={blog.id}
                        imagenUrl={blog.imagenUrl}
                        fechaCreacion={blog.fechaCreacion}
                        titulo={blog.titulo}
                        autor={blog.autor}
                    />
                ))}
            </div>

            <div className="flex justify-center my-6">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
                >
                    Anterior
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage >= Math.ceil(allBlogs.length / limit)}
                    className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}
