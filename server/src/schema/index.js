import { gql } from 'apollo-server-express';
import { mergeTypeDefs } from '@graphql-tools/merge';

import UserType from './types/user.js';
import AuthType from './types/auth.js';
import ProductType from './types/product.js';

import UserQueries from './queries/user.js';
import ProductQueries from './queries/product.js';

import AuthMutations from './mutations/auth.js';
import ProductMutations from './mutations/product.js';

const baseTypeDefs = gql`
  type Query
  type Mutation
`;

export const typeDefs = mergeTypeDefs([
  baseTypeDefs,
  UserType,
  AuthType,
  ProductType,
  UserQueries,
  ProductQueries,
  AuthMutations,
  ProductMutations,
]);
