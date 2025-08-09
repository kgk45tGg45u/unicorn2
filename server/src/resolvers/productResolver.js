import pool from '../db.js';

export const productResolvers = {
  Query: {
    products: async () => {
      const { rows } = await pool.query('SELECT * FROM products ORDER BY id');

      // Map DB fields to GraphQL fields and include empty inputs array initially
      const products = await Promise.all(rows.map(async (row) => {
        // Fetch inputs for each product
        const inputsResult = await pool.query(
          `SELECT pi.quantity, p.id, p.name, p.description, p.labor_hours
          FROM product_inputs pi
          JOIN products p ON pi.input_product_id = p.id
          WHERE pi.product_id = $1`,
          [row.id]
        );

        const inputs = inputsResult.rows.map(inputRow => ({
          quantity: inputRow.quantity,
          inputProduct: {
            id: inputRow.id,
            name: inputRow.name,
            description: inputRow.description,
            laborHours: inputRow.labor_hours,
          }
        }));

        return {
          id: row.id,
          name: row.name,
          description: row.description,
          laborHours: row.labor_hours,
          inputs: inputs
        };
      }));

      return products;
    }

  },

  Mutation: {
    addProduct: async (_, { name, description, laborHours }) => {
      const { rows } = await pool.query(
        `INSERT INTO products (name, description, labor_hours)
         VALUES ($1, $2, $3) RETURNING *`,
        [name, description, laborHours]
      );
      return rows[0];
    },

    addProductInput: async (_, { productId, inputProductId, quantity }) => {
      const { rows } = await pool.query(
        `INSERT INTO product_inputs (product_id, input_product_id, quantity)
         VALUES ($1, $2, $3) RETURNING *`,
        [productId, inputProductId, quantity]
      );

      // Return the inserted input with nested inputProduct info
      const input = rows[0];

      const { rows: productRows } = await pool.query(
        'SELECT id, name, description, labor_hours FROM products WHERE id = $1',
        [input.input_product_id]
      );

      return {
        quantity: input.quantity,
        inputProduct: productRows[0],
      };
    }
  }
};
