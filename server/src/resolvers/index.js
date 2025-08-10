import { authResolvers } from './loginResolver.js';
import { meResolver } from './meResolver.js';
import { productResolvers } from './productResolver.js'; // example, your other resolvers

export const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...productResolvers.Query,
    ...meResolver.Query
    // add other Query resolvers here
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...productResolvers.Mutation,
    ...meResolver.Mutation
    // add other Mutation resolvers here
  },
  // Add other resolver types if needed
};
