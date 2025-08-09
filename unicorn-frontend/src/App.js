import React, { useState, useEffect } from 'react';
import { ApolloProvider, useQuery } from '@apollo/client';
import { client } from './apolloClient';
import { ME } from './graphql/auth';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function AppContent() {
  const { data, loading, error, refetch } = useQuery(ME);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (data?.me) {
      setUser(data.me);
    } else {
      setUser(null);
    }
  }, [data]);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('uniq_token');
    setUser(null);
  };

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm onLogin={handleLogin} />
        <h2>Register</h2>
        <RegisterForm onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <p>Welcome ja, {user.name}</p>
      <button onClick={handleLogout}>Logout</button>
      {/* Your logged-in app content here */}
    </div>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppContent />
    </ApolloProvider>
  );
}
