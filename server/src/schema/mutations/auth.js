import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    register(name: String!, email: String!, password: String!, tokens: Int!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;
