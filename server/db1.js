const { Client } = require('pg')

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'todoapp',
  user: 'postgres',
  password: 'admin'
})

client.connect((err) => {
  if (err) {
     console.error('error', err)
  } else {
    console.log('connected')
  }
})

module.exports = client