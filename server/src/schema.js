import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Product {
    id: ID!
    name: String!
    description: String
    inputs: [ProductInput!]!  # inputs needed to produce this product
    laborHours: Float!        # direct labor hours
  }

  type ProductInput {
    inputProduct: Product!
    quantity: Float!
  }

  type LaborValue {
    productId: ID!
    directLabor: Float!
    indirectLabor: Float
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
    me: User
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    addProduct(name: String!, description: String, laborHours: Float!): Product!
    addProductInput(productId: ID!, inputProductId: ID!, quantity: Float!): ProductInput!
  }
`;
