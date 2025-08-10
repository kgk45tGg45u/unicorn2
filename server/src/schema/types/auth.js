import { gql } from 'apollo-server-express';

export default gql`
  type AuthPayload {
    token: String!
    user: User!
  }
`;
