import axios from 'axios';

const getBlogsByUserId = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:4445/auth/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting blogs:', error);
        throw error;
    }
};

export default getBlogsByUserId;