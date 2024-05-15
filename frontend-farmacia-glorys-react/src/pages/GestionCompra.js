import React, { useState, useEffect } from 'react';
import { Table, Card } from 'react-bootstrap';
import Header from '../components/Header';

function ListCompra({Rol}) {
    const [compras, setCompras] = useState([]);

    function formatFechaForInput(dateTimeString) {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Agregar ceros iniciales
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Realiza una solicitud GET al servidor para obtener las compras
    useEffect(() => {
        fetch('http://localhost:5000/crud/readCompra')
        .then((response) => response.json())
        .then((data) => setCompras(data))
        .catch((error) => console.error('Error al obtener las compras:', error));
    }, []);

    return (
        <div>
        <Header Rol={Rol} />

        <Card className="margen-contenedor" responsive>
            <Card.Body>
            <Card.Title className="titulo-2">Compras</Card.Title>

            <Table striped bordered hover className='table'>
                <thead>
                <tr>
                    <th>N°</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Nombre de Producto</th>
                    <th>Marca</th>
                    <th>Presentación</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Tipo de Entrega</th>
                    <th>Estado</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                {compras.map((compra) => (
                    <tr key={compra.IDCompraProducto}>
                    <td>{compra.IDCompraProducto}</td>
                    <td>{compra.NombreUsuario}</td>
                    <td>{formatFechaForInput(compra.FechaHoraCompra)}</td>
                    <td>{compra.NomProducto}</td>
                    <td>{compra.NombreMarca}</td>
                    <td>{compra.NombrePresentacion}</td>
                    <td>C$ {compra.PrecioProducto}</td>
                    <td>{compra.CantProductos} U</td>
                    <td>{compra.TipoEntrega}</td>
                    <td>{compra.EstadoC}</td>
                    <td>C$ {compra.CantProductos * compra.PrecioProducto}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </Card.Body>
        </Card>
        </div>
    );
}

export default ListCompra;