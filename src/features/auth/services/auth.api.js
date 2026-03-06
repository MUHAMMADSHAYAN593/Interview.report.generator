import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    withCredentials: true
});

export async function registerUser({username, email, password}) {
    try{
        const response = await api.post('/api/auth/register', { username, email, password })

        return response.data;
    } catch (error) {
        console.error('Error in registerUser API:', error);
        throw error;
    }
}


export async function loginUser({email, password}) {
    try{
        const response = await api.post('/api/auth/login', { email, password })

        return response.data;
    } catch (error) {
        console.error('Error in loginUser API:', error);
        throw error;
    }
}

export async function logoutUser() {
    try{
        const response = await api.get('/api/auth/logout' )

        return response.data;
    } catch (error) {   
        console.error('Error in logoutUser API:', error);
        throw error;
    }
}

export async function getMe() {
    try{
        const response = await api.get('/api/auth/get-me')

        return response.data;
    } catch (error) {   
        console.error('Error in getMe API:', error);
        throw error;
    }
}
