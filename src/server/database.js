const { Pool } = require('pg')
const pool = new Pool({
  user: 'woojaepark',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
})


module.exports = pool;
