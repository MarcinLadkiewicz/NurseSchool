const { Pool }= require ('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432
});

pool.query('SELECT 1')
.then(() => console.log('> Conectado a PostgreSQL.'))
.catch(err => console.error('> Error conectado a DB: ', err.message));

module.exports = pool;



