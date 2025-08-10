import React, { useState, useEffect } from 'react';
import { ApolloProvider, useQuery } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { client } from './apolloClient';
import { ME } from './graphql/auth';

import RequireAuth from './components/RequireAuth';
import LoginPage from './pages/LoginPage';
import RegisterForm from './components/RegisterForm';
import ProfilePage from './pages/ProfilePage';

function AppContent() {
  const { data, loading, error } = useQuery(ME);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (data?.me) {
      setUser(data.me);
    } else {
      setUser(null);
    }
  }, [data]);

  const handleLogout = () => {
    localStorage.removeItem('site_token');
    setUser(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      {user && <button onClick={handleLogout}>Logout</button>}
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLogin={setUser} />}
        />
        <Route
          path="/register"
          element={<RegisterForm onLogin={setUser}/>}
        />
        <Route
          path="/profile"
          element={
            <RequireAuth user={user}>
              <ProfilePage user={user} />
            </RequireAuth>
          }
        />
        {/* You can add more protected routes here */}
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppContent />
    </ApolloProvider>
  );
}
