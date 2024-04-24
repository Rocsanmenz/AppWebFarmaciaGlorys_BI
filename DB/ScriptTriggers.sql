use farmaciaglorys;

/*Realización de triggers y tabla bitácora*/

/*Creación de la tabla bitácora en la BD FarmaciaGlorys*/
CREATE TABLE bitacora (
id_bitacora INT NOT NULL AUTO_INCREMENT,
transaccion VARCHAR(10) NOT NULL,
usuario VARCHAR(40) NOT NULL,
fecha DATETIME NOT NULL,
tabla VARCHAR(20) NOT NULL,
PRIMARY KEY (id_bitacora)
);

/*Triggers de la tabla Categoría--------------------------------------------------------------------*/
/*Creación de trigger de insersión de datos en la tabla Categoria de la BD FarmaciaGlorys*/
CREATE TRIGGER TriggerInsertCategoria
AFTER INSERT ON categoria
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'categoria');


/*Creación de trigger de actualizar un registro de la tabla Categoria*/
CREATE TRIGGER TriggerUpdateCategoria
  AFTER UPDATE
  ON categoria
  FOR EACH ROW
  INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(), NOW(), 'categoria');

/*Creación del trigger de eliminar un registro de la tabla Categoria*/
CREATE TRIGGER TriggerDeleteCategoria
AFTER DELETE ON categoria
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'categoria');
/*----------------------------------------------------------------------------------------------------*/

/*Creación de trigger de insersión de datos en la tabla Cliente---------------------------------------*/
CREATE TRIGGER TriggerInsertCliente
AFTER INSERT ON cliente
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'cliente');


/*Creación de trigger de actualizar un registro de la tabla Cliente*/
CREATE TRIGGER TriggerUpdateCliente
  AFTER UPDATE
  ON cliente
  FOR EACH ROW
  INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(), NOW(), 'cliente');

/*Creación de trigger de eliminar un registro de la tabla Cliente*/
CREATE TRIGGER TriggerDeleteCliente
AFTER DELETE ON cliente
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'cliente');
/*----------------------------------------------------------------------------------------------------*/

/*Creación de trigger de insersión de datos en la tabla Empleado--------------------------------------*/
CREATE TRIGGER TriggerInsertEmpleado
AFTER INSERT ON empleado
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'empleado');


/*Creación de trigger de actualizar un registro de la tabla Empleado*/
CREATE TRIGGER TupdateEmpleado
  BEFORE UPDATE
  ON empleado
  FOR EACH ROW
  INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(), NOW(), 'empleado');

/*Creación de trigger de eliminar un registro de la tabla Empleado*/
CREATE TRIGGER TriggerDeleteEmpleado
AFTER DELETE ON empleado
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'empleado');
/*----------------------------------------------------------------------------------------------------*/

/*Creación de trigger de insersión de datos en la tabla Marca-----------------------------------------*/
CREATE TRIGGER TriggerInsertMarca
AFTER INSERT ON marca
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'marca');

/*Creación de trigger de actualizar un registro de la tabla Marca*/
CREATE TRIGGER TupdateMarca
  BEFORE UPDATE
  ON marca
  FOR EACH ROW
  INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(), NOW(), 'marca');

/*Creación de un trigger de eliminar un registro de la tabla Marca*/
CREATE TRIGGER TriggerDeleteMarca
AFTER DELETE ON marca
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'marca');
/*----------------------------------------------------------------------------------------------------*/

/*Creación de trigger de insersión de datos en la tabla Presentacion----------------------------------*/
CREATE TRIGGER TriggerInsertPresentacion
AFTER INSERT ON presentacion
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'presentacion');

/*Creación de trigger de actualizar un registro de la tabla Presentación*/
CREATE TRIGGER TupdatePresentacion
  BEFORE UPDATE
  ON presentacion
  FOR EACH ROW
  INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(), NOW(), 'presentacion');

/*Creación de trigger de eliminar un registro de la tabla Presentación*/
CREATE TRIGGER TriggerDeletePresentacion
AFTER DELETE ON presentacion
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'presentacion');
/*----------------------------------------------------------------------------------------------------*/

/*Creación de trigger de insersión de datos en la tabla Producto--------------------------------------*/
CREATE TRIGGER TriggerInsertProducto
AFTER INSERT ON producto
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'producto');

/*Creación trigger de actualizar un registro de la tabla Producto*/
CREATE TRIGGER TupdateProducto
  BEFORE UPDATE
  ON producto
  FOR EACH ROW
  INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(), NOW(), 'producto');

/*Creación de trigger de eliminar un registro de la tabla Producto*/
CREATE TRIGGER TriggerDeleteProducto
AFTER DELETE ON producto
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'producto');
/*----------------------------------------------------------------------------------------------------*/

/*Creación de trigger de insersión de datos en la tabla Servicio--------------------------------------*/
CREATE TRIGGER TriggerInsertServicio
AFTER INSERT ON servicio
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'servicio');

/*Creación de trigger de actualizar un registro de la tabla Servicio*/
CREATE TRIGGER TupdateServicio
  BEFORE UPDATE
  ON servicio
  FOR EACH ROW
  INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(), NOW(), 'servicio');

/*Creación de trigger de eliminar un registro de la tabla Servicio*/
CREATE TRIGGER TriggerDeleteServicio
AFTER DELETE ON servicio
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'servicio');
/*----------------------------------------------------------------------------------------------------*/

/*Creación de trigger de insersión de datos en la tabla ServicioCliente-------------------------------*/
CREATE TRIGGER TriggerInsertServicioCliente
AFTER INSERT ON serviciocliente
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'serviciocliente');

/*Creación de trigger de actualizar un registro de la tabla ServicioClient*/
CREATE TRIGGER TupdateServicioCliente
  BEFORE UPDATE
  ON serviciocliente
  FOR EACH ROW
  INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(), NOW(), 'serviciocliente');

/*Creación de trigger de eliminar un registro de la tabla ServicioCliente*/
CREATE TRIGGER TriggerDeleteServicioCliente
AFTER DELETE ON serviciocliente
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'serviciocliente');
/*----------------------------------------------------------------------------------------------------*/

/*Creación de trigger de insersión de datos en la tabla Pago------------------------------------------*/
CREATE TRIGGER TriggerInsertPago
AFTER INSERT ON pago
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'pago');

/*Creación de trigger de actualizar un registro de la tabla Pago*/
CREATE TRIGGER TupdatePago
  BEFORE UPDATE
  ON pago
  FOR EACH ROW
  INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(), NOW(), 'pago');

/*Creación de trigger de eliminar un registro de la tabla Pago*/
CREATE TRIGGER TriggerDeletePago
AFTER DELETE ON pago
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'pago');
/*----------------------------------------------------------------------------------------------------*/

/*Creación de trigger de insersión de datos en la tabla Compra----------------------------------------*/
CREATE TRIGGER TriggerInsertCompra
AFTER INSERT ON compra
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'compra');

/*Creación de trigger de actualizar un registro de la tabla Compra*/
CREATE TRIGGER TupdateCompra
  BEFORE UPDATE
  ON compra
  FOR EACH ROW
  INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(), NOW(), 'compra');

/*Creación de trigger de eliminar un registro de la tabla Compra*/
CREATE TRIGGER TriggerDeleteCompra
AFTER DELETE ON compra
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'compra');
/*----------------------------------------------------------------------------------------------------*/

/*Creación de trigger de insersión de datos en la tabla CompraProducto--------------------------------*/
CREATE TRIGGER TriggerInsertCompraProducto
AFTER INSERT ON compraproducto
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'compraproducto');

/*Creación de trigger de actualizar un registro de la tabla CompraProducto*/
CREATE TRIGGER TupdateCompraProducto
  BEFORE UPDATE
  ON compraproducto
  FOR EACH ROW
  INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(), NOW(), 'compraproducto');

/*Creación de trigger de eliminar un registro de la tabla CompraProducto*/
CREATE TRIGGER TriggerDeleteCompraProducto
AFTER DELETE ON compraproducto
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'compraproducto');
/*----------------------------------------------------------------------------------------------------*/

/*Trigger calculados*/
/*Trigger para actualizar stock de la tabla producto según compras*/
DELIMITER $$
CREATE DEFINER = CURRENT_USER 
TRIGGER ActualizacionStock
BEFORE INSERT ON compraproducto
FOR EACH ROW 
BEGIN
	DECLARE P INT DEFAULT 0;
    DECLARE C INT DEFAULT 0;
    
    SET P=NEW.IDProducto;
    SET C=NEW.CantProductos;
    
    IF ((SELECT CantProducto FROM producto WHERE producto.IDProducto=P) > CantProductos) THEN
    UPDATE producto SET CantProducto=CantProducto - C
    WHERE IDProducto = P;
ELSE 
SIGNAL SQLSTATE 'ERROR' SET MESSAGE_TEXT = 'Cantidad de producto no disponible';
END IF;
END$$

/*Trigger para calcular el precio de compra de cada producto*/
DELIMITER $$
CREATE DEFINER	= CURRENT_USER
TRIGGER PrecioCompra
BEFORE INSERT ON compraproducto
FOR EACH ROW
BEGIN
	SET NEW.Precio= (SELECT PrecioProducto FROM producto WHERE NEW.IDProducto=producto.IDProducto) * 1.1;
END$$

/*Trigger para calcular el total de compra*/
DELIMITER $$
CREATE DEFINER = CURRENT_USER
TRIGGER TotalCompra
BEFORE INSERT ON compraproducto
FOR EACH ROW
BEGIN
	SET NEW.totalcompra=NEW.CantProductos * NEW.precio;
END$$
