import { gql } from 'apollo-server-express';

export default gql`
  type Product {
    id: ID!
    name: String!
    description: String
    inputs: [ProductInput!]!
    laborHours: Float!
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
`;
