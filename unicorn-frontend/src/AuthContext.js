import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

export const AuthContext = createContext();

const ME_QUERY = gql`
  query {
    me {
      id
      username
      email
      tokens
    }
  }
`;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { data, loading, refetch } = useQuery(ME_QUERY, {
    skip: !token,
  });

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    refetch();
  };

  const logout = () => {
    localStorage.removeItem("site_token");
    setToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user: data?.me || null,
        token,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
