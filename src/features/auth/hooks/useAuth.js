import { useContext, useEffect } from 'react'
import { AuthContext } from '../auth.context'
import { loginUser, registerUser, logoutUser, getMe } from '../services/auth.api';

const normalizeApiError = (error, fallbackMessage) => {
    const status = error?.response?.status;
    const serverMessage = error?.response?.data?.error || error?.response?.data?.message;
    return {
        code: status ? String(status) : 'AUTH_ERROR',
        message: serverMessage || error?.message || fallbackMessage,
    };
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading, error, setError } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        setError(null);
        try {
            const data = await loginUser({ email, password });
            setUser(data.user);
            return data.user;
        } catch (error) {
            console.error('Login failed:', error);
            setError(normalizeApiError(error, 'Unable to log in right now. Please try again.'));
            return null;
        } finally {
            setLoading(false);
        }
    }
    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        setError(null);
        try {
            const data = await registerUser({ username, email, password });
            setUser(data.user);
            return data.user;
        } catch (error) {
            console.error('Registration failed:', error);
            setError(normalizeApiError(error, 'Unable to register right now. Please try again.'));
            return null;
        } finally {
            setLoading(false);
        }
    }
    const handleLogout = async () => {
        setLoading(true);
        setError(null);
        try {
            await logoutUser();
            setUser(null);
            return true;
        } catch (error) {
            console.error('Logout failed:', error);
            setError(normalizeApiError(error, 'Unable to log out right now. Please try again.'));
            return false;
        } finally {
            setLoading(false);
        }
    }
    const fetchCurrentUser = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getMe();
            setUser(data.user);
            return data.user;
        } catch (error) {
            console.error('Fetching current user failed:', error);
            setError(normalizeApiError(error, 'Unable to verify your session.'));
            return null;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getMe();
                setUser(userData.user);
            } catch (error) {
                setUser(null);
                setError(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    },[])

    return {
        user,
        loading,
        error,
        clearError: () => setError(null),
        handleLogin,
        handleRegister,
        handleLogout,
        fetchCurrentUser
    }

}
