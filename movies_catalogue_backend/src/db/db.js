const mysql = require('mysql2/promise');
require('dotenv').config();

async function getConnection () {
    try {
      const conn = await mysql.createConnection({
        host: process.env['HOST'],
        port: 3306,
        user: process.env['USER'],
        password: process.env['PASS'],
        database: process.env['DB']
      });
  
      await conn.connect();
  
      return conn;
    }
    catch(error) {
      console.log(error);
      
      return null;
    }
}

module.exports = getConnection;