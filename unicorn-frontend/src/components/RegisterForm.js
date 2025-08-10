import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../graphql/auth';

export default function RegisterForm({ onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const [register, { loading }] = useMutation(REGISTER, {
    onCompleted(data) {
      localStorage.setItem('site_token', data.register.token);
      onLogin(data.register.user);
      navigate('/profile', { replace: true });
    },
    onError(error) {
      setErrorMessage(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    register({ variables: { name, email, password, tokens: 0 } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
}
