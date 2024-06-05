use farmaciaglorys_dm;

-- Consultas para la tabla DIM_Producto //////////////////////////////////////////////////////////////////////////////////////////
-- Ventas totales por año:
SELECT 
    Anyo, 
    SUM(Total) AS Ventas_totales
FROM 
    H_Ventas
JOIN 
    Dim_Tiempo ON H_Ventas.IDTiempo = Dim_Tiempo.IDTiempo
GROUP BY 
    Anyo;
    

-- Ventas totales por mes de un año específico (por ejemplo, 2024):
SELECT 
    Mes, 
    SUM(Total) AS Ventas_totales
FROM 
    H_Ventas
JOIN 
    Dim_Tiempo ON H_Ventas.IDTiempo = Dim_Tiempo.IDTiempo
WHERE 
    Anyo = 2024
GROUP BY 
    Mes;
    
-- Ventas totales por día de un mes y año específicos (por ejemplo, mayo de 2024):
SELECT 
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

-- Ventas totales por trimestre:
SELECT 
    Trimestre, 
    SUM(Total) AS Ventas_totales
FROM 
    H_Ventas
JOIN 
    Dim_Tiempo ON H_Ventas.IDTiempo = Dim_Tiempo.IDTiempo
GROUP BY 
    Trimestre;

-- Ventas totales por categoría de producto:
SELECT 
    p.NombreCategoria,
    SUM(hv.Total) AS Ventas_Totales
FROM 
    H_Ventas hv
JOIN 
    Dim_Producto p ON hv.IDProducto = p.IDProducto
GROUP BY 
    p.NombreCategoria
ORDER BY 
    Ventas_Totales DESC;

-- Promedio de ventas por producto:    
SELECT 
    p.NomProducto,
    AVG(hv.Total) AS Promedio_Ventas
FROM 
    H_Ventas hv
JOIN 
    Dim_Producto p ON hv.IDProducto = p.IDProducto
GROUP BY 
    p.NomProducto
ORDER BY 
    Promedio_Ventas DESC;
    
-- Top 5 productos más vendidos por cantidad:
SELECT 
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

-- Consultas para la tabla DIM_Empleado //////////////////////////////////////////////////////////////////////////////////////////
SELECT 
    E.NombreUsuario AS NombreEmpleado,
    SUM(HV.Total) AS VentasTotales
FROM 
    H_VENTAS HV
JOIN 
    DIM_EMPLEADO E ON HV.IDEmpleado = E.IDEmpleado
GROUP BY 
    E.NombreUsuario;
    
   SELECT 
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
    E.NombreUsuario, T.Semana;

SELECT 
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
    
    
SELECT 
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

-- Consultas para la tabla DIM_Cliente //////////////////////////////////////////////////////////////////////////////////////////
-- Total de ventas por Cliente en un año específico
SELECT
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

-- Total de ventas por lugar de origen de cada cliente
SELECT
    c.Procedencia,
    SUM(v.Total) AS TotalVentas
FROM
    H_VENTAS v
JOIN
    DIM_CLIENTE c ON v.IDCliente = c.IDCliente
GROUP BY
    c.Procedencia;
