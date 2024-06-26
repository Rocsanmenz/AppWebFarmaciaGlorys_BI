const express = require('express');
const router = express.Router();

module.exports = (db) => {
  
  // Ruta para verificar las credenciales y obtener el rol del usuario
  router.post('/login', (req, res) => {
    const { NombreUsuario, Contraseña } = req.body;

    if (!NombreUsuario || !Contraseña) {
      return res.status(400).json({ error: 'Nombre de usuario y contraseña son obligatorios' });
    }

    // Realizar la consulta para verificar las credenciales en la base de datos
    const sql = `SELECT Rol FROM usuario WHERE NombreUsuario = ? AND Contraseña = ?`;
    db.query(sql, [NombreUsuario, Contraseña], (err, result) => {
      if (err) {
        console.error('Error al verificar credenciales:', err);
        return res.status(500).json({ error: 'Error al verificar credenciales' });
      }

      if (result.length === 1) {
        const { Rol } = result[0];
        res.json({ Rol }); // Devolver el rol si las credenciales son correctas
      } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
      }
    });
  });
  

  // Ruta para leer registros
  //Ruta para leer la tabla Marca de la Base de Datos--------------------------------
  router.get('/readMarca', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'SELECT * FROM marca';

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla marca' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  //Sentencia 
  //curl http://localhost:5000/crud/readMarca
  //--------------------------------------------------------------------------------------

  router.post('/createMarca', (req, res) => {
    const { NombreMarca } = req.body;
  
    if (!NombreMarca) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    // Consulta SQL para verificar si ya existe una marca con el mismo nombre
    const checkSql = 'SELECT COUNT(*) AS count FROM marca WHERE NombreMarca = ?';
    const checkValues = [NombreMarca];
  
    db.query(checkSql, checkValues, (err, result) => {
      if (err) {
        console.error('Error al verificar la existencia de la marca:', err);
        return res.status(500).json({ error: 'Error al verificar la existencia de la marca' });
      }
  
      const count = result[0].count;
  
      if (count > 0) {
        // Ya existe una marca con el mismo nombre
        return res.status(400).json({ error: 'Ya existe una marca con este nombre' });
      }
  
      // Si no existe, procedemos a insertar la nueva marca
      const insertSql = 'INSERT INTO marca (NombreMarca) VALUES (?)';
      const insertValues = [NombreMarca];
  
      db.query(insertSql, insertValues, (err, result) => {
        if (err) {
          console.error('Error al insertar un registro en la tabla marca:', err);
          return res.status(500).json({ error: 'Error al insertar un registro en la tabla marca' });
        }
  
        res.status(200).json({ message: 'Registro agregado exitosamente' });
      });
    });
  });
  

  //Sentencia
  //curl -X POST -H "Content-Type: application/json" -d "{\"NombreMarca\":\"RAMOS\"}" http://localhost:5000/crud/createMarca
  //----------------------------------------------------------------------------------------

  // Ruta para actualizar un registro existente por ID en la tabla Marca--------------------
  router.put('/updateMarca/:IDMarca', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const IDMarca = req.params.IDMarca;

    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { NombreMarca } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!NombreMarca) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para actualizar el registro por ID
    const sql = `
      UPDATE marca
      SET NombreMarca = ?
      WHERE IDMarca = ?
    `;

    const values = [NombreMarca, IDMarca];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro de la tabla marca:', err);
        res.status(500).json({ error: 'Error al actualizar el registro de la tabla marca' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro actualizado exitosamente' });
      }
    });
  });

  //Sentencia
  //curl -X PUT -H "Content-Type: application/json" -d "{\"NombreMarca\":\"PASHA S.A\"}" http://localhost:5000/crud/updateMarca/1
  //-------------------------------------------------------------------------------------

  // Ruta para eliminar un registro existente por ID en la tabla Marca-------------------
  router.delete('/deleteMarca/:idMarca', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const idMarca = req.params.idMarca;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM marca WHERE IDMarca = ?';

    // Ejecuta la consulta
    db.query(sql, [idMarca], (err, result) => {
      if (err) {
        console.error('Error al eliminar un registro de la tabla marca:', err);
        res.status(500).json({ error: 'Error al eliminar un registro de la tabla ' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado exitosamente' });
      }
    });
  });

  //Sentencia
  //curl -X DELETE http://localhost:5000/crud/deleteMarca/2
  //---------------------------------------------------------------------------------------

  // Ruta para leer registros
  //Ruta para leer la tabla Presentación de la Base de Datos--------------------------------
  router.get('/readPresentacion', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'SELECT * FROM presentacion';

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer los registros de la tabla presentación:', err);
        res.status(500).json({ error: 'Error al leer los registros de la tabla presentación' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  //Sentencia
  //curl http://localhost:5000/crud/readPresentacion
  //--------------------------------------------------------------------------------------

  // Ruta para crear un nuevo registro con ID específico en la tabla Presentación------------
  router.post('/createPresentacion', (req, res) => {
    const { NombrePresentacion } = req.body;
  
    if (!NombrePresentacion) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    // Consulta SQL para verificar si ya existe una presentación con el mismo nombre
    const checkSql = 'SELECT COUNT(*) AS count FROM presentacion WHERE NombrePresentacion = ?';
    const checkValues = [NombrePresentacion];
  
    db.query(checkSql, checkValues, (err, result) => {
      if (err) {
        console.error('Error al verificar la existencia de la presetación:', err);
        return res.status(500).json({ error: 'Error al verificar la existencia de la presentación' });
      }
  
      const count = result[0].count;
  
      if (count > 0) {
        // Ya existe una presentación con el mismo nombre
        return res.status(400).json({ error: 'Ya existe una presentación con este nombre' });
      }
  
      // Si no existe, procedemos a insertar la nueva presentación
      const insertSql = 'INSERT INTO presentacion (NombrePresentacion) VALUES (?)';
      const insertValues = [NombrePresentacion];
  
      db.query(insertSql, insertValues, (err, result) => {
        if (err) {
          console.error('Error al insertar un registro en la tabla presentación:', err);
          return res.status(500).json({ error: 'Error al insertar un registro en la tabla presentación' });
        }
  
        res.status(200).json({ message: 'Registro agregado exitosamente' });
      });
    });
  });
  //Sentencia
  //curl -X POST -H "Content-Type: application/json" -d "{\"NombrePresentacion\":\"Tableta\"}" http://localhost:5000/crud/createPresentacion
  //----------------------------------------------------------------------------------------

  // Ruta para actualizar un registro existente por ID en la tabla Presentación--------------
  router.put('/updatePresentacion/:IDPresentacion', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const IDPresentacion = req.params.IDPresentacion;

    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { NombrePresentacion } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!NombrePresentacion) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para actualizar el registro por ID
    const sql = `
      UPDATE presentacion
      SET NombrePresentacion = ?
      WHERE IDPresentacion = ?
    `;

    const values = [NombrePresentacion, IDPresentacion];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar un registro de la tabla presentacion:', err);
        res.status(500).json({ error: 'Error al actualizar un registro de la tabla presentacion' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro actualizado exitosamente' });
      }
    });
  });

  //Sentencia
  //curl -X PUT -H "Content-Type: application/json" -d "{\"NombrePresentacion\":\"Crema\"}" http://localhost:5000/crud/updatePresentacion/1
  //-------------------------------------------------------------------------------------

  // Ruta para eliminar un registro existente por ID en la tabla Presentación-------------------
  router.delete('/deletePresentacion/:idPresentacion', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const idPresentacion = req.params.idPresentacion;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM presentacion WHERE IDPresentacion = ?';

    // Ejecuta la consulta
    db.query(sql, [idPresentacion], (err, result) => {
      if (err) {
        console.error('Error al eliminar un registro de la tabla presentación:', err);
        res.status(500).json({ error: 'Error al eliminar un registro de la tabla presentación' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado exitosamente' });
      }
    });
  });

  //Sentencia
  //curl -X DELETE http://localhost:5000/crud/deletePresentacion/1
  //---------------------------------------------------------------------------------------

  // Ruta para leer registros
  //Ruta para leer la tabla Cliente de la Base de Datos--------------------------------
  router.get('/readCliente', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'select  IDCliente, NombreUsuario from cliente inner join usuario on cliente.IDUsuario = usuario.IDUsuario';

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer los registros de la tabla cliente:', err);
        res.status(500).json({ error: 'Error al leer los registros de la tabla cliente' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });
  
  //Sentencia
  //curl http://localhost:5000/crud/readCliente
  //--------------------------------------------------------------------------------------

  // Ruta para crear un nuevo registro con ID específico en la tabla Cliente------------
  router.post('/createCliente', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const {
        NombreUsuario,
        Contraseña,
        Rol,
        CorreoC,
        TelefonoC,
    } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!NombreUsuario || !Contraseña || !Rol || !CorreoC || !TelefonoC) {
        return res.status(400).json({ error: 'Los campos "NombreUsuario", "Contraseña", "Rol", "Correo" y "Telefono" son obligatorios' });
    }

    // Realiza la consulta SQL para insertar un nuevo registro en la tabla "Usuario"
    const usuarioSql = `
        INSERT INTO usuario (NombreUsuario, Contraseña, Rol)
        VALUES (?, ?, ?)
    `;
    const usuarioValues = [NombreUsuario, Contraseña, Rol];

    // Ejecuta la consulta para insertar en la tabla "Persona"
    db.query(usuarioSql, usuarioValues, (err, usuarioResult) => {
        if (err) {
            console.error('Error al insertar registro de Usuario:', err);
            res.status(500).json({ error: 'Error al insertar registro de Usuario' });
        } else {
            const IDUsuario = usuarioResult.insertId; // Obtenemos el IDUsuario recién insertado

            // Realiza la consulta SQL para insertar un nuevo registro de cliente
            const clienteSql = `INSERT INTO cliente (IDUsuario, CorreoC, TelefonoC)
                VALUES (?, ?, ?)
            `;
            const clienteValues = [IDUsuario, CorreoC, TelefonoC];

            // Ejecuta la consulta para insertar en la tabla "Cliente"
            db.query(clienteSql, clienteValues, (err, clienteResult) => {
                if (err) {
                    console.error('Error al insertar registro de cliente:', err);
                    res.status(500).json({ error: 'Error al insertar registro de cliente' });
                } else {
                    // Devuelve el ID del nuevo registro de Empleado como respuesta
                    res.status(201).json({ IDCliente: clienteResult.insertId });
                }
            });
        }
    });
});

  //Sentencia
  //curl -X POST -H "Content-Type: application/json" -d "{\"NombreUsuarioC\":\"Joy\",\"ContraseñaC\":\"123joy\",\"CorreoC\":\"joyssicruz5@gmail.com\",\"TelefonoC\":\"86962747\"}" http://localhost:5000/crud/createCliente
  //----------------------------------------------------------------------------------------

  // Ruta para actualizar un registro existente por ID en la tabla Cliente--------------
  router.put('/updateCliente/:IDCliente', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const IDCliente = req.params.IDCliente;

    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { NombreUsuario, Contraseña, CorreoC, TelefonoC } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!NombreUsuario || !Contraseña || !CorreoC || !TelefonoC) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para actualizar el registro por ID
    const sql = `
      UPDATE cliente
      SET NombreUsuario = ?, Contraseña = ?, CorreoC = ?, TelefonoC = ?
      WHERE IDCliente = ?
    `;

    const values = [NombreUsuario, Contraseña, CorreoC, TelefonoC, IDCliente];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar un registro de la tabla cliente:', err);
        res.status(500).json({ error: 'Error al actualizar un registro de la tabla cliente' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro actualizado exitosamente' });
      }
    });
  });
  
  //Sentencia
  //curl -X PUT -H "Content-Type: application/json" -d "{\"NombreUsuarioC\":\"Elieth\",\"ContraseñaC\":\"elieth12\",\"CorreoC\":\"izaduartes2214@gmail.com\",\"TelefonoC\":\"57736281\"}" http://localhost:5000/crud/updateCliente/1
  //-------------------------------------------------------------------------------------

  // Ruta para eliminar un registro existente por ID en la tabla Cliente-------------------
  router.delete('/deleteCliente/:idCliente', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const idCliente = req.params.idCliente;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM cliente WHERE IDCliente = ?';

    // Ejecuta la consulta
    db.query(sql, [idCliente], (err, result) => {
      if (err) {
        console.error('Error al eliminar un registro de la tabla cliente:', err);
        res.status(500).json({ error: 'Error al eliminar un registro de la tabla cliente' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado exitosamente' });
      }
    });
  });

  //Sentencia
  //curl -X DELETE http://localhost:5000/crud/deleteCliente/1
  //---------------------------------------------------------------------------------------

  // Ruta para leer registros
  //Ruta para leer la tabla Empleado de la Base de Datos--------------------------------
  router.get('/readEmpleado', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'select  IDEmpleado, NombreUsuario from empleado inner join usuario on empleado.IDUsuario = usuario.IDUsuario';

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer los registros de la tabla empleado:', err);
        res.status(500).json({ error: 'Error al leer los registros de la tabla empleado' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  //Sentencia
  //curl http://localhost:5000/crud/readEmpleado
  //--------------------------------------------------------------------------------------

  // Ruta para crear un nuevo registro con ID específico en la tabla Empleado------------
  router.post('/createEmpleado', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const {
        NombreUsuario,
        Contraseña,
        Rol,
        Correo,
        Telefono,
    } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!NombreUsuario || !Contraseña || !Rol || !Correo || !Telefono) {
        return res.status(400).json({ error: 'Los campos "NombreUsuario", "Contraseña", "Rol", "Correo" y "Telefono" son obligatorios' });
    }

    // Realiza la consulta SQL para insertar un nuevo registro en la tabla "Usuario"
    const usuarioSql = `
        INSERT INTO usuario (NombreUsuario, Contraseña, Rol)
        VALUES (?, ?, ?)
    `;
    const usuarioValues = [NombreUsuario, Contraseña, Rol];

    // Ejecuta la consulta para insertar en la tabla "Persona"
    db.query(usuarioSql, usuarioValues, (err, usuarioResult) => {
        if (err) {
            console.error('Error al insertar registro de Usuario:', err);
            res.status(500).json({ error: 'Error al insertar registro de Usuario' });
        } else {
            const IDUsuario = usuarioResult.insertId; // Obtenemos el IDUsuario recién insertado

            // Realiza la consulta SQL para insertar un nuevo registro de Empleado
            const empleadoSql = `INSERT INTO empleado (IDUsuario, Correo, Telefono)
                VALUES (?, ?, ?)
            `;
            const empleadoValues = [IDUsuario, Correo, Telefono];

            // Ejecuta la consulta para insertar en la tabla "Empleado"
            db.query(empleadoSql, empleadoValues, (err, empleadoResult) => {
                if (err) {
                    console.error('Error al insertar registro de Empleado:', err);
                    res.status(500).json({ error: 'Error al insertar registro de Empleado' });
                } else {
                    // Devuelve el ID del nuevo registro de Empleado como respuesta
                    res.status(201).json({ IDEmpleado: empleadoResult.insertId });
                }
            });
        }
    });
});

  //Sentencia
  //curl -X POST -H "Content-Type: application/json" -d "{\"NombreUsuario\":\"Flor\",\"Contraseña\":\"5423F\",\"Rol\":\"Administrador\",\"Correo\":\"flor123@gmail.com\",\"Telefono\":\"57395726\"}" http://localhost:5000/crud/createEmpleado
  //----------------------------------------------------------------------------------------

  // Ruta para actualizar un registro existente por ID en la tabla Empleado--------------
  router.put('/updateEmpleado/:IDEmpleado', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const IDEmpleado = req.params.IDEmpleado;

    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { NombreUsuario, Contraseña, Correo, Telefono } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!NombreUsuario || !Contraseña || !Correo || !Telefono) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para actualizar el registro por ID
    const sql = `
      UPDATE empleado
      SET NombreUsuario = ?, Contraseña = ?, Correo = ?, Telefono = ?
      WHERE IDEmpleado = ?
    `;

    const values = [NombreUsuario, Contraseña, Correo, Telefono, IDEmpleado];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar un registro de la tabla empleado:', err);
        res.status(500).json({ error: 'Error al actualizar un registro de la tabla empleado' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro actualizado exitosamente' });
      }
    });
  });

  //Sentencia
  //curl -X PUT -H "Content-Type: application/json" -d "{\"NombreUsuario\":\"Heysel\",\"Contraseña\":\"muchi345\",\"Correo\":\"heyselsmith@gmail.com\",\"Telefono\":\"87673073\"}" http://localhost:5000/crud/updateEmpleado/1
  //-------------------------------------------------------------------------------------

  // Ruta para eliminar un registro existente por ID en la tabla Empleado-------------------
  router.delete('/deleteEmpleado/:idEmpleado', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const idEmpleado = req.params.idEmpleado;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM empleado WHERE IDEmpleado = ?';

    // Ejecuta la consulta
    db.query(sql, [idEmpleado], (err, result) => {
      if (err) {
        console.error('Error al eliminar un registro de la tabla empleado:', err);
        res.status(500).json({ error: 'Error al eliminar un registro de la tabla empleado' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado exitosamente' });
      }
    });
  });

  //Sentencia
  //curl -X DELETE http://localhost:5000/crud/deleteEmpleado/1
  //---------------------------------------------------------------------------------------

  // Ruta para leer registros
  // Ruta para leer la tabla Producto de la Base de Datos, empleando sentencias SQL
  router.get('/readProducto', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'SELECT * FROM producto';

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer los registros de la tabla producto:', err);
        res.status(500).json({ error: 'Error al leer los registros de la tabla producto' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });


  //Sentencia
  //curl http://localhost:5000/crud/readProducto
  //--------------------------------------------------------------------------------------

  // Ruta para crear un nuevo registro con ID específico en la tabla Producto------------
  router.post('/createProducto', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const {NomProducto, DescripProducto, PrecioProducto, PrecioCompra, Estado, CantProducto, imagen, IDMarca, IDCategoria, IDPresentacion } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!NomProducto || !DescripProducto || !PrecioProducto || !PrecioCompra || !Estado || !CantProducto || !imagen || !IDMarca || !IDCategoria || !IDPresentacion) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para insertar un nuevo registro con ID específico
    const sql = `INSERT INTO producto (NomProducto, DescripProducto, PrecioProducto, PrecioCompra, Estado, CantProducto, imagen, IDMarca, IDCategoria, IDPresentacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [NomProducto, DescripProducto, PrecioProducto, PrecioCompra, Estado, CantProducto, imagen, IDMarca, IDCategoria, IDPresentacion];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar un registro en la tabla producto:', err);
        res.status(500).json({ error: 'Error al insertar un registro en la tabla producto' });
      } else {
        // Devuelve un mensaje como respuesta
        res.status(200).json({ message: 'Registro agregado exitosamente' });
      }
    });
  });

  //Sentencia
  //curl -X POST -H "Content-Type: application/json" -d "{\"NomProducto\":\"Ambroxol\",\"DescripProducto\":\"Producto sabor a banana\",\"PrecioProducto\":40.5,\"Estado\":\"DISPONIBLE\",\"CantProducto\":500,\"IDMarca\":1,\"IDCategoria\":1,\"IDPresentacion\":1}" http://localhost:5000/crud/createProducto
  //----------------------------------------------------------------------------------------

  // Ruta para actualizar un registro existente por ID en la tabla Producto--------------
  router.put('/updateProducto/:IDProducto', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const IDProducto = req.params.IDProducto;

    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { NomProducto, DescripProducto, PrecioProducto, PrecioCompra, Estado, CantProducto, imagen, IDMarca, IDCategoria, IDPresentacion } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!NomProducto || !DescripProducto || !PrecioProducto || !PrecioCompra || !Estado || !CantProducto || !imagen || !IDMarca || !IDCategoria || !IDPresentacion) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para actualizar el registro por ID
    const sql = `
      UPDATE producto
      SET NomProducto = ?, DescripProducto = ?, PrecioProducto = ?, PrecioCompra = ?, Estado = ?, CantProducto = ?, imagen = ?, IDMarca = ?, IDCategoria = ?, IDPresentacion = ?
      WHERE IDProducto = ?
    `;

    const values = [NomProducto, DescripProducto, PrecioProducto, PrecioCompra, Estado, CantProducto, imagen, IDMarca, IDCategoria, IDPresentacion, IDProducto];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar un registro de la tabla producto:', err);
        res.status(500).json({ error: 'Error al actualizar un registro de la tabla producto' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro actualizado exitosamente' });
      }
    });
  });

  //Sentencia
  //curl -X PUT -H "Content-Type: application/json" -d "{\"NomProducto\":\"Loratadina\",\"DescripProducto\":\"Producto para la alergia\",\"PrecioProducto\":5.5,\"Estado\":\"AGOTADO\",\"CantProducto\":50,\"IDMarca\":1,\"IDCategoria\":1,\"IDPresentacion\":1}" http://localhost:5000/crud/updateProducto/1
  //-------------------------------------------------------------------------------------

  // Ruta para eliminar un registro existente por ID en la tabla Producto-------------------
  router.delete('/deleteProducto/:idProducto', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const idProducto = req.params.idProducto;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM producto WHERE IDProducto = ?';

    // Ejecuta la consulta
    db.query(sql, [idProducto], (err, result) => {
      if (err) {
        console.error('Error al eliminar un registro de la tabla producto:', err);
        res.status(500).json({ error: 'Error al eliminar un registro de la tabla producto' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado exitosamente' });
      }
    });
  });

  //Sentencia
  //curl -X DELETE http://localhost:5000/crud/deleteProducto/1
  //---------------------------------------------------------------------------------------

  // Ruta para leer registros
  //Ruta para leer la tabla Servicio de la Base de Datos--------------------------------
  router.get('/readServicio', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'SELECT * FROM servicio';

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer los registros de la tabla servicio:', err);
        res.status(500).json({ error: 'Error al leer los registros de la tabla servicio' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  //Sentencia
  //curl http://localhost:5000/crud/readServicio
  //--------------------------------------------------------------------------------------

  // Ruta para crear un nuevo registro con ID específico en la tabla Servicio------------
  router.post('/createServicio', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const {NombreS, EstadoS, Descripcion, PrecioS, imagen } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!NombreS || !EstadoS || !Descripcion || !PrecioS || !imagen) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para insertar un nuevo registro con ID específico
    const sql = `INSERT INTO  servicio (NombreS, EstadoS, Descripcion, PrecioS, imagen) VALUES (?, ?, ?, ?, ?)`;
    const values = [NombreS, EstadoS, Descripcion, PrecioS, imagen];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar un registro en la tabla servicio:', err);
        res.status(500).json({ error: 'Error al insertar un registro en la tabla servicio' });
      } else {
        // Devuelve un mensaje como respuesta
        res.status(200).json({ message: 'Registro agregado exitosamente' });
      }
    });
  });

  //Sentencia
  //curl -X POST -H "Content-Type: application/json" -d "{\"NombreS\":\"Ultrasonidos\",\"EstadoS\":\"DISPONIBLE\",\"Descripcion\":\"Aprovecha la oferta ya, agenda tu cita ahora mismo\"}"  http://localhost:5000/crud/createServicio
  //----------------------------------------------------------------------------------------

  // Ruta para actualizar un registro existente por ID en la tabla Servicio--------------
  router.put('/updateServicio/:IDServicio', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const IDServicio = req.params.IDServicio;

    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { NombreS, EstadoS, Descripcion, PrecioS, imagen } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!NombreS || !EstadoS || !Descripcion || !PrecioS || !imagen) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para actualizar el registro por ID
    const sql = `
      UPDATE servicio
      SET NombreS = ?, EstadoS = ?, Descripcion = ?, PrecioS = ?, imagen = ?
      WHERE IDServicio = ?
    `;

    const values = [NombreS, EstadoS, Descripcion, PrecioS, imagen, IDServicio];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar un registro de la tabla servicio:', err);
        res.status(500).json({ error: 'Error al actualizar un registro de la tabla servicio' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro actualizado exitosamente' });
      }
    });
  });

  //Sentencia
  //curl -X PUT -H "Content-Type: application/json" -d "{\"nombreS\":\"Consulta médica\",\"estadoS\":\"EN ESPERA\",\"descripcion\":\"Consultas médicas gratis, agenda tu cita ahora mismo\"}" http://localhost:5000/crud/updateServicio/1
  //-------------------------------------------------------------------------------------

  // Ruta para eliminar un registro existente por ID en la tabla Servicio-------------------
  router.delete('/deleteServicio/:idServicio', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const idServicio = req.params.idServicio;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM servicio WHERE IDServicio = ?';

    // Ejecuta la consulta
    db.query(sql, [idServicio], (err, result) => {
      if (err) {
        console.error('Error al eliminar un registro de la tabla servicio:', err);
        res.status(500).json({ error: 'Error al eliminar un registro de la tabla servicio' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado exitosamente' });
      }
    });
  });

  //Sentencia
  //curl -X DELETE http://localhost:5000/crud/deleteServicio/1
  //---------------------------------------------------------------------------------------

  // Ruta para leer registros
  //Ruta para leer la tabla ServicioCliente de la Base de Datos--------------------------------
  router.get('/readServicioCliente', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'SELECT * FROM serviciocliente';

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer los registros de la tabla servicio_cliente:', err);
        res.status(500).json({ error: 'Error al leer los registros de la tabla servicio_cliente' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  //Sentencia
  //curl http://localhost:5000/crud/readServicioCliente
  //--------------------------------------------------------------------------------------

  // Ruta para crear un nuevo registro con ID específico en la tabla ServicioCliente------------
  router.post('/createServicioCliente', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const {idCliente, idServicio,fechaCita } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!idCliente || !idServicio || !fechaCita) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para insertar un nuevo registro con ID específico
    const sql = `INSERT INTO serviciocliente (IDCliente, IDServicio, FechaCita) VALUES (?, ?, ?)`;
    const values = [idCliente, idServicio, fechaCita];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar un registro en la tabla servicio_cliente:', err);
        res.status(500).json({ error: 'Error al insertar un registro en la tabla servicio_cliente' });
      } else {
        // Devuelve un mensaje como respuesta
        res.status(201).json({ message: 'Registro agregado exitosamente' });
      }
    });
  });

  //Sentencia
  //curl -X POST -H "Content-Type: application/json" -d "{\"idCliente\":1,\"idServicio\":1,\"fechaCita\":\"2023-09-13 08:50:00\"}" http://localhost:5000/crud/createServicioCliente
  //----------------------------------------------------------------------------------------

  // Ruta para actualizar un registro existente por ID en la tabla ServicioCliente--------------
  router.put('/updateServicioCliente/:idServicioCliente', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const idServicioCliente = req.params.idServicioCliente;

    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { idCliente, idServicio, fechaCita } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!idCliente || !idServicio || !fechaCita) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para actualizar el registro por ID
    const sql = `
      UPDATE serviciocliente
      SET IDCliente = ?, IDServicio = ?, FechaCita = ?
      WHERE IDServicioCliente = ?
    `;

    const values = [idCliente, idServicio, fechaCita, idServicioCliente];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar un registro de la tabla servicio_cliente:', err);
        res.status(500).json({ error: 'Error al actualizar un registro de la tabla servicio_cliente' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro actualizado exitosamente' });
      }
    });
  });

  //Sentencia
  //curl -X PUT -H "Content-Type: application/json" -d "{\"idCliente\":1,\"idServicio\":1,\"fechaCita\":\"2023-10-15 01:30:00\"}" http://localhost:5000/crud/updateServicioCliente/1
  //-------------------------------------------------------------------------------------

  // Ruta para eliminar un registro existente por ID en la tabla ServicioCliente-------------------
  router.delete('/deleteServicioCliente/:idServicioCliente', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const idServicioCliente = req.params.idServicioCliente;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM serviciocliente WHERE IDServicioCliente = ?';

    // Ejecuta la consulta
    db.query(sql, [idServicioCliente], (err, result) => {
      if (err) {
        console.error('Error al eliminar un registro de la tabla servicio_cliente:', err);
        res.status(500).json({ error: 'Error al eliminar un registro de la tabla servicio_cliente' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado exitosamente' });
      }
    });
  });

  //Sentencia
  //curl -X DELETE http://localhost:5000/crud/deleteServicioCliente/1
  //---------------------------------------------------------------------------------------


  router.get('/readCompra', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para seleccionar todos los registros
    const sql = `SELECT detallecompra.IDCompraProducto, usuario.NombreUsuario, compra.FechaHoraCompra, producto.NomProducto, marca.NombreMarca,
    presentacion.NombrePresentacion, detallecompra.PrecioProducto, detallecompra.CantProductos, detallecompra.TipoEntrega,
    compra.EstadoC
    from compra 
    inner join cliente
    on compra.IDCliente = cliente.IDCliente
    inner join usuario 
    on usuario.IDUsuario = cliente.IDUsuario
    inner join detallecompra
    on detallecompra.IDCompra = compra.IDCompra
    inner join producto
    on detallecompra.IDProducto = producto.IDProducto
    inner join marca
    on producto.IDMarca = marca.IDMarca
    inner join presentacion
    on producto.IDPresentacion = presentacion.IDPresentacion`;
    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer los registros de la tabla compra:', err);
        res.status(500).json({ error: 'Error al leer los registros de la tabla compra' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });


  router.post('/Createcompra', (req, res) => {
    const { EstadoC, detalle , IDCliente, IDEmpleado, DirecCompra, TipoEntrega} = req.body;
    const FechaHoraCompra = new Date();
  
      // Insertar la compra
      const sqlCompra = 'INSERT INTO compra ( FechaHoraCompra, EstadoC, IDCliente, IDEmpleado, DirecCompra) VALUES (?, ?, ?, ?, ?)';
      db.query(sqlCompra, [FechaHoraCompra, EstadoC, IDCliente, IDEmpleado, DirecCompra], (err, result) => {
        if (err) {
          console.error('Error al insertar compra:', err);
          return res.status(500).json({ error: 'Error al insertar compra' });
        }
  
          const IDCompra = result.insertId;
  
          // Insertar el detalle de compra
          const sqlDetalle = 'INSERT INTO detallecompra (CantProductos, PrecioProducto, IDProducto, TipoEntrega, IDCompra) VALUES ?';
          const values = detalle.map((item) => [item.CantProductos, item.PrecioProducto, item.IDProducto, TipoEntrega, IDCompra]);
          db.query(sqlDetalle, [values], (err, result) => {
            if (err) {
              console.error('Error al insertar detalle de compra:', err);
              return res.status(500).json({ error: 'Error al insertar detalle de compra' });
            }
    
            // Devolver respuesta exitosa
            res.status(201).json({ message: 'Compra y detalle de venta agregados con éxito' });
          });
        });
      });

   // Ruta para leer registros
  //Ruta para leer la tabla Categoria de la Base de Datos--------------------------------
  router.get('/readCategoria', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'SELECT * FROM categoria';

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla categoria' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  //Sentencia
  //curl http://localhost:5000/crud/readCategoria
  //--------------------------------------------------------------------------------------

  // Ruta para crear un nuevo registro con ID específico en la tabla Categoria------------
  router.post('/createCategoria', (req, res) => {
    const { NombreCategoria } = req.body;
  
    if (!NombreCategoria) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    // Consulta SQL para verificar si ya existe una categoría con el mismo nombre
    const checkSql = 'SELECT COUNT(*) AS count FROM categoria WHERE NombreCategoria = ?';
    const checkValues = [NombreCategoria];
  
    db.query(checkSql, checkValues, (err, result) => {
      if (err) {
        console.error('Error al verificar la existencia de la categoria:', err);
        return res.status(500).json({ error: 'Error al verificar la existencia de la categoria' });
      }
  
      const count = result[0].count;
  
      if (count > 0) {
        // Ya existe una categoria con el mismo nombre
        return res.status(400).json({ error: 'Ya existe una categoría con este nombre' });
      }
  
      // Si no existe, procedemos a insertar la nueva categoria
      const insertSql = 'INSERT INTO categoria (NombreCategoria) VALUES (?)';
      const insertValues = [NombreCategoria];
  
      db.query(insertSql, insertValues, (err, result) => {
        if (err) {
          console.error('Error al insertar un registro en la tabla categoría:', err);
          return res.status(500).json({ error: 'Error al insertar un registro en la tabla categoría' });
        }
  
        res.status(200).json({ message: 'Registro agregado exitosamente' });
      });
    });
  });
  
  //Sentencia
  //curl -X POST -H "Content-Type: application/json" -d "{\"NombreCategoria\":\"Fitofármaco\"}" http://localhost:5000/crud/createCategoria
  //----------------------------------------------------------------------------------------

    // Ruta para actualizar un registro existente por ID en la tabla Categoria--------------
    router.put('/updateCategoria/:IDCategoria', (req, res) => {
      // Obtén el ID del registro a actualizar desde los parámetros de la URL
      const IDCategoria = req.params.IDCategoria;
  
      // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
      const { NombreCategoria } = req.body;
  
      // Verifica si se proporcionaron los datos necesarios
      if (!NombreCategoria) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
  
      // Realiza la consulta SQL para actualizar el registro por ID
      const sql = `
        UPDATE categoria
        SET NombreCategoria = ?
        WHERE IDCategoria = ?
      `;
  
      const values = [NombreCategoria, IDCategoria];
  
      // Ejecuta la consulta
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error al actualizar el registro de la tabla categoria:', err);
          res.status(500).json({ error: 'Error al actualizar el registro de la tabla categoria' });
        } else {
          // Devuelve un mensaje de éxito
          res.status(200).json({ message: 'Registro actualizado exitosamente' });
        }
      });
    });
    
  //Sentencia
  //curl -X PUT -H "Content-Type: application/json" -d "{\"NombreCategoria\":\"Biológico\"}" http://localhost:5000/crud/updateCategoria/1
  //-------------------------------------------------------------------------------------


  router.delete('/deleteCategoria/:idCategoria', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const idCategoria = req.params.idCategoria;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM categoria WHERE IDCategoria = ?';

    // Ejecuta la consulta
    db.query(sql, [idCategoria], (err, result) => {
      if (err) {
        console.error('Error al eliminar un registro de la tabla categoria:', err);
        res.status(500).json({ error: 'Error al eliminar un registro de la tabla ' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado exitosamente' });
      }
    });
  });
  //Sentencia
  //curl -X DELETE http://localhost:5000/crud/deleteCategoria/1
  //---------------------------------------------------------------------------------------

  //Nuevo gráfico
  //Sentencia 
  //Ruta para obtener datos estadísticas de la tabla producto por categoría
  router.get('/productosPorCategoria', (req, res) => {
    const sql = `
    SELECT  
      Categoria.NombreCategoria, 
      COUNT(Producto.IDProducto) AS CantidadProductos
    FROM 
        Producto
       INNER JOIN
         Categoria ON Producto.IDCategoria = Categoria.IDCategoria
    GROUP BY  
        Categoria.IDCategoria
    `;

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener la cantidad de productos por categoría:', err);
        res.status(500).json({ error: 'Error al obtener la cantidad de productos por categoría' });
      } else {
        res.status(200).json(result);
      }
    });
  });


  return router;
};


