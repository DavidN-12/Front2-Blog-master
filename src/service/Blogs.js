import axios from 'axios';

const API_URL = 'http://localhost:4445/auth';

class Blogs {

    getBlogById = (id) => {
        return axios.get(`${API_URL}/blog/${id}`);
    };

    getBlogsRecientes = () => {
        return axios.get(`${API_URL}/blogs/recientes`);
    };

    getAllBlogs = () => {
        return axios.get(`${API_URL}/blogs`);
    };

    getUserById = (id) => {
        return axios.get(`${API_URL}/user/${id}`);
    };

    updateBlog = (updatedBlogData) => {
        const { id, titulo, contenido, imagen } = updatedBlogData;

        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('contenido', contenido);
        if (imagen) {
            formData.append('imagen', imagen);
        }

        return axios.put(`${API_URL}/modificarB/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    deleteBlog = (id) => {
        return axios.delete(`${API_URL}/blogE/${id}`);
    };
}

const blogs = new Blogs();
export default blogs;
