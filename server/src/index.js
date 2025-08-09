import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers/index.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-super-secret-key';

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
      if (token) {
        try {
          const decoded = jwt.verify(token, JWT_SECRET);
          return { user: decoded }; // user.id will be available in resolvers
        } catch {
          // invalid token
        }
      }
      return {};
    }
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
