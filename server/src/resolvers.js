export const resolvers = {
  Query: {
    products: async () => {
      return [
        { id: '1', name: 'Carrot', description: 'Fresh bio carrot', laborHours: 0.5 }
      ];
    },
    product: async (_, { id }) => {
      return { id, name: 'Carrot', description: 'Fresh bio carrot', laborHours: 0.5 };
    }
  },
  Mutation: {
    addProduct: async (_, { name, description, laborHours }) => {
      const newProduct = {
        id: String(Date.now()),
        name,
        description,
        laborHours
      };
      // later: save to DB
      return newProduct;
    }
  }
};
