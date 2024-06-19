import { useEffect, useState } from "react";
import DashboardNav from "./DashboardNav.jsx";
import DashHeader from "./DashHeader.jsx";
import Blog from "./blog/Blog.jsx";
import getBlogsByUserId from "../../service/TraerBlogs.js";
import { Link } from "react-router-dom";

function Dashboard() {
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem("usuario"));
            if (userData) {
                const blogsData = await getBlogsByUserId(userData.id);
                console.log('Blogs Data:', blogsData);
                setBlogs(blogsData);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
        const interval = setInterval(fetchBlogs, 500); // Actualizar cada 5 segundos
        return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
    }, []);

    return (
        <div className="flex bg-white gap-4 h-screen pr-2">
            <DashboardNav />
            <main className="flex flex-col w-full h-auto">
                <DashHeader />
                {/* Listado de blogs, configuración del usuario, favoritos, etc. */}
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 pr-2 pt-2  overflow-ellipsis">
                    {/* Pasar la lista de blogs al componente Blog */}
                    {blogs.length > 0 && blogs.map(blog => (

                            <Blog
                                id={blog.id}
                                titulo={blog.titulo}
                                fechaCreacion={blog.fechaCreacion}
                                imagenUrl={blog.imagenUrl}
                                autor={blog.autor}
                            />

                    ))}
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
