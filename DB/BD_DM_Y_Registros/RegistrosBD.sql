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
INSERT INTO producto (NomProducto, DescripProducto, PrecioProducto, PrecioCompra, Estado, CantProducto, IDMarca, IDCategoria, IDPresentacion)
VALUES ('Ambroxol', 'Mucolitico, Expectorante', 72.89, 64.03,'DISPONIBLE', 45, 1, 2, 2),
('Loratadina', 'Reduce la alergia', 3.50, 440, 'DISPONIBLE', 506, 3, 1, 1),
('Baytalcid', 'Alivia la acidez estomacal', 4.00, 2.50, 'DISPONIBLE', 20, 2, 1, 1),
('Bebesan', 'Contiene Zinc y Titanio', 105.00, 86.04, 'DISPONIBLE', 23, 3, 2, 3),
('Beclogen Trio', 'Alivia las manifestaciones inflamatorias de las dermatosis', 160.00, 120,'DISPONIBLE', 38, 4, 2, 3),
('Beclometasona', 'Congestión nasal, rinitis alérgica, asma bronquial, sibilancia y falta de aliento', 210.00, 197,'DISPONIBLE', 50, 5, 2, 4),
('Bedoyecta Tri', 'Prevención y tratamiento del déficit de vitaminas', 100.00, 73, 'DISPONIBLE', 34, 6, 1, 1),
('Acnefin', 'Tratar el acné y reducir la apariencia de líneas finas y manchas en la piel', 692.31, 625.05,'DISPONIBLE', 20, 7, 2, 5),
('Actimicina Bronquial', 'Tratar los síntomas de la bronquitis', 2.50, 1.00,'DISPONIBLE', 600, 3, 1, 1),
('Actimicina Gripe y Tos', 'Tratamiento Antigripal', 3.75, 1.50, 'DISPONIBLE', 300, 3, 1, 1),
('Ademar Adulto', 'Prevención y tratamiento del resfriado común', 25.00, 14.06, 'DISPONIBLE', 59, 8, 1, 1),
('Ademar C Infantil', 'Refuerzas las defensas, fortaleciendo el sistema imunologico', 25.00, 16,'DISPONIBLE', 66, 8, 1, 1),
('Aero-Om', 'Elimina gases que causan cólicos y molestias estomacales', 140.32, 104.45, 'DISPONIBLE', 43, 9, 2, 7),
('Dipronova', 'Trata trastornos que responden a corticosteroides', 490.00, 402.32,'DISPONIBLE', 35, 10, 2, 1),
('Disney Shampoo Toy Store', 'Mejora el cuero cabelludo de tu hijo', 150.00, 123.02,'DISPONIBLE', 26, 11, 2, 8),
('Diuremide', 'Urticaria provocada por una reacción alérgica a la comida o algún irritante', 1.50, 1.00, 'DISPONIBLE', 709, 3, 1, 1),
('Divina', 'Anticonceptivos orales combinados (AOC) actúan mediante la supresión de las gonadotrofinas', 1.00, 0.5, 'DISPONIBLE', 780, 3, 1, 1),
('Dixi35', 'Anticonceptivo oral', 335.00, 297, 'DISPONIBLE', 46, 12, 1, 1),
('Prenatales', 'Multivitaminas con minerales', 3.50, 1.05, 'DISPONIBLE', 500, 13, 1, 1),
('Yodopovidona', 'Elimina bacterias, hongos, virus u otros microorganismos que puedan entrar en la piel o en una herida', 58.05, 34.06, 'DISPONIBLE', 30, 5, 2, 9);

INSERT INTO producto (NomProducto, DescripProducto, PrecioProducto, PrecioCompra, Estado, CantProducto, IDMarca, IDCategoria, IDPresentacion)
VALUES 
('Paracetamol', 'Alivia el dolor y reduce la fiebre', 5.99, 1.20, 'DISPONIBLE', 300, 2, 1, 1),
('Ibuprofeno', 'Alivia el dolor y reduce la inflamación', 7.50, 3.06, 'DISPONIBLE', 200, 2, 1, 1),
('Amoxicilina', 'Antibiótico de amplio espectro', 9.25, 4.00, 'DISPONIBLE', 150, 2, 1, 1),
('Omeprazol', 'Reduce la producción de ácido en el estómago', 6.75, 2.32, 'DISPONIBLE', 250, 2, 1, 1),
('Cetirizina', 'Trata los síntomas de alergias', 4.50, 2.50, 'DISPONIBLE', 400, 2, 1, 1),
('Diclofenaco', 'Alivia el dolor y reduce la inflamación', 8.00, 3.48, 'DISPONIBLE', 180, 2, 1, 1),
('Pantoprazol', 'Reduce la producción de ácido en el estómago', 7.25, 3.54, 'DISPONIBLE', 220, 2, 1, 1),
('Clotrimazol', 'Antimicótico para infecciones de la piel', 6.50, 2.50, 'DISPONIBLE', 280, 2, 1, 1),
('Lansoprazol', 'Reduce la producción de ácido en el estómago', 8.25, 4.50,'DISPONIBLE', 200, 2, 1, 1),
('Salbutamol', 'Broncodilatador para el asma', 10.50, 6.32, 'DISPONIBLE', 120, 2, 1, 1),
('Metformina', 'Controla los niveles de azúcar en la sangre', 9.99, 4.67, 'DISPONIBLE', 180, 2, 1, 1),
('Simvastatina', 'Reduce el colesterol en la sangre', 11.75, 7.50, 'DISPONIBLE', 150, 2, 1, 1),
('Losartan', 'Controla la presión arterial', 12.50, 8.39, 'DISPONIBLE', 200, 2, 1, 1),
('Levotiroxina', 'Trata problemas de la tiroides', 13.25, 9.12, 'DISPONIBLE', 170, 2, 1, 1),
('Warfarina', 'Anticoagulante', 14.00, 9.99, 'DISPONIBLE', 190, 2, 1, 1),
('Metronidazol', 'Antibiótico para infecciones bacterianas', 8.75, 3.45, 'DISPONIBLE', 220, 2, 1, 1),
('Atorvastatina', 'Reduce el colesterol en la sangre', 11.99, 7.50, 'DISPONIBLE', 160, 2, 1, 1),
('Fluconazol', 'Antimicótico para infecciones por hongos', 7.99, 3.50, 'DISPONIBLE', 250, 2, 1, 1),
('Sildenafil', 'Trata la disfunción eréctil', 15.50, 7.48, 'DISPONIBLE', 100, 2, 1, 1),
('Tadalafilo', 'Trata la disfunción eréctil', 16.75, 8.50, 'DISPONIBLE', 110, 2, 1, 1),
('Finasterida', 'Trata la pérdida de cabello en hombres', 18.25, 13.50,'DISPONIBLE', 90, 2, 1, 1),
('Acetazolamida', 'Trata el glaucoma y la epilepsia', 12.99, 5.45,'DISPONIBLE', 130, 2, 1, 1),
('Alprazolam', 'Trata la ansiedad y los trastornos de pánico', 9.50, 4.99, 'DISPONIBLE', 240, 2, 1, 1),
('Tramadol', 'Alivia el dolor moderado a severo', 10.25, 5.45, 'DISPONIBLE', 210, 2, 1, 1),
('Ondansetrón', 'Trata las náuseas y los vómitos', 8.75, 4.32, 'DISPONIBLE', 230, 2, 1, 1),
('Ciprofloxacino', 'Antibiótico para infecciones bacterianas', 9.99, 5.50, 'DISPONIBLE', 200, 2, 1, 1),
('Dexametasona', 'Corticosteroide para reducir la inflamación', 11.50, 6.57, 'DISPONIBLE', 180, 2, 1, 1),
('Hidroclorotiazida', 'Diurético para tratar la presión arterial alta', 12.25, 6.58, 'DISPONIBLE', 190, 2, 1, 1),
('Diazepam', 'Trata la ansiedad, el alcoholismo y las convulsiones', 9.75, 3.42, 'DISPONIBLE', 220, 2, 1, 1),
('Gabapentina', 'Trata la epilepsia y el dolor neuropático', 11.99, 6.57, 'DISPONIBLE', 170, 2, 1, 1),
('Cefalexina', 'Antibiótico para infecciones bacterianas', 8.99, 4.99, 'DISPONIBLE', 250, 2, 1, 1),
('Amoxicilina/Ácido Clavulánico', 'Antibiótico de amplio espectro', 10.50, 5.60,'DISPONIBLE', 180, 2, 1, 1),
('Naproxeno', 'Alivia el dolor y reduce la inflamación', 7.25, 4.47, 'DISPONIBLE', 260, 2, 1, 1),
('Furosemida', 'Diurético para tratar la presión arterial alta', 8.50, 3.45, 'DISPONIBLE', 240, 2, 1, 1),
('Metoclopramida', 'Trata las náuseas y los vómitos', 6.99, 2.99, 'DISPONIBLE', 280, 2, 1, 1),
('Cetoprofeno', 'Alivia el dolor y reduce la inflamación', 9.25, 4.50, 'DISPONIBLE', 210, 2, 1, 1),
('Clonazepam', 'Trata la epilepsia y los trastornos de pánico', 11.50, 6.32, 'DISPONIBLE', 200, 2, 1, 1),
('Levofloxacino', 'Antibiótico para infecciones bacterianas', 10.99, 4.99, 'DISPONIBLE', 220, 2, 1, 1),
('Ranitidina', 'Reduce la producción de ácido en el estómago', 8.75, 4.25,'DISPONIBLE', 230, 2, 1, 1),
('Ambroxol', 'Mucolitico, Expectorante', 72.89, 52.80, 'DISPONIBLE', 45, 1, 2, 2),
('Loratadina', 'Reduce la alergia', 3.50, 1.99, 'DISPONIBLE', 506, 3, 1, 1),
('Baytalcid', 'Alivia la acidez estomacal', 4.00, 1.59, 'DISPONIBLE', 200, 2, 1, 1),
('Bebesan', 'Contiene Zinc y Titanio', 105.00, 78.99, 'DISPONIBLE', 23, 3, 2, 3),
('Beclogen Trio', 'Alivia las manifestaciones inflamatorias de las dermatosis', 160.00, 126.90,'DISPONIBLE', 38, 4, 2, 3),
('Beclometasona', 'Congestión nasal, rinitis alérgica, asma bronquial, sibilancia y falta de aliento', 210.00, 199.99, 'DISPONIBLE', 50, 5, 2, 4),
('Bedoyecta Tri', 'Prevención y tratamiento del déficit de vitaminas', 100.00, 80.50, 'DISPONIBLE', 34, 6, 1, 1),
('Acnefin', 'Tratar el acné y reducir la apariencia de líneas finas y manchas en la piel', 692.31, 632.50, 'DISPONIBLE', 20, 7, 2, 5),
('Actimicina Bronquial', 'Tratar los síntomas de la bronquitis', 2.50, 1.23, 'DISPONIBLE', 600, 3, 1, 1),
('Actimicina Gripe y Tos', 'Tratamiento Antigripal', 3.75, 1.99, 'DISPONIBLE', 300, 3, 1, 1),
('Ademar Adulto', 'Prevención y tratamiento del resfriado común', 25.00, 18.00, 'DISPONIBLE', 59, 8, 1, 1),
('Ademar C Infantil', 'Refuerzas las defensas, fortaleciendo el sistema imunologico', 25.00, 16.99, 'DISPONIBLE', 66, 8, 1, 1),
('Aero-Om', 'Elimina gases que causan cólicos y molestias estomacales', 140.32, 123.40, 'DISPONIBLE', 43, 9, 2, 7),
('Dipronova', 'Trata trastornos que responden a corticosteroides', 490.00, 435.00, 'DISPONIBLE', 35, 10, 2, 1),
('Disney Shampoo Toy Store', 'Mejora el cuero cabelludo de tu hijo', 150.00, 135.50, 'DISPONIBLE', 26, 11, 2, 8),
('Diuremide', 'Urticaria provocada por una reacción alérgica a la comida o algún irritante', 1.50, 1.00, 'DISPONIBLE', 709, 3, 1, 1),
('Divina', 'Anticonceptivos orales combinados (AOC) actúan mediante la supresión de las gonadotrofinas', 1.00, 0.5, 'DISPONIBLE', 780, 3, 1, 1),
('Dixi35', 'Anticonceptivo oral', 335.00, 301.50, 'DISPONIBLE', 46, 12, 1, 1),
('Prenatales', 'Multivitaminas con minerales', 3.50, 1.32, 'DISPONIBLE', 500, 13, 1, 1),
('Yodopovidona', 'Elimina bacterias, hongos, virus u otros microorganismos que puedan entrar en la piel o en una herida', 58.05, 27.08, 'DISPONIBLE', 30, 5, 2, 9);


-- Registros de clientes
INSERT INTO usuario (NombreUsuario, Contraseña, Rol)
VALUES ('Esmeralda Ruíz', '280912S', 'Cliente');
SET @IDUsuario = LAST_INSERT_ID();
INSERT INTO cliente (CorreoC, TelefonoC, Procedencia, IDUsuario)
VALUES ('esmeraldita603@gmail.com', '88962742', 'La libertad', @IDUsuario);

INSERT INTO usuario (NombreUsuario, Contraseña, Rol)
VALUES ('Alfonso López', 'alfon12', 'Cliente');
SET @IDUsuario = LAST_INSERT_ID();
INSERT INTO cliente (CorreoC, TelefonoC, Procedencia, IDUsuario)
VALUES ('lopezalfonso@gmail.com', '57395726', 'La libertad', @IDUsuario);

INSERT INTO usuario (NombreUsuario, Contraseña, Rol)
VALUES ('Suleymari', 'sulimay6', 'Cliente');
SET @IDUsuario = LAST_INSERT_ID();
INSERT INTO cliente (CorreoC, TelefonoC, Procedencia, IDUsuario)
VALUES ('hellokitty@gmail.com', '87264542', 'Cuapa', @IDUsuario);

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
INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (1, 2, '2024-04-28','Juigalpa', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (2, @IDCompra, 5, 3.50, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (1, 1, '2024-04-28','Juigalpa', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (4, @IDCompra, 1, 105.00, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (2, 4, '2024-04-28','Juigalpa', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (20, @IDCompra, 1, 58.05, 'RETIRO EN SUCURSAL'); 

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (2, 3, '2024-05-06','Juigalpa', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (10, @IDCompra, 10, 3.75, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (2, 3, '2024-04-30','Juigalpa', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (19, @IDCompra, 20, 3.50, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (2, 3, '2024-04-28','Juigalpa', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (2, @IDCompra, 6, 3.50, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (2, 3, '2024-04-28','Juigalpa', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (3, @IDCompra, 2, 4.00, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (1, 4, '2024-04-29','Juigalpa', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (9, @IDCompra, 12, 2.50, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (1, 4, '2024-04-29','Juigalpa', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (12, @IDCompra, 1, 25.00, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (1, 1, '2024-04-29','Juigalpa', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (9, @IDCompra, 3, 2.50, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (1, 2, '2024-04-29','Juigalpa', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (17, @IDCompra, 5, 1.00, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (1, 5, '2024-04-29','Juigalpa', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (10, @IDCompra, 20, 3.75, 'RETIRO EN SUCURSAL');

-- Registros de ventas
INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (2, 4, '2024-05-14', 'Juigalpa', 'EN PROCESO');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (12, @IDCompra, 2, 25.00, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (1, 3, '2024-05-14', 'Juigalpa', 'EN ESPERA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (3, @IDCompra, 5, 4.00, 'ENTREGA A DOMICILIO');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (1, 2, '2024-05-14', 'Juigalpa', 'EN PROCESO');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (10, @IDCompra, 3, 3.75, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (2, 5, '2024-05-14', 'Juigalpa', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (17, @IDCompra, 1, 1.00, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (1, 1, '2024-05-14', 'Juigalpa', 'EN PROCESO');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (9, @IDCompra, 8, 2.50, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (2, 2, '2024-05-14', 'Juigalpa', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (20, @IDCompra, 2, 58.05, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (1, 3, '2024-05-14', 'Juigalpa', 'EN PROCESO');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (4, @IDCompra, 3, 105.00, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (2, 1, '2024-05-14', 'Juigalpa', 'EN ESPERA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (19, @IDCompra, 4, 3.50, 'ENTREGA A DOMICILIO');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (1, 4, '2024-05-14', 'Juigalpa', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (2, @IDCompra, 5, 3.50, 'RETIRO EN SUCURSAL');

-- Registros de ventas
INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (2, 3, '2024-05-15', 'Juigalpa', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (7, @IDCompra, 6, 6.50, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (1, 5, '2024-05-15', 'Juigalpa', 'EN PROCESO');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (5, @IDCompra, 2, 4.50, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (2, 4, '2024-05-15', 'Juigalpa', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (15, @IDCompra, 3, 13.25, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (1, 2, '2024-05-15', 'Juigalpa', 'EN PROCESO');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (16, @IDCompra, 1, 14.00, 'ENTREGA A DOMICILIO');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (1, 1, '2024-05-15', 'Juigalpa', 'EN ESPERA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (13, @IDCompra, 4, 11.75, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (2, 3, '2024-05-15', 'Juigalpa', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (8, @IDCompra, 2, 10.50, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (2, 4, '2024-05-15', 'Juigalpa', 'EN ESPERA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (14, @IDCompra, 1, 12.50, 'ENTREGA A DOMICILIO');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (1, 1, '2024-05-15', 'Juigalpa', 'ENTREGADA');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (11, @IDCompra, 3, 10.25, 'RETIRO EN SUCURSAL');

INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
VALUES (1, 2, '2024-05-15', 'Juigalpa', 'EN PROCESO');
SET @IDCompra = LAST_INSERT_ID();
INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
VALUES (18, @IDCompra, 5, 11.99, 'RETIRO EN SUCURSAL');

SELECT * FROM Compra;
SELECT * FROM Cliente;

USE farmaciaglorys;
-- mil registros aleatorios

DELIMITER $$

CREATE PROCEDURE InsertarVentas()
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE rand_emp INT;
    DECLARE rand_cli INT;
    DECLARE rand_prod INT;
    DECLARE rand_cant INT;
    DECLARE rand_prec DECIMAL(5,2);
    DECLARE rand_estado ENUM('ENTREGADA', 'EN PROCESO', 'EN ESPERA');

    WHILE i <= 1000 DO
        SET rand_emp = FLOOR(1 + (RAND() * 2)); -- 1 or 2
        SET rand_cli = FLOOR(1 + (RAND() * 5)); -- 1 to 5
        SET rand_prod = FLOOR(1 + (RAND() * 20)); -- 1 to 20
        SET rand_cant = FLOOR(1 + (RAND() * 10)); -- 1 to 10
        SET rand_prec = ROUND(1 + (RAND() * 700), 2); -- 1 to 700
        SET rand_estado = ELT(FLOOR(1 + (RAND() * 3)), 'ENTREGADA', 'EN PROCESO', 'EN ESPERA');

        -- Insert into compra table
        INSERT INTO compra (IDEmpleado, IDCliente, FechaHoraCompra, DirecCompra, EstadoC)
        VALUES (rand_emp, rand_cli, NOW(), 'Juigalpa', rand_estado);

        -- Get last inserted ID for compra
        SET @IDCompra = LAST_INSERT_ID();

        -- Insert into detallecompra table
        INSERT INTO detallecompra (IDProducto, IDCompra, CantProductos, PrecioProducto, TipoEntrega)
        VALUES (rand_prod, @IDCompra, rand_cant, rand_prec, 'RETIRO EN SUCURSAL');

        SET i = i + 1;
    END WHILE;
END$$

DELIMITER ;

-- Ejecutar el procedimiento
CALL InsertarVentas();

-- Borrar el procedimiento para limpiar
DROP PROCEDURE InsertarVentas;