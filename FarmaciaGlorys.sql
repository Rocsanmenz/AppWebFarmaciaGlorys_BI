/*Usuario dev1*/
/*BD FarmaciaGlorys*/
CREATE DATABASE IF NOT EXISTS FarmaciaGlorys;
USE FarmaciaGlorys;

/*Entidades --Tablas*/

/*Tabla Usuario*/
CREATE TABLE Usuario (
IDUsuario INT AUTO_INCREMENT NOT NULL, /*Autoincrementable*/
NombreUsuario VARCHAR(20) NOT NULL,
Contraseña VARCHAR(8) NOT NULL,
Rol VARCHAR (20) NOT NULL,
PRIMARY KEY (IDUsuario)
);

/*Tabla Empleado*/
CREATE TABLE Empleado (
 IDEmpleado INT AUTO_INCREMENT NOT NULL, /*Autoincrementable*/
 Correo NVARCHAR(30) NOT NULL,
 Telefono VARCHAR(8) NOT NULL,
 IDUsuario INT UNIQUE,
 PRIMARY KEY (IDEmpleado), /*Clave Primaria*/
 FOREIGN KEY (IDUsuario) REFERENCES Usuario (IDUsuario) /*Relaciones*/
 );
 
 /*Tabla Cliente*/
 CREATE TABLE Cliente (
 IDCliente INT	AUTO_INCREMENT NOT NULL,  /*Autoincrementable*/
 CorreoC NVARCHAR(30) NOT NULL,
 TelefonoC VARCHAR(8) NOT NULL,
 IDUsuario INT UNIQUE,
 PRIMARY KEY (IDCliente), /*Clave Primaria*/
 FOREIGN KEY (IDUsuario) REFERENCES Usuario (IDUsuario) /*Relaciones*/
 );
 
 /*Tabla Marca*/
 CREATE TABLE Marca (
 IDMarca INT AUTO_INCREMENT	NOT NULL,  /*Autoincrementable*/
 NombreMarca   VARCHAR(20) NOT NULL,
 PRIMARY KEY (IDMarca) /*Clave Primaria*/
 );
 
 /*Tabla Categoria*/
 CREATE TABLE Categoria (
 IDCategoria INT AUTO_INCREMENT	NOT NULL,  /*Autoincrementable*/
 NombreCategoria  VARCHAR(20) NOT NULL,
 PRIMARY KEY (IDCategoria) /*Clave Primaria*/
 );
 
 /*Tabla Presentación*/
 CREATE TABLE Presentacion (
 IDPresentacion INT	AUTO_INCREMENT NOT NULL,  /*Autoincrementable*/
 NombrePresentacion  VARCHAR(20) NOT NULL,
 PRIMARY KEY (IDPresentacion) /*Clave Primaria*/
 );
 
 /*Tabla Producto*/
 CREATE TABLE Producto (
 IDProducto INT	AUTO_INCREMENT NOT NULL,  /*Autoincrementable*/
 NomProducto   VARCHAR(30) NOT NULL,
 DescripProducto VARCHAR(100) NOT NULL,
 PrecioProducto DECIMAL(8,2) NOT NULL,
 Estado VARCHAR(10) NOT NULL,
 CantProducto INT NOT NULL,
 imagen LONGTEXT, /*Imagen*/
 IDMarca INT NOT NULL,	
 IDCategoria INT NOT NULL,
 IDPresentacion INT NOT NULL,
 FOREIGN KEY (IDMarca) REFERENCES Marca (IDMarca), /*Relaciones*/
 FOREIGN KEY (IDCategoria) REFERENCES Categoria (IDCategoria), /*Relaciones*/
 FOREIGN KEY (IDPresentacion) REFERENCES Presentacion (IDPresentacion), /*Relaciones*/
 PRIMARY KEY (IDProducto) /*Clave Primaria*/
 );
 
 /*Tabla Servicio*/
 CREATE TABLE Servicio (
 IDServicio INT AUTO_INCREMENT	NOT NULL,  /*Autoincrementable*/
 NombreS  VARCHAR(30) NOT NULL,
 EstadoS VARCHAR(30) NOT NULL,
 Descripcion VARCHAR(100) NOT NULL,
 PrecioS DECIMAL(8,2) NOT NULL,
 imagen LONGTEXT, /*Imagen*/
 PRIMARY KEY (IDServicio) /*Clave Primaria*/
 );
 
 /*Tabla ServicioCliente*/
 CREATE TABLE ServicioCliente (
 IDServicioCliente INT AUTO_INCREMENT NOT NULL,  /*Autoincrementable*/
 IDCliente INT NOT NULL,
 IDServicio INT NOT NULL,
 FechaSolicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP, /*Fecha y hora predeterminada del sistema*/
 FechaCita DATETIME NULL,
 FOREIGN KEY (IDCliente) REFERENCES Cliente (IDCliente), /*Relaciones*/
 FOREIGN KEY (IDServicio) REFERENCES Servicio (IDServicio), /*Relaciones*/
 PRIMARY KEY (IDServicioCliente) /*Clave Primaria*/
 );
 
 /*Tabla Pago*/
 CREATE TABLE Pago (
 IDPago INT AUTO_INCREMENT	NOT NULL,  /*Autoincrementable*/
 FechaHoraPago TIMESTAMP DEFAULT CURRENT_TIMESTAMP, /*Fecha y hora predeterminada del sistema*/
 TotalPago DECIMAL(8,2) NOT NULL,
 PRIMARY KEY (IDPago) /*Clave Primaria*/
 ); 
 
 /*Tabla Compra*/
 CREATE TABLE Compra (
 IDCompra INT AUTO_INCREMENT NOT NULL,  /*Autoincrementable*/
 IDEmpleado INT NULL,
 IDCliente INT NOT NULL,
 FechaHoraCompra TIMESTAMP DEFAULT CURRENT_TIMESTAMP, /*Fecha y hora predeterminada del sistema*/
 DirecCompra VARCHAR(100) NOT NULL,
 IDPago INT NOT NULL,
 EstadoC VARCHAR(20) NULL,
 FOREIGN KEY (IDPago) REFERENCES Pago (IDPago), /*Relaciones*/
 FOREIGN KEY (IDEmpleado) REFERENCES Empleado (IDEmpleado), /*Relaciones*/
 FOREIGN KEY (IDCliente) REFERENCES Cliente (IDCliente), /*Relaciones*/
 PRIMARY KEY (IDCompra) /*Clave Primaria*/
 );
 
 /*Tabla CompraProducto*/
 CREATE TABLE CompraProducto (
 IDCompraProducto INT AUTO_INCREMENT NOT NULL,  /*Autoincrementable*/
 IDProducto INT NOT NULL,
 IDCompra INT NOT NULL,
 CantProductos INT NOT NULL,
 Precio DECIMAL(8,2) NOT NULL,
 FOREIGN KEY (IDProducto) REFERENCES Producto (IDProducto), /*Relaciones*/
 FOREIGN KEY (IDCompra) REFERENCES Compra (IDCompra), /*Relaciones*/
 PRIMARY KEY (IDCompraProducto) /*Clave Primaria*/
 );
 
/*Creación de roles*/
CREATE ROLE 'app_developer', 'app_Read', 'app_Modifier';
 
/*Asignación de permisos a roles*/
GRANT ALL ON farmaciaglorys.* TO 'app_developer';
GRANT SELECT ON farmaciaglorys.* TO 'app_Read';
GRANT INSERT, update, delete ON farmaciaglorys.* TO 'app_Modifier';

/*Crear usuarios*/
CREATE USER 'dev1'@'localhost' identified by 'dev1pass';
CREATE USER 'read1'@'localhost' identified by 'read1pass';
CREATE USER 'modi1'@'localhost' identified by 'modi1pass';

/*Asignación de roles a usuarios*/
GRANT 'app_developer' TO 'dev1'@'localhost';
GRANT 'app_Read' TO 'read1'@'localhost';
GRANT 'app_Read', 'app_Modifier' TO 'modi1'@'localhost';

/*Reviso de permiso de usuarios*/
SHOW GRANTS FOR 'dev1'@'localhost';
SHOW GRANTS FOR 'dev1'@'localhost' using 'app_developer';

 /*Verificar si roles están activos*/
 SELECT CURRENT_ROLE();
 
 /*Activación de roles*/
 SET DEFAULT ROLE ALL TO
  'dev1'@'localhost',
  'read1'@'localhost',
  'modi1'@'localhost';
 


 
 
 
 
