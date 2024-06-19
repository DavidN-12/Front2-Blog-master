import React from 'react';

const MAuthorizeComment = ({ isOpen, onClose, comments, onAuthorize, onReject }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[800px]">
                <h2 className="text-xl font-bold mb-4">Autorizar Comentarios</h2>
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="p-4 border-b flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={comment.userImage}
                                    alt={`Imagen de ${comment.userName}`}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div className="flex-grow text-sm">
                                    <p className="font-bold">{comment.userName}</p>
                                    <p>{comment.content}</p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm"
                                    onClick={() => onAuthorize(comment.id)}
                                >
                                    Autorizar
                                </button>
                                <button
                                    className="bg-red-100 text-red-700 px-2 py-1 rounded-lg text-sm"
                                    onClick={() => onReject(comment.id)}
                                >
                                    Rechazar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MAuthorizeComment;