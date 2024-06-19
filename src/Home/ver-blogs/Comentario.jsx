import { BiUser } from "react-icons/bi";

function Comentario({ nombreUsuario, comentario, fotoUsuario }) {
    return (
        <div className="flex p-0 gap-6 py-4 my-2">
            <div className="flex-shrink-0">
                <div className="">
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center">
                            {fotoUsuario ? (
                                <img
                                    src={fotoUsuario}
                                    alt="Imagen de perfil"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            ) : (
                                <BiUser className="text-gray-600 h-8 w-8" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-grow">
                <h2 className="font-semibold pb-1">{nombreUsuario}</h2>
                <p>{comentario}</p>
            </div>
        </div>
    );
}

export default Comentario;
