import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation Register($name: String!, $email: String!, $password: String!, $tokens: Int!) {
    register(name: $name, email: $email, password: $password, tokens: $tokens) {
      token
      user {
        id
        name
        email
        tokens
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      id
      name
      email
      tokens
    }
  }
`;
