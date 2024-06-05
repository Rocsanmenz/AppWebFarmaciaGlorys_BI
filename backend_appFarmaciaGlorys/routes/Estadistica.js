const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get('/ventasporanio', (req, res) => {

    const sql = `SELECT 
    Anyo, 
    SUM(Total) AS Ventas_totales
FROM 
    H_Ventas
JOIN 
    Dim_Tiempo ON H_Ventas.IDTiempo = Dim_Tiempo.IDTiempo
GROUP BY 
    Anyo;
    `;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/ventaspormes2024', (req, res) => {

    const sql = `SELECT 
    Mes, 
    SUM(Total) AS Ventas_totales
FROM 
    H_Ventas
JOIN 
    Dim_Tiempo ON H_Ventas.IDTiempo = Dim_Tiempo.IDTiempo
WHERE 
    Anyo = 2024
GROUP BY 
    Mes;`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas por mes' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/ventastotal', (req, res) => {

    const sql = `SELECT 
    Dia, 
    SUM(Total) AS Ventas_totales
FROM 
    H_Ventas
JOIN 
    Dim_Tiempo ON H_Ventas.IDTiempo = Dim_Tiempo.IDTiempo
WHERE 
    Anyo = 2024 AND Mes = 5
GROUP BY 
    Dia;
`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas totales' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/ventasportrimestre', (req, res) => {

    const sql = `SELECT 
    Trimestre, 
    SUM(Total) AS Ventas_totales
FROM 
    H_Ventas
JOIN 
    Dim_Tiempo ON H_Ventas.IDTiempo = Dim_Tiempo.IDTiempo
GROUP BY 
    Trimestre;`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas por trimestre' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/ventasporcategoria', (req, res) => {

    const sql = `SELECT 
    p.NombreCategoria,
    SUM(hv.Total) AS Ventas_Totales
FROM 
    H_Ventas hv
JOIN 
    Dim_Producto p ON hv.IDProducto = p.IDProducto
GROUP BY 
    p.NombreCategoria
ORDER BY 
    Ventas_Totales DESC;`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas por categoria' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/ventaspromedio', (req, res) => {

    const sql = `SELECT 
    p.NomProducto,
    AVG(hv.Total) AS Promedio_Ventas
FROM 
    H_Ventas hv
JOIN 
    Dim_Producto p ON hv.IDProducto = p.IDProducto
GROUP BY 
    p.NomProducto
ORDER BY 
    Promedio_Ventas DESC;`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas pormedio' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/top5porcantidad', (req, res) => {

    const sql = `SELECT 
    p.NomProducto,
    SUM(hv.CantProductos) AS Cantidad_Total_Vendida
FROM 
    H_Ventas hv
JOIN 
    Dim_Producto p ON hv.IDProducto = p.IDProducto
GROUP BY 
    p.NomProducto
ORDER BY 
    Cantidad_Total_Vendida DESC
LIMIT 5;
`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas por mes' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/ventasporempleado', (req, res) => {

    const sql = `SELECT 
    E.NombreUsuario AS NombreEmpleado,
    SUM(HV.Total) AS VentasTotales
FROM 
    H_VENTAS HV
JOIN 
    DIM_EMPLEADO E ON HV.IDEmpleado = E.IDEmpleado
GROUP BY 
    E.NombreUsuario;;`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas por empleado' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/empleadoporsemana', (req, res) => {

    const sql = ` SELECT 
    E.NombreUsuario AS NombreEmpleado,
    T.Semana,
    SUM(HV.Total) AS VentasTotales
FROM 
    H_VENTAS HV
JOIN 
    DIM_EMPLEADO E ON HV.IDEmpleado = E.IDEmpleado
JOIN 
    DIM_TIEMPO T ON HV.IDTiempo = T.IDTiempo
GROUP BY 
    E.NombreUsuario, T.Semana;`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas por mes' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/empleadoportrimestre', (req, res) => {

    const sql = `SELECT 
    E.NombreUsuario AS NombreEmpleado,
    T.Trimestre,
    SUM(HV.Total) AS VentasTotales
FROM 
    H_VENTAS HV
JOIN 
    DIM_EMPLEADO E ON HV.IDEmpleado = E.IDEmpleado
JOIN 
    DIM_TIEMPO T ON HV.IDTiempo = T.IDTiempo
GROUP BY 
    E.NombreUsuario, T.Trimestre; 
`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas por mes' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/empleadototalventas', (req, res) => {

    const sql = `SELECT 
    E.NombreUsuario AS NombreEmpleado,
    T.Fecha,
    SUM(HV.Total) AS VentasTotales
FROM 
    H_VENTAS HV
JOIN 
    DIM_EMPLEADO E ON HV.IDEmpleado = E.IDEmpleado
JOIN 
    DIM_TIEMPO T ON HV.IDTiempo = T.IDTiempo
GROUP BY 
    E.NombreUsuario, T.Fecha;
`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas por mes' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });
  
  router.get('/ventasporusuario', (req, res) => {

    const sql = `SELECT
    c.NombreUsuario,
    SUM(v.Total) AS TotalVentas
FROM
    H_VENTAS v
JOIN
    DIM_CLIENTE c ON v.IDCliente = c.IDCliente
JOIN
    DIM_TIEMPO t ON v.IDTiempo = t.IDTiempo
WHERE
    t.Anyo = '2024'
GROUP BY
    c.NombreUsuario;
`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas por mes' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/ventasporprocedencia', (req, res) => {

    const sql = `SELECT
    c.Procedencia,
    SUM(v.Total) AS TotalVentas
FROM
    H_VENTAS v
JOIN
    DIM_CLIENTE c ON v.IDCliente = c.IDCliente
GROUP BY
    c.Procedencia;`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas por mes' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  return router;
};

