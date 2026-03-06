import '../auth.form.scss'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Loading from '../../../components/Loading';
import ErrorPage from '../../../components/Error';


const Login = () => {

    const {loading, error, clearError, handleLogin} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();
        const user = await handleLogin({email, password});
        if (user) {
            navigate('/interview');
        }
    }

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <ErrorPage
                message={error.message}
                code={error.code}
                onRetry={() => clearError()}
                onGoBack={() => {
                    clearError();
                    navigate('/register');
                }}
            />
        );
    }

    return (
        <main className="auth-page">
            <div>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder='Enter You email' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder='Enter Your Password' required />
                    </div>
                    <button className="button primary-button" type="submit">Login</button>
                </form>
                <p className="auth-redirect">
                          Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </main>
    )
}

export default Login
