import axios from '../api/axios';


const authService = {
    login: async (email, password) => {
        console.log(email)
        const response = await axios.post('/auth', { email, password }, { withCredentials: true });
        console.log(response)
        console.log(response.data)
        return response.data; // accessToken, user
    },

    register: async (username, email, password) => {
        const response = await axios.post('/register', { username, email, password });
        return response.data;
    },

    refreshToken: async () => {
        const response = await axios.get('/refresh', { withCredentials: true });
        return response.data; // accessToken, user
    },

    logout: async () => {
        await axios.get('/logout', { withCredentials: true });
    }
};

export default authService;
