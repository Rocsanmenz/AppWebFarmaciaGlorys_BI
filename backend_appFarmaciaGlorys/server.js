const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(express.json({ limit: '50mb' }));

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && 'body' in err) {
        res.status(400).send({ error: 'Error en el análisis de JSON' });
    } else {
        next();
    }
});

app.use(express.json());

// Configuración de la conexión a la primera base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'dev1',
    password: 'dev1pass',
    database: 'farmaciaglorys'
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la primera base de datos:', err);
    } else {
        console.log('Conexión exitosa a la primera base de datos');
    }
});

// Configuración de la conexión a la segunda base de datos
const db2 = mysql.createConnection({
    host: 'localhost',
    user: 'dev1',
    password: 'dev1pass',
    database: 'farmaciaglorys_dm'
});

db2.connect((err) => {
    if (err) {
        console.error('Error de conexión a la segunda base de datos:', err);
    } else {
        console.log('Conexión exitosa a la segunda base de datos');
    }
});

// Configuración de CORS
app.use(cors());

// Importar y usar rutas para la primera base de datos
const crudRoutes = require('./routes/crudRoutes')(db); // Pasa la instancia de la primera base de datos a crudRoutesDb1
app.use('/crud', crudRoutes);

// Importar y usar rutas para la segunda base de datos
const Estadistica = require('./routes/Estadistica')(db2); // Pasa la instancia de la segunda base de datos a crudRoutesDb2
app.use('/Estadistica', Estadistica);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor backend en funcionamiento en el puerto ${port}`);
});