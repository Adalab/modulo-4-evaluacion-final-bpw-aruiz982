// IMPORTAR BIBLIOTECAS
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// IMPORTAR MYSQL
const mysql = require('mysql2/promise');

// IMPORTAR AUTH
const bcrypt = require('bcrypt');

// IMPORTAR JWT
const jwt = require('jsonwebtoken');

// CREAR VARIABLES
const app = express();
const port = 4000;

// CONEXIÓN A LA BASE DE DATOS
const getConnection = require('./db/db');

// CONFIGURACIÓN DE EXPRESS
app.use( cors() );
app.use( express.json( {limit: '25mb'} ) );
app.use( express.json() );

// SERVIDOR DE ESTÁTICOS
const staticServerPath = './public';

// ARRANCAR EL SERVIDOR

app.listen(port, () => {
    console.log(`Servidor iniciado escuchando en http://localhost:${port}`);
  });

// PROGRAMAR ESTÁTICOS
app.use(express.static(staticServerPath));

app.get('/api/movies_catalogue', async (req, res) => {
    const conn = await getConnection();
    
    if( !conn ) {
      res.status(500).send('Se rompió');
      return;
    }

/*     const searchTerm = '%' + req.query.search + '%';
    
    const [results] = await conn.query('SELECT * FROM movies_catalogue WHERE name LIKE ?;', [searchTerm]);
 */    
    const [results] = await conn.query('SELECT * FROM movies_catalogue');
        
    res.json(results);
    
    await conn.close();
});

app.post('/api/movies_catalogue', async (req, res) => {
    const conn = await getConnection();
    
    if( !conn ) {
      res.status(500).send('Se rompió');
      return;
    }

    console.log(req.body);
    
    const [results] = await conn.execute(
      `INSERT INTO movies_catalogue (name, year, genre, main_actor, director, awards, length, rating) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [req.body.name, req.body.year, req.body.genre, req.body.main_actor, req.body.director, req.body.awards, req.body.length, req.body.rating]);
    
    //const results = arrayDelConnQuery[0];
        
    if( results.affectedRows === 1 ) {
      res.json({
        success: true
      });
    }
    else {
      // Si no, devuelvo success: false
  
      res.json({
        success: false
      });
    }
    
    await conn.close();
});

app.put('/api/movies_catalogue/:id', async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  

  // Conn a bbdd

  const conn = await getConnection();
  
  if( !conn ) {
    res.status(500).send('Se rompió');
    return;
  }

  // Preparo y ejecuto el UPDATE  -> results

  const [results] = await conn.execute(
    `UPDATE movies_catalogue
      SET name=?, year=?, genre=?, main_actor=?, director=?, awards=?, length=?, rating=?
      WHERE id=?`,
    [req.body.name, req.body.year, req.body.genre, req.body.main_actor, req.body.director, req.body.awards, req.body.length, req.body.rating, req.params.id]
  );

  console.log(results);
  

  // Si ha afectado a 1 fila, devuelvo success: true

  if( results.changedRows === 1 ) {
    res.json({
      success: true
    });
  }
  else {
    // Si no, devuelvo success: false

    res.json({
      success: false
    });
  }

  await conn.close();

});


app.delete('/api/movies_catalogue/:id', async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  

  // Conn a bbdd

  const conn = await getConnection();
  
  if( !conn ) {
    res.status(500).send('Se rompió');
    return;
  }

  // Preparo y ejecuto el UPDATE  -> results

  const [results] = await conn.execute(
    `DELETE FROM movies_catalogue
      WHERE id=?`,
    [req.params.id]
  );

  console.log(results);
  

  // Si ha afectado a 1 fila, devuelvo success: true

  if( results.affectedRows === 1 ) {
    res.json({
      success: true
    });
  }
  else {
    // Si no, devuelvo success: false

    res.json({
      success: false
    });
  }

  await conn.close();
});

//ENDPOINTS PARA EL REGISTRO Y EL LOGEO DE USUARIAS
app.post('/api/registro', async (req, res) => {  
  // Conn a la bbdd

  console.log(req.body);

  const conn = await getConnection();

  // Comprobar si existe la usuaria

  const [resultsExists] = await conn.query(
    'SELECT * FROM users WHERE email = ?',
    [req.body.email]);

  if( resultsExists.length > 0 ) {
    res.status(303).json({
      success: false,
      error: 'El email ya está registrado en la plataforma.'
    })
    return;
  }

  // Ejecutar un INSERT INTO

  const hashPass = await bcrypt.hash(req.body.password, 10);

  console.log(hashPass);

  const [results] = await conn.execute(`
    INSERT INTO users (email, password, nombre)
    VALUES (?, ?, ?)`,
    [req.body.email, hashPass, req.body.nombre] );

  // Comprobar los results
  if( results.affectedRows === 1 ) {
    res.json({
      success: true,
      id: results.insertId
    })
  }
  else {
    res.json({
      success: false,
      error: "No insertado"
    })
  }

  // Cerrar la conn
  await conn.close();
});

app.post('/api/login', async (req, res) => {
  const conn = await getConnection();
  
  if( !conn ) {
    res.status(500).send('Se rompió');
    return;
  }
  
  const [results] = await conn.query(
    `SELECT *
    FROM users
    WHERE email = ?`,
    [req.body.email]);

  if (results.length === 0){
    res.json({
      success: false,
      error: "Credenciales no válidas"
    });
  }
  
  const userFound = results[0];

  if (bcrypt.compareSync(req.body.password, userFound.password)){
    const token = jwt.sign(
      {
        sub: userFound.id,
        name: userFound.nombre,
        role: "viewer"
      },
      "password_del_backend",
      {expiresIn: '1h'}
    );

    res.json({
      success: true,
      token: token,
    });
  } else {
    res.json({
      success: false,
      error: "Credenciales no válidas"
    });
    return;
  }
  
  await conn.close();
});