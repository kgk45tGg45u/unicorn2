import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db.js';
import { requireAuth } from '../utils/auth.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

export const authResolvers = {
  Query: {
    me: async (_, __, { user }) => {
      requireAuth(user);  // Ensure user is authenticated

      const { rows } = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [user.id]);
      return rows[0];
    },
  },

  Mutation: {
    register: async (_, { name, email, password, tokens }) => {
      const password_hash = await bcrypt.hash(password, 10);
      const { rows } = await pool.query(
        'INSERT INTO users (name, email, password_hash, tokens) VALUES ($1, $2, $3, $4) RETURNING id, name, email, tokens',
        [name, email, password_hash, tokens]
      );
      const user = rows[0];
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
      return { token, user };
    },

    login: async (_, { email, password }) => {
      const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = rows[0];
      if (!user) throw new Error('No user found with this email');
      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) throw new Error('Incorrect password');
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          tokens: user.tokens
        },
      };
    },
  },
};
