import React from 'react'
import { Link } from 'react-router'
import '../auth.form.scss'
import { useNavigate  } from 'react-router';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Loading from '../../../components/Loading';
import ErrorPage from '../../../components/Error';

const Register = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error, clearError, handleRegister } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    const user = await handleRegister({username, email, password});
    if (user) {
      navigate('/');
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
          navigate('/login');
        }}
      />
    );
  }


  return (
    <main className="auth-page">
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button className="button primary-button" type="submit">
            Create Account
          </button>
        </form>
        <p className="auth-redirect">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  )
}

export default Register
