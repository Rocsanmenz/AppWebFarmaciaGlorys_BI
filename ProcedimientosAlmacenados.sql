 USE farmaciaglorys;
 
 /*Creación de procedimientos almacenados*/
 /*Procedimientos almacenados de la tabla Empleado--------------------------------------------------*/
 /*Procedimiento almacenado para insertar un nuevo registro*/
 DELIMITER $
 CREATE PROCEDURE InsertarEmpleado (IN NombreUsuario VARCHAR(20), IN Contraseña VARCHAR(8), IN Rol VARCHAR(20),
 IN Correo NVARCHAR(30), IN Telefono VARCHAR(8))
 BEGIN
 INSERT INTO usuario (NombreUsuario, Contraseña, Rol)
 VALUES (NombreUsuario, Contraseña, Rol);
 
 INSERT INTO empleado (IDUsuario, Correo, Telefono)
 VALUES (LAST_INSERT_ID(), Correo, Telefono);
 END $
 
 CALL InsertarEmpleado ( 'Heysel', '123H', 'Vendedor', 'heysel@gmail.com', '86962747');
 
 /*Procedimiento almacenado para actualizar un registro de la tabla Empleado*/
 DELIMITER $
 CREATE PROCEDURE ActualizarEmpleado (IN IDUsuario INT ,IN NombreUsuario VARCHAR(20), IN Contraseña VARCHAR(8),
 IN Correo NVARCHAR(30), IN Telefono VARCHAR(8))
 BEGIN
 UPDATE usuario
 SET NombreUsuario = NombreUsuario, Contraseña = Contraseña
 WHERE IDUsuario = IDUsuario;
 
 UPDATE empleado
 SET Correo = Correo, Telefono = Telefono
 WHERE IDUsuario = IDUsuario;
 END $
 
CALL ActualizarEmpleado (1, 'Flor', '123', 'florcita02@gmail,com', '23546756');
 
 /*Procedimiento almacenado para eliminar un registro de la tabla Empleado*/
 DELIMITER $
 CREATE PROCEDURE EliminarEmpleado (IN IDUsuario INT)
 BEGIN
 DELETE FROM empleado 
 WHERE IDUsuario = IDUsuario;
 DELETE FROM usuario
 WHERE IDUsuario = IDUsuario;
 END $
 
 CALL EliminarEmpleado (1);
 
 /*Procedimiento almacenado para mostrar los registro de la tabla Empleado*/
 DELIMITER $
 CREATE PROCEDURE MostrarEmpleado()
 BEGIN
 SELECT U.IDUsuario, U.NombreUsuario, U.Contraseña, U.Rol, E.Correo, E.Telefono
 FROM usuario U
 INNER JOIN empleado E ON U.IDUsuario = E.IDUsuario;
 END $
 
 CALL MostrarEmpleado;
 
 /*Procedimientos almacenados de la tabla Cliente---------------------------------------------------*/
 /*Procedimiento almacenado para insertar un nuevo registro*/
DELIMITER $
 CREATE PROCEDURE InsertarCliente (IN NombreUsuario VARCHAR(20), IN Contraseña VARCHAR(8), IN Rol VARCHAR(20),
 IN CorreoC NVARCHAR(30), IN TelefonoC VARCHAR(8))
 BEGIN
 INSERT INTO usuario (NombreUsuario, Contraseña, Rol)
 VALUES (NombreUsuario, Contraseña, Rol);
 
 INSERT INTO cliente (IDUsuario, CorreoC, TelefonoC)
 VALUES (LAST_INSERT_ID(), CorreoC, TelefonoC);
 END $
  
  CALL InsertarCliente ('María', 'my456', 'Cliente', 'mariaS@gmail.com', '88569875');
  
  /*Procedimiento almacenado para actualizar un registro de la tabla Cliente*/
DELIMITER $
 CREATE PROCEDURE ActualizarCliente (IN IDUsuario INT ,IN NombreUsuario VARCHAR(20), IN Contraseña VARCHAR(8),
 IN CorreoC NVARCHAR(30), IN TelefonoC VARCHAR(8))
 BEGIN
 UPDATE usuario
 SET NombreUsuario = NombreUsuario, Contraseña = Contraseña
 WHERE IDUsuario = IDUsuario;
 
 UPDATE cliente
 SET CorreoC = CorreoC, TelefonoC = TelefonoC
 WHERE IDUsuario = IDUsuario;
 END $
  
  CALL ActualizarCliente (2, 'julio', '43267J', 'julito23@gmail.com', '43568790');
  
  /*Procedimiento almacenado para eliminar un registro de la tabla Cliente*/
DELIMITER $
 CREATE PROCEDURE EliminarCliente (IN IDUsuario INT)
 BEGIN
 DELETE FROM cliente 
 WHERE IDUsuario = IDUsuario;
 DELETE FROM usuario
 WHERE IDUsuario = IDUsuario;
 END $
 
 CALL EliminarCliente (1);

 /*Procedimiento almacenado para mostrar los registro de la tabla Cliente*/
DELIMITER $
 CREATE PROCEDURE MostrarCliente()
 BEGIN
 SELECT U.IDUsuario, U.NombreUsuario, U.Contraseña, U.Rol, C.CorreoC, C.TelefonoC
 FROM usuario U
 INNER JOIN cliente C ON U.IDUsuario = C.IDUsuario;
 END $
 
 CALL MostrarCliente;
  
  /*Procedimientos almacenados de la tabla Marca----------------------------------------------------*/
  /*Procedimiento almacenado para insertar un nuevo registro*/
  DELIMITER $
  CREATE PROCEDURE InsertarMarca (IN NombreMarca VARCHAR(20))
  BEGIN
  INSERT INTO marca (NombreMarca)
  VALUES (NombreMarca);
  END $
  
  CALL InsertarMarca ('RAMOS');
  
  /*Procedimiento almacenado para actualizar un registro de la tabla Marca*/
  DELIMITER $
  CREATE PROCEDURE ActualizarMarca (IN IDMarca INT ,IN NombreMarca VARCHAR(20))
  BEGIN
  UPDATE marca
  SET NombreMarca = NombreMarca
  WHERE IDMarca = IDMarca;
  END $ 
  
  CALL ActualizarMarca (1, 'PASHA S.A');
  
  /*Procedimiento almacenado para eliminar un registro de la tabla Marca*/
 DELIMITER $
 CREATE PROCEDURE EliminarMarca (IN IDMarca INT)
 BEGIN
 DELETE FROM marca
 WHERE IDMarca = IDMarca;
 END $
 
 CALL EliminarMarca (1);
 
 /*Procedimiento almacenado para mostrar los registro de la tabla Marca*/
 DELIMITER $
 CREATE PROCEDURE MostrarMarca()
 BEGIN
 SELECT IDMarca, NombreMarca
 FROM marca;
 END $
 
 CALL MostrarMarca;
 
  /*Procedimientos almacenados de la tabla Categoría------------------------------------------------*/
  /*Procedimiento almacenado para insertar un nuevo registro*/
  DELIMITER $
  CREATE PROCEDURE InsertarCategoria (IN NombreCategoria VARCHAR(20))
  BEGIN
  INSERT INTO categoria (NombreCategoria)
  VALUES (NombreCategoria);
  END $
  CALL InsertarCategoria ('Analgésicos');
  
  /*Procedimiento almacenado para actualizar un registro de la tabla Categoría*/
  DELIMITER $
  CREATE PROCEDURE ActualizarCategoria (IN IDCategoria INT ,IN NombreCategoria VARCHAR(20))
  BEGIN
  UPDATE categoria
  SET NombreCategoria = NombreCategoria
  WHERE IDCategoria = IDCategoria;
  END $ 
  
  CALL ActualizarCategoria (1, 'Biológico');

  /*Procedimiento almacenado para eliminar un registro de la tabla Categoria*/
 DELIMITER $
 CREATE PROCEDURE EliminarCategoria (IN IDCategoria INT)
 BEGIN
 DELETE FROM categoria
 WHERE IDCategoria = IDCategoria;
 END $
 
 CALL EliminarCategoria (1);
 
 /*Procedimiento almacenado para mostrar los registro de la tabla Categoria*/
 DELIMITER $
 CREATE PROCEDURE MostrarCategoria()
 BEGIN
 SELECT IDCategoria, NombreCategoria
 FROM categoria;
 END $
 
 CALL MostrarCategoria;
  
  /*Procedimientos almacenados de la tabla Presentación---------------------------------------------*/
  /*Procedimiento almacenado para insertar un nuevo registro*/
  DELIMITER $
  CREATE PROCEDURE InsertarPresentacion (IN NombrePresentacion VARCHAR(20))
  BEGIN
  INSERT INTO presentacion (NombrePresentacion)
  VALUES (NombrePresentacion);
  END $
  
  CALL InsertarPresentacion ('Tableta');
  
  /*Procedimiento almacenado para actualizar un registro de la tabla Presentación*/
  DELIMITER $
  CREATE PROCEDURE ActualizarPresentacion (IN IDPresentacion INT ,IN NombrePresentacion VARCHAR(20))
  BEGIN
  UPDATE presentacion
  SET NombrePresentacion = NombrePresentacion
  WHERE IDPresentacion = IDPresentacion;
  END $
  
  CALL ActualizarPresentacion (1, 'Jarabe');
  
  /*Procedimiento almacenado para eliminar un registro de la tabla Presentacion*/
 DELIMITER $
 CREATE PROCEDURE EliminarPresentacion (IN IDPresentacion INT)
 BEGIN
 DELETE FROM presentacion
 WHERE IDPresentacion = IDPresentacion;
 END $
 
 CALL EliminarPresentacion(1);
 
 /*Procedimiento almacenado para mostrar los registro de la tabla Presentación*/
 DELIMITER $
 CREATE PROCEDURE MostrarPresentacion()
 BEGIN
 SELECT IDPresentacion, NombrePresentacion
 FROM presentacion;
 END $
 
 CALL MostrarPresentacion;
  
  /*Procedimientos almacenados de la tabla Producto-------------------------------------------------*/
  /*Procedimiento almacenado para insertar un nuevo registro*/
  DELIMITER $
  CREATE PROCEDURE InsertarProducto (IN NomProducto VARCHAR(30), IN DescripProducto VARCHAR(100),
  IN PrecioProducto DECIMAL(8,2), Estado VARCHAR(10), IN CantProducto INT, IN IDMarca INT,
  IN IDCategoria INT, IN IDPresentacion INT)
  BEGIN
  INSERT INTO producto (NomProducto, DescripProducto, PrecioProducto, Estado, CantProducto, IDMarca, IDCategoria, IDPresentacion)
  VALUES (NomProducto, DescripProducto, PrecioProducto, Estado, CantProducto, IDMarca, IDCategoria, IDPresentacion);
  END $
  
  CALL InsertarProducto ('Ambroxol', 'Producto sabor a banana', 45.50, 'DISPONIBLE', 68, 1, 1, 1);
  
  /*Procedimiento almacenado para actualizar un registro de la tabla Producto*/
  DELIMITER $
  CREATE PROCEDURE ActualizarProducto (IN IDProducto INT ,IN NomProducto VARCHAR(30), IN DescripProducto VARCHAR(100),
  IN PrecioProducto DECIMAL(8,2), Estado VARCHAR(10), IN CantProducto INT, IN IDMarca INT,
  IN IDCategoria INT, IN IDPresentacion INT)
  BEGIN
  UPDATE Producto
  SET NomProducto = NomProducto, DescripProducto = DescripProducto, PrecioProducto = PrecioProducto, Estado = Estado,
  CantProducto = CantProducto, IDMarca = IDMarca, IDCategoria = IDCategoria, IDPresentacion = IDPresentacion
  WHERE IDProducto = IDProducto;
  END $
  
    CALL ActualizarProducto ('Loratadina', 'Producto para el dolor', 55.45, 'DISPONIBLE', 500, 1, 1, 1);
  
  /*Procedimiento almacenado para eliminar un registro de la tabla Producto*/
 DELIMITER $
 CREATE PROCEDURE EliminarProducto (IN IDProducto INT)
 BEGIN
 DELETE FROM producto
 WHERE IDProducto = IDProducto;
 END $
 
 CALL EliminarProducto(1);
  
  /*Procedimiento almacenado para mostrar los registro de la tabla Producto*/
 DELIMITER $
 CREATE PROCEDURE MostrarProducto()
 BEGIN
 SELECT IDProducto, NomProducto, DescripProducto, PrecioProducto, Estado, CantProducto, imagen, NombreMarca, NombreCategoria, NombrePresentacion
 FROM producto AS prod
 INNER JOIN marca AS mrc
 ON prod.IDMarca = mrc.IDMarca
 INNER JOIN categoria AS cat
 ON prod.IDCategoria = cat.IDCategoria
 INNER JOIN presentacion AS pre
 ON prod.IDPresentacion = pre.IDPresentacion;
 END $

 CALL MostrarProducto;
  
  /*Procedimientos almacenados de la tabla Servicio-------------------------------------------------*/
  /*Procedimiento almacenado para insertar un nuevo registro*/
  DELIMITER $
  CREATE PROCEDURE InsertarServicio (IN NombreS VARCHAR(30), IN EstadoS VARCHAR(30),
  IN Descripcion VARCHAR(100), IN PrecioS DECIMAL(8,2))
  BEGIN
  INSERT INTO servicio (NombreS, EstadoS, Descripcion, PrecioS)
  VALUES (NombreS, EstadoS, Descripcion, PrecioS);
  END $
  
  CALL InsertarServicio ('Ultrasonido de mama', 'DISPONIBLE', 'Aprovecha oferta ahora', 350);
  
  /*Procedimiento almacenado para actualizar un registro de la tabla Servicio*/
  DELIMITER $
  CREATE PROCEDURE ActualizarServicio (IN IDServicio INT ,IN NombreS VARCHAR(30), IN EstadoS VARCHAR(30),
  IN Descripcion VARCHAR(100), IN PrecioS DECIMAL(8,2))
  BEGIN
  UPDATE servicio
  SET NombreS = NombreS, EstadoS = EstadoS, Descripcion = Descripcion, PrecioS = PrecioS
  WHERE IDServicio = IDServicio;
  END $
  
   CALL ActualizarServicio (1, 'Consulta Médica', 'EN ESPERA', 'Aprovecha oferta ahora mismo, agenta tu cita ya', 500);
  
  /*Procedimiento almacenado para eliminar un registro de la tabla Servicio*/
 DELIMITER $
 CREATE PROCEDURE EliminarServicio (IN IDServicio INT)
 BEGIN
 DELETE FROM servicio
 WHERE IDServicio = IDServicio;
 END $
 
 CALL EliminarServicio(1);
 
  /*Procedimiento almacenado para mostrar los registro de la tabla Servicio*/
 DELIMITER $
 CREATE PROCEDURE MostrarServicio()
 BEGIN
 SELECT IDServicio, NombreS, EstadoS, Descripcion, PrecioS
 FROM servicio;
 END $
 
 CALL MostrarServicio;
  
  /*Procedimientos almacenados de la tabla ServicioCliente------------------------------------------*/
  /*Procedimiento almacenado para insertar un nuevo registro*/
  DELIMITER $
  CREATE PROCEDURE InsertarServicioCliente (IN IDCliente INT, IN IDServicio INT,
  IN FechaCita DATE)
  BEGIN
  INSERT INTO serviciocliente (IDCliente, IDServicio, FechaCita)
  VALUES (IDCliente, IDServicio, FechaCita);
  END $
  
  CALL InsertarServicioCliente(1, 1, '2023-12-10');
  
  /*Procedimiento almacenado para actualizar un registro de la tabla ServicioCliente*/
  DELIMITER $
  CREATE PROCEDURE ActualizarServicioCliente (IN IDServicioCliente INT ,IN IDCliente INT, IN IDServicio INT,
  IN FechaCita DATE)
  BEGIN 
  UPDATE serviciocliente
  SET IDCliente = IDCliente, IDServico = IDServicio, FechaCita = FechaCita
  WHERE IDServicioCliente = IDServicioCliente;
  END $
  
  CALL InsertarServicioCliente(1, 1, 1, '2024-01-20');
  
  /*Procedimiento almacenado para eliminar un registro de la tabla ServicioCliente*/
 DELIMITER $
 CREATE PROCEDURE EliminarServicioCliente (IN IDServicioCliente INT)
 BEGIN
 DELETE FROM serviciocliente
 WHERE IDServicioCliente = IDServicioCliente;
 END $
 
 CALL EliminarServicioCliente(1);
  
   /*Procedimiento almacenado para mostrar los registro de la tabla ServicioCliente*/
 DELIMITER $
 CREATE PROCEDURE MostrarServicioCliente()
 BEGIN
 SELECT IDServicioCliente, NombreUsuarioC, NombreS, FechaSolicitud, FechaCita
 FROM serviciocliente AS serc
 INNER JOIN cliente AS cli
 ON serc.IDCliente = cli.IDCliente
 INNER JOIN servicio AS ser
 ON serc.IDServicio = ser.IDServicio;
 END $
 
 CALL MostrarServicioCliente;
  
  /*Procedimientos almacenados de la tabla Pago-----------------------------------------------------*/
  /*Procedimiento almacenado para insertar un nuevo registro*/
  DELIMITER $
  CREATE PROCEDURE InsertarPago (IN TotalPago DECIMAL(8,2))
  BEGIN
  INSERT INTO pago (TotalPago)
  VALUES (TotalPago);
  END $
  
  CALL InsertarPago(200);
  
  /*Procedimiento almacenado para actualizar un registro de la tabla Pago*/
  DELIMITER $
  CREATE PROCEDURE ActualizarPago (IN IDPago INT ,IN TotalPago DECIMAL(8,2))
  BEGIN
  UPDATE pago
  SET TotalPago = TotalPago
  WHERE IDPago = IDPago;
  END $
  
  CALL ActualizarPago(1, 500);
  
  /*Procedimiento almacenado para eliminar un registro de la tabla Pago*/
 DELIMITER $
 CREATE PROCEDURE EliminarPago (IN IDPago INT)
 BEGIN
 DELETE FROM pago
 WHERE IDPago = IDPago;
 END $
 
 CALL EliminarPago(1);
  
   /*Procedimiento almacenado para mostrar los registro de la tabla Pago*/
 DELIMITER $
 CREATE PROCEDURE MostrarPago()
 BEGIN
 SELECT IDPago, FechaHoraPago, TotalPago
 FROM pago;
 END $
 
 CALL MostrarPago;
  
  /*Procedimientos almacenados de la tabla Compra---------------------------------------------------*/
  /*Procedimiento almacenado para insertar un nuevo registro*/
  DELIMITER $
 CREATE PROCEDURE InsertarCompra (IN TotalPago DECIMAL(8,2), IN IDEmpleado INT, IN IDCliente INT, IN DirecCompra VARCHAR(100),
 IN IDPago INT, IN IDProducto INT, IN CantProductos INT)
 BEGIN
 INSERT INTO compra (IDPago, IDEmpleado, IDCliente, DirecCompra)
 VALUES (IDPago, IDEmpleado, IDCliente, DirecCompra);
 
 INSERT INTO compraproducto (IDCompra, IDProducto, CantProductos)
 VALUES (LAST_INSERT_ID(), IDProducto, CantProductos);
 END $
  
  CALL InsertarCompra (1, 1, 1, 'Frente al complejo judicial', 1, 1, 3);
  
  /*Procedimiento almacenado para actualizar un registro de la tabla Compra*/
 DELIMITER $
 CREATE PROCEDURE ActualizarCompra (IN IDCompra INT ,IN IDEmpleado INT, EstadoC VARCHAR(20))
 BEGIN
 UPDATE compra
 SET IDEmpleado = IDEmpleado, EstadoC = EstadoC
 WHERE IDCompra = IDCompra;
 END $
  
CALL ActualizarCompra(1, 1, 'ENTREGADA');
  
  /*Procedimiento almacenado para eliminar un registro de la tabla Compra*/
DELIMITER $
 CREATE PROCEDURE EliminarCompra (IN IDCompra INT)
 BEGIN
 DELETE FROM compra 
 WHERE IDCompra = IDCompra;
 DELETE FROM compra
 WHERE IDCompra = IDCompra;
 END $
 
 CALL EliminarCompra(1);

  