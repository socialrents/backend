const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: '',
  database: 'socialrents',
  password: 'admin',
  port: 5432
})

client.connect();

module.exports = client;