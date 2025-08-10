import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    addProduct(name: String!, description: String, laborHours: Float!): Product!
    addProductInput(productId: ID!, inputProductId: ID!, quantity: Float!): ProductInput!
  }
`;
