import axios from 'axios';

const createBlog = async (titulo, contenido, file, userId) => {
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('contenido', contenido);
    formData.append('file', file);
    formData.append('userId', userId);

    try {
        const response = await axios.post('http://localhost:4445/auth/crearB', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating blog:', error);
        throw error;
    }
};

export default createBlog;