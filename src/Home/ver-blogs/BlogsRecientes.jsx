import { Link } from "react-router-dom";

const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const date = `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()}`;
    const hours = `${dateTime.getHours()}`.padStart(2, '0');
    const minutes = `${dateTime.getMinutes()}`.padStart(2, '0');
    return `${date} ${hours}:${minutes}`;
};

const BlogsRecientes = ({ id, imagenUrl, fechaCreacion, titulo, autor }) => {
    return (
        <Link to={`/blog/${id}`} key={id}>
            <div className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden mb-6 transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300">
                <div className="relative h-48 bg-gray-200">
                    <img
                        src={imagenUrl}
                        alt="Imagen del Blog"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                        <h3 className="text-sm text-gray-500 mb-1 hover:text-gray-700 transition-colors duration-300">{formatDateTime(fechaCreacion)}</h3>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate hover:text-green-600 transition-colors duration-300">{titulo}</h2>
                    </div>
                    <div>
                        <h1 className="text-sm text-green-600 mb-2">{autor}</h1>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogsRecientes;
