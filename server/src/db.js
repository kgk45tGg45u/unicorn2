import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'unicorn_user',
  host: 'localhost',
  database: 'unicorn_db',
  password: 'strongpassword',
  port: 5432,
});

export default pool;
