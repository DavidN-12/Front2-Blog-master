import { BiLogoCodepen } from "react-icons/bi";
import { TbError404 } from "react-icons/tb";

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <header className="flex items-center text-4xl font-extrabold text-[#6DC093] mb-8">
                <BiLogoCodepen className="mr-2" />
                <h1 className="text-gray-800">BlogWise</h1>
            </header>

            <main className="flex flex-col items-center text-center mt-24">
                <TbError404 className="text-8xl text-red-400 animate-bounce" />
                <h1 className="text-4xl font-bold text-gray-700 mt-8">Página no encontrada :(</h1>
                <p className="text-lg text-gray-600 mt-4">Lo sentimos, pero la página que estás buscando no existe.</p>
                <a href="/" className="mt-8 text-[#6DC093] text-lg underline hover:text-[#56a57d] transition-colors duration-300">
                    Volver al inicio
                </a>
            </main>
        </div>
    );
}

export default NotFound;