import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/auth';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error }] = useMutation(LOGIN);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/profile'; // default redirect

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: { email, password },
      });

      if (data?.login?.token) {
        localStorage.setItem('uniq_token', data.login.token);
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>Login failed. Try again.</p>}
    </div>
  );
}
