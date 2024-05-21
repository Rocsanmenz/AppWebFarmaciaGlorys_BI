USE farmaciaglorys;

-- Registros de Marcas
INSERT INTO marca (NombreMarca)
VALUES ('NORDIC'),
('BAYER'),
('RAMOS'),
('HENIE'),
('UNIMARK'),
('GROSSMAN'),
('BIOPHARMA'),
('PIERSAN'),
('SIMETICONA'),
('UNIPHARM'),
('NEVADA'),
('ABBOT'),
('CAPLIN POINT');

-- Registros de Categorías
INSERT INTO categoria (NombreCategoria)
VALUES ('Fitofármaco'),
('Biológico'),
('Analgésicos'),
('Antiinflamatorios'),
('Antialérgicos');

-- Registros de Presentaciones
INSERT INTO presentacion (NombrePresentacion)
VALUES ('Tableta'),
('Jarabe'),
('Crema Topica'),
('SPRAY BUCAL'),
('Jabon Facial'),
('Ampollas'),
('Gotas'),
('Shampoo'),
('Solución');

-- Registros de productos
INSERT INTO producto (NomProducto, DescripProducto, PrecioProducto, Estado, CantProducto, IDMarca, IDCategoria, IDPresentacion)
VALUES ('Ambroxol', 'Mucolitico, Expectorante', 72.89, 'DISPONIBLE', 45, 1, 2, 2),
('Loratadina', 'Reduce la alergia', 3.50, 'DISPONIBLE', 506, 3, 1, 1),
('Baytalcid', 'Alivia la acidez estomacal', 4.00, 'DISPONIBLE', 200, 2, 1, 1),
('Bebesan', 'Contiene Zinc y Titanio', 105.00, 'DISPONIBLE', 23, 3, 2, 3),
('Beclogen Trio', 'Alivia las manifestaciones inflamatorias de las dermatosis', 160.00,'DISPONIBLE', 38, 4, 2, 3),
('Beclometasona', 'Congestión nasal, rinitis alérgica, asma bronquial, sibilancia y falta de aliento', 210.00, 'DISPONIBLE', 50, 5, 2, 4),
('Bedoyecta Tri', 'Prevención y tratamiento del déficit de vitaminas', 100.00, 'DISPONIBLE', 34, 6, 1, 1),
('Acnefin', 'Tratar el acné y reducir la apariencia de líneas finas y manchas en la piel', 692.31, 'DISPONIBLE', 20, 7, 2, 5),
('Actimicina Bronquial', 'Tratar los síntomas de la bronquitis', 2.50, 'DISPONIBLE', 600, 3, 1, 1),
('Actimicina Gripe y Tos', 'Tratamiento Antigripal', 3.75, 'DISPONIBLE', 300, 3, 1, 1),
('Ademar Adulto', 'Prevención y tratamiento del resfriado común', 25.00, 'DISPONIBLE', 59, 8, 1, 1),
('Ademar C Infantil', 'Refuerzas las defensas, fortaleciendo el sistema imunologico', 25.00, 'DISPONIBLE', 66, 8, 1, 1),
('Aero-Om', 'Elimina gases que causan cólicos y molestias estomacales', 140.32, 'DISPONIBLE', 43, 9, 2, 7),
('Dipronova', 'Trata trastornos que responden a corticosteroides', 490.00, 'DISPONIBLE', 35, 10, 2, 1),
('Disney Shampoo Toy Store', 'Mejora el cuero cabelludo de tu hijo', 150.00, 'DISPONIBLE', 26, 11, 2, 8),
('Diuremide', 'Urticaria provocada por una reacción alérgica a la comida o algún irritante', 1.50, 'DISPONIBLE', 709, 3, 1, 1),
('Divina', 'Anticonceptivos orales combinados (AOC) actúan mediante la supresión de las gonadotrofinas', 1.00, 'DISPONIBLE', 780, 3, 1, 1),
('Dixi35', 'Anticonceptivo oral', 335.00, 'DISPONIBLE', 46, 12, 1, 1),
('Prenatales', 'Multivitaminas con minerales', 3.50, 'DISPONIBLE', 500, 13, 1, 1),
('Yodopovidona', 'Elimina bacterias, hongos, virus u otros microorganismos que puedan entrar en la piel o en una herida', 58.05, 'DISPONIBLE', 30, 5, 2, 9);

-- Registros de clientes
INSERT INTO usuario (NombreUsuario, Contraseña, Rol)
VALUES ('Esmeralda Ruíz', '280912S', 'Cliente');
SET @IDUsuario = LAST_INSERT_ID();
INSERT INTO cliente (CorreoC, TelefonoC, Procedencia, IDUsuario)
VALUES ('esmeraldita603@gmail.com', '88962742', 'Juigalpa', @IDUsuario);

INSERT INTO usuario (NombreUsuario, Contraseña, Rol)
VALUES ('Alfonso López', 'alfon12', 'Cliente');
SET @IDUsuario = LAST_INSERT_ID();
INSERT INTO cliente (CorreoC, TelefonoC, Procedencia, IDUsuario)
VALUES ('lopezalfonso@gmail.com', '57395726', 'Juigalpa', @IDUsuario);

INSERT INTO usuario (NombreUsuario, Contraseña, Rol)
VALUES ('Suleymari', 'sulimay6', 'Cliente');
SET @IDUsuario = LAST_INSERT_ID();
INSERT INTO cliente (CorreoC, TelefonoC, Procedencia, IDUsuario)
VALUES ('hellokitty@gmail.com', '87264542', 'Juigalpa', @IDUsuario);

INSERT INTO usuario (NombreUsuario, Contraseña, Rol)
VALUES ('Alejandra Gaitán', 'ale123', 'Cliente');
SET @IDUsuario = LAST_INSERT_ID();
INSERT INTO cliente (CorreoC, TelefonoC, Procedencia, IDUsuario)
VALUES ('alejandra85@gmail.com', '58631412', 'Juigalpa', @IDUsuario);

INSERT INTO usuario (NombreUsuario, Contraseña, Rol)
VALUES ('Rodolfo López', 'R13Lo', 'Cliente');
SET @IDUsuario = LAST_INSERT_ID();
INSERT INTO cliente (CorreoC, TelefonoC, Procedencia, IDUsuario)
VALUES ('rodolfo09@gmail.com', '57301202', 'Juigalpa', @IDUsuario);

-- Registros de empleados
INSERT INTO usuario (NombreUsuario, Contraseña, Rol)
VALUES ('Yoelka G', 'yoel204', 'Administrador');
SET @IDUsuario = LAST_INSERT_ID();
INSERT INTO empleado (Correo, Telefono, IDUsuario)
VALUES ('farmaciaglorys@gmail.com', '86962747', @IDUsuario);

INSERT INTO usuario (NombreUsuario, Contraseña, Rol)
VALUES ('Smith H', 'Hlei406', 'Vendedor');
SET @IDUsuario = LAST_INSERT_ID();
INSERT INTO empleado (Correo, Telefono, IDUsuario)
VALUES ('smith32@gmail.com', '59362812', @IDUsuario);

-- Registros de ventas
INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, EstadoC)
VALUES (1, 2, '2024-04-28', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (2, @IDCompra, 5, 3.50, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, EstadoC)
VALUES (1, 1, '2024-04-28', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (4, @IDCompra, 1, 105.00, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, EstadoC)
VALUES (2, 4, '2024-04-28', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (20, @IDCompra, 1, 58.05, 'RETIRO EN SUCURSAL'); 

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, EstadoC)
VALUES (2, 3, '2024-04-28', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (10, @IDCompra, 10, 3.75, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, EstadoC)
VALUES (2, 3, '2024-04-28', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (19, @IDCompra, 20, 3.50, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, EstadoC)
VALUES (2, 3, '2024-04-28', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (2, @IDCompra, 6, 3.50, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, EstadoC)
VALUES (2, 3, '2024-04-28', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (3, @IDCompra, 2, 4.00, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, EstadoC)
VALUES (1, 4, '2024-04-29', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (9, @IDCompra, 12, 2.50, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, EstadoC)
VALUES (1, 4, '2024-04-29', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (12, @IDCompra, 1, 25.00, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, EstadoC)
VALUES (1, 1, '2024-04-29', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (9, @IDCompra, 3, 2.50, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, EstadoC)
VALUES (1, 2, '2024-04-29', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (17, @IDCompra, 5, 1.00, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, EstadoC)
VALUES (1, 5, '2024-04-29', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (10, @IDCompra, 20, 3.75, 'RETIRO EN SUCURSAL');

