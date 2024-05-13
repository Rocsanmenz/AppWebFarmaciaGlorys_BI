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
 NomProducto   VARCHAR(50) NOT NULL,
 DescripProducto VARCHAR(500) NOT NULL,
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
 Descripcion VARCHAR(300) NOT NULL,
 PrecioS DECIMAL(8,2) NOT NULL,
 imagen LONGTEXT, /*Imagen*/
 PRIMARY KEY (IDServicio) /*Clave Primaria*/
 );
 
 /*Tabla ServicioCliente*/
 CREATE TABLE ServicioCliente (
 IDServicioCliente INT AUTO_INCREMENT NOT NULL,  /*Autoincrementable*/
 IDCliente INT NOT NULL,
 IDServicio INT NOT NULL,
 FechaSolicitud DATE,
 FechaCita DATETIME,
 FOREIGN KEY (IDCliente) REFERENCES Cliente (IDCliente), /*Relaciones*/
 FOREIGN KEY (IDServicio) REFERENCES Servicio (IDServicio), /*Relaciones*/
 PRIMARY KEY (IDServicioCliente) /*Clave Primaria*/
 );
 
 /*Tabla Compra*/
 CREATE TABLE Compra (
 IDCompra INT AUTO_INCREMENT NOT NULL,  /*Autoincrementable*/
 IDEmpleado INT NULL,
 IDCliente INT NOT NULL,
 FechaHoraCompra DATE, 
 DirecCompra VARCHAR(100),
 EstadoC VARCHAR(20),
 FOREIGN KEY (IDEmpleado) REFERENCES Empleado (IDEmpleado), /*Relaciones*/
 FOREIGN KEY (IDCliente) REFERENCES Cliente (IDCliente), /*Relaciones*/
 PRIMARY KEY (IDCompra) /*Clave Primaria*/
 );
 
 /*Tabla CompraProducto*/
 CREATE TABLE DetalleCompra (
 IDCompraProducto INT AUTO_INCREMENT NOT NULL,  /*Autoincrementable*/
 IDProducto INT NOT NULL,
 IDCompra INT NOT NULL,
 CantProductos INT NOT NULL,
 PrecioProducto DECIMAL(8,2) NOT NULL,
 FOREIGN KEY (IDProducto) REFERENCES Producto (IDProducto), /*Relaciones*/
 FOREIGN KEY (IDCompra) REFERENCES Compra (IDCompra), /*Relaciones*/
 PRIMARY KEY (IDCompraProducto) /*Clave Primaria*/
 );
