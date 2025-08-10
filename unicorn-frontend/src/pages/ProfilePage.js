import React from 'react';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/auth';

export default function ProfilePage() {
  const { data, loading, error } = useQuery(ME, { fetchPolicy: 'network-only' });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile.</p>;

  const user = data?.me;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>You have {user.tokens} tokens.</p>
    </div>
  );
}
