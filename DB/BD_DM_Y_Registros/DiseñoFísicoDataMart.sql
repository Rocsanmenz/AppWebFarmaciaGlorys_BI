Create Database FarmaciaGlorys_DM;

Use FarmaciaGlorys_DM;

/*Diseño Físico del Data Mart*/
/*Tabla HECHOS*/
CREATE TABLE H_VENTAS (
IDHVenta INT PRIMARY KEY,
IDCompra INT,
IDTiempo INT,
IDProducto INT,
IDCliente INT,
IDEmpleado INT,
CantProductos INT,
PrecioProducto DECIMAL(8,2),
Total DECIMAL(8,2)
);

/*Tabla de Dimesión de Producto*/
CREATE TABLE DIM_PRODUCTO (
IDProducto INT PRIMARY KEY,
NomProducto VARCHAR(30),
PrecioProducto DECIMAL (8,2),
PrecioCompra DECIMAL (8,2),
CantProducto INT,
NombreMarca VARCHAR(20),
NombreCategoria VARCHAR(20),
NombrePresentacion VARCHAR(20)
);

/*Tabla de Dimensión de Cliente*/
CREATE TABLE DIM_CLIENTE (
IDCliente INT PRIMARY KEY,
NombreUsuario VARCHAR(20),
Procedencia VARCHAR(20)
);

/*Tabla de Dimensión de Empleado*/
CREATE TABLE DIM_EMPLEADO (
IDEmpleado INT PRIMARY KEY,
NombreUsuario VARCHAR(20)
);

/*Tabla de Dimensión de Tiempo*/
CREATE TABLE DIM_TIEMPO (
IDTiempo INT PRIMARY KEY,
Fecha DATE,
Anyo INT,
Mes INT,
Dia INT,
Trimestre INT,
Semana INT
);

/*Relaciones entre tablas*/
ALTER TABLE H_VENTAS ADD CONSTRAINT FK_DIM_PRODUCTO_H_VENTAS FOREIGN KEY (IDProducto) REFERENCES DIM_PRODUCTO(IDProducto);
ALTER TABLE H_VENTAS ADD CONSTRAINT FK_DIM_CLIENTE_H_VENTAS FOREIGN KEY (IDCliente) REFERENCES DIM_CLIENTE(IDCliente);
ALTER TABLE H_VENTAS ADD CONSTRAINT FK_DIM_EMPLEADO_H_VENTAS FOREIGN KEY (IDEmpleado) REFERENCES DIM_EMPLEADO(IDEmpleado);
ALTER TABLE H_VENTAS ADD CONSTRAINT FK_DIM_TIEMPO_H_VENTAS FOREIGN KEY (IDTiempo) REFERENCES DIM_TIEMPO(IDTiempo);