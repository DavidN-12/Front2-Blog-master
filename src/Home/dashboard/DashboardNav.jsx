import { useState, useEffect } from 'react';
import { FaClock, FaSearch, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { TbWorld } from 'react-icons/tb';
import { RxExit } from 'react-icons/rx';
import { IoSettingsSharp } from 'react-icons/io5';
import Modal from '../../modal/MConfiguracion';

function DashboardNav() {
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('usuario');
        console.log('Usuario almacenado:', storedUser); 
        try {
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            }
        } catch (error) {
            console.error('Error parsing user data from localStorage:', error);
        }
    }, []);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const renderUserAvatar = () => {
        if (user && user.imagenPerfil) {
            return (
                <img
                    src={user.imagenPerfil}
                    alt="Imagen de perfil"
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-black font-bold"
                />
            );
        } else if (user && user.nombreU) {
            return (
                <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center text-black font-bold">
                    {user.nombreU.charAt(0).toUpperCase()}
                </div>
            );
        } else {
            return null; // Otra lógica de manejo si no hay usuario o imagen de perfil
        }
    };

    return (
        <nav className="bg-[#F5F6F6] gap-4 h-screen text-[18px] w-[350px] relative">
            <div className="text-2xl flex gap-2 items-center mb-6 pl-2 mt-2">
                {renderUserAvatar()}
                <h1 className="font-bold">{user && user.nombreU}</h1>
            </div>

            <div className="relative flex items-center gap-3 mb-3">
                <FaSearch className="absolute left-5" />
                <input
                    type="text"
                    placeholder="Buscar blog"
                    className="pl-14 pr-3 py-2 border w-screen bg-gray-300 border-gray-300 focus:outline-none focus:border-blue-500"
                />
            </div>

            <div>
                <div className="flex flex-col items-start text-[19px] gap-2">
                    <Link to="/" className="flex items-center gap-4 hover:font-bold ml-3 w-full rounded px-2">
                        <FaClock /> Recientes
                    </Link>
                    <Link to="/" className="flex items-center gap-4 hover:font-bold w-full ml-3 rounded px-2">
                        <FaStar /> Favoritos
                    </Link>
                    <button
                        onClick={handleOpenModal}
                        className="flex items-center gap-4 hover:font-bold w-full ml-3 rounded px-2"
                    >
                        <IoSettingsSharp />
                        Configuración
                    </button>
                    <Modal show={showModal} onClose={handleCloseModal} />
                </div>
                <hr className="my-4" />
            </div>

            {/* User settings */}
            <div className="absolute bottom-0 w-full mb-7">
                <hr className="my-4" />
                <div className="flex flex-col items-start text-[19px]">
                    <Link
                        to="/explore"
                        className="flex items-center gap-4 hover:font-bold ml-3 w-full rounded px-2"
                    >
                        <TbWorld /> Explora la comunidad
                    </Link>
                    <br />
                    <a
                        href="/exit"
                        className="flex items-center gap-4 hover:font-bold ml-3 w-full rounded px-2"
                    >
                        <RxExit /> Salir de tu cuenta
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default DashboardNav;
