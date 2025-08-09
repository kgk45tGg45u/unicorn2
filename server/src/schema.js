import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String
    inputs: [ProductInput]
    laborHours: Float
  }

  type ProductInput {
    productId: ID!
    quantity: Float!
  }

  type LaborValue {
    productId: ID!
    directLabor: Float!
    indirectLabor: Float
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
  }

  type Mutation {
    addProduct(name: String!, description: String, laborHours: Float!): Product
  }
`;
