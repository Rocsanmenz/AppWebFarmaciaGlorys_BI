const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(express.json({limit: '50mb'}));

app.use((err, req, res, next)=> {
    if(err instanceof SyntaxError && 'body' in err) {
        res.status(400).send({error: 'Error en el análisis de JSON'});
    }else{
        next();
    }
});

app.use(express.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'dev1',
    password: 'dev1pass',
    database: 'farmaciaglorys'
});

db.connect((err) => {
    if(err) {
        console.error('Error de conexión a la base de datos;', err);
    }else{
        console.log('Conexión existosa a la base de datos');
    }
});

    // Configuración de CORS
    app.use(cors());

    // Importar y usar rutas CRUD
    const crudRoutes = require('./routes/crudRoutes')(db); // Pasa la instancia de la base de datos a crudRoutes
    app.use('/crud', crudRoutes);

    // Iniciar el servidor
    app.listen(port, () => {
        console.log(`Servidor backend en funcionamiento en el puerto ${port}`);
    });

    //Revision en proceso.
    //Estas rutas estan completas.


