const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: '',
  database: 'socialRents',
  password: 'admin',
  port: 5432
})

client.connect();
module.exports = client;