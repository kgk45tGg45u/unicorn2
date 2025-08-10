import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/auth';
import { useNavigate, useLocation } from 'react-router-dom';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted(data) {
      localStorage.setItem('uniq_token', data.login.token);
      onLogin(data.login.user);
      // Redirect: go to the page they tried to visit, or profile if none
      const from = location.state?.from?.pathname || '/profile';
      navigate(from, { replace: true });
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    login({ variables: { email, password } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </form>
  );
}
