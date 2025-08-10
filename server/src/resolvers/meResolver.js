import pool from '../db.js';

export const meResolver = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      const { rows } = await pool.query(
        "SELECT id, name, email, tokens FROM users WHERE id = $1",
        [user.id]
      );
      return rows[0];
    },
  },
};
