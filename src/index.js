// IMPORTAR BIBLIOTECAS
const express = require('express');
const cors = require('cors');

const mysql = require('mysql2/promise');

// CONEXIÓN A MYSQL
/* const getConnection = require('./db/db'); */


// CREAR VARIABLES
const app = express();      // server
const port = 4000;

// CONFIGURACIÓN DE EXPRESS
app.use( cors() );
app.use( express.json( {limit: '25mb'} ) );
app.use( express.json() );

// ARRANCAR EL SERVIDOR

app.listen(port, () => {
    console.log(`Servidor iniciado escuchando en http://localhost:${port}`);
  });

// PROGRAMAR ESTÁTICOS
app.get('/', function(req, res){
    res.send(`Se ha iniciado el servidor`);
});

async function getConnection () {
    try {
      const conn = await mysql.createConnection({
        host: 'localhost',      // = 127.0.0.1
        port: 3306,
        user: 'root',
        password: 'secret',
        database: 'bpt-shelter'
      });
  
      await conn.connect();
  
      return conn;
    }
    catch(error) {
      console.log(error);
      
      return null;
    }
}

server.get('/api/pets', async (req, res) => {
    const conn = await getConnection();
    
    if( !conn ) {
      res.status(500).send('Se rompió');
      return;
    }
    
    const [results, columns] = await conn.query('SELECT * FROM pets;');
    
    //const results = arrayDelConnQuery[0];
    
    console.log(results);
    
    res.json(results);
    
    conn.close();
  
  
    
  
    /* res.json([
      {
        id: 1,
        name: "Lolo",
        species: 'Perro',
        breed: "Mastin"
      }
    ]) */
  });
  
  server.post('/api/pets', async (req, res) => {
    
    console.log('Me han hecho un POST');
    
    const conn = await getConnection();
    
    if( !conn ) {
      res.status(500).send('Se rompió');
      return;
    }
    
    const [results, columns] = await conn.execute('INSERT INTO pets () VALUES ()');
    
    //const results = arrayDelConnQuery[0];
    
    console.log(results);
    
    res.json(results);
    
    conn.close();
  
    // Conectar a la bbdd
    // INSERT
    // Responder con success: true
    
  })