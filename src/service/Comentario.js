    import axios from 'axios';

    const enviarComentario = async (comentario, blogId, usuarioId) => {
        const url = `http://localhost:4445/auth/crearComentario`;
        const params = {
            blogId: blogId,
            usuarioId: usuarioId,
            comentario: comentario
        };
        const response = await axios.post(url, null, { params: params });
        return response.data;
    };
    

    export default enviarComentario;
