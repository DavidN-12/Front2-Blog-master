import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="mt-0 text-black py-10">
            <div className="flex flex-col items-center text-center">
                <div>
                    <h1 className="text-5xl text-black mb-6">¿Preguntas?</h1>
                    <h3 className="text-2xl flex flex-col md:flex-row gap-2 my-4">
                        Visita nuestro
                        <a href="#" className="text-green-600 hover:underline transition duration-300">centro de ayuda</a>
                        para responderlas.
                    </h3>
                </div>
                <div className="mt-8 flex space-x-6">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors duration-300 transform hover:scale-110">
                        <FaInstagram className="text-3xl" />
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors duration-300 transform hover:scale-110">
                        <FaFacebook className="text-3xl" />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300 transform hover:scale-110">
                        <FaTwitter className="text-3xl" />
                    </a>
                    <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors duration-300 transform hover:scale-110">
                        <FaWhatsapp className="text-3xl" />
                    </a>
                </div>
                <div className="mt-10 text-center text-gray-600">
                    <hr className={"text-black border-gray-300 py-2 border-1.5"}/>
                    <p>&copy; 2024 Blogwise. Todos los derechos reservados. El contenido de esta página web, incluyendo
                        textos, gráficos, imágenes y otros materiales, está protegido por derechos de autor. Queda
                        prohibida su reproducción total o parcial, así como su uso no autorizado, sin el permiso expreso
                        y por escrito de Blogwise. Cualquier infracción será perseguida de conformidad con las leyes
                        vigentes. Para consultas o permisos, por favor, contacta a <a href="mailto:info@blogwise.com"
                                                                                      className="hover:underline text-blue-500 transition duration-300">info@blogwise.com</a>.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
