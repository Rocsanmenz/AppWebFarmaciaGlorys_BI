import React, { useEffect, useState } from 'react';  // Importación de React, useEffect y useState desde 'react'
import Header from '../components/Header';  // Importación del componente Header desde la ruta '../components/Header'
import { Button, Row, Col, Card, Container } from 'react-bootstrap';  // Importación de componentes específicos desde 'react-bootstrap'
import jsPDF from 'jspdf';  
import Chart from 'chart.js/auto';  
import '../styles/App.css';  
import html2canvas from 'html2canvas';

function Grafico ({Rol}) {

    const [productos, setProductos] = useState([]);  // Declaración del estado 'productos' y su función 'setProductos' a través de useState, con un valor inicial de un array vacío
    const [clientes, setClientes] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [myChart, setMyChart] = useState(null);
    const [myChart2, setMyChart2] = useState(null);
    const [myChart3, setMyChart3] = useState(null);


    // Gráfico 1 ////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        fetch('http://localhost:5000/Estadistica/top5porcantidad')  // Realiza una solicitud GET al servidor para obtener productos
          .then((response) => response.json())  // Convierte la respuesta a formato JSON
          .then((data) => setProductos(data))  // Almacena los productos en el estado 'productos'
          .catch((error) => console.error('Error al obtener los productos:', error));  // Manejo de errores en caso de fallar la solicitud
    }, []);  

    useEffect(() => {
        if (productos.length > 0) {  // Si hay productos disponibles
          const ctx = document.getElementById('myChart');  // Obtiene el elemento canvas con el ID 'myChart'
    
            if (myChart !== null) {
                myChart.destroy(); // Destruye el gráfico existente antes de crear uno nuevo para evitar conflictos
            }

    
            const nomProducto = productos.map((producto) => producto.NomProducto);  // Extrae los nombres de los productos
            const cantidadesVendidas = productos.map((producto) => producto.Cantidad_Total_Vendida);

            const grafico1 = new Chart(ctx, {  // Crea un nuevo gráfico de tipo 'bar' con Chart.js y lo asigna al elemento canvas
                type: 'bar',
                data: {
                labels: nomProducto,  // Asigna los nombres de productos como etiquetas para el eje X
                datasets: [{
                  label: 'Cantidad Total Vendida',  // Etiqueta para la leyenda del gráfico
                  data: cantidadesVendidas,  // Asigna las cantidades de productos para la visualización
                  backgroundColor: 'rgba(27, 35, 150, 0.843)',  // Define el color de fondo de las barras
                  borderColor: 'rgba(27, 35, 150, 0)',  // Define el color del borde de las barras
                  borderWidth: 1  // Define el ancho del borde de las barras
                }]
            },
            options: {
                scales: {
                y: {
                    beginAtZero: true  // Comienza el eje Y desde cero
                }
                }
            }
            });
            setMyChart(grafico1); // Guarda la referencia al nuevo gráfico en el estado 'myChart'
        }
        }, [productos]);

        // Gráfico 2 //////////////////////////////////////////////////////////////////////////////////////////////
        useEffect(() => {
            fetch('http://localhost:5000/Estadistica/ventasporprocedencia')  // Realiza una solicitud GET al servidor para obtener productos
              .then((response) => response.json())  // Convierte la respuesta a formato JSON
              .then((data) => setClientes(data))  // Almacena los productos en el estado 'productos'
              .catch((error) => console.error('Error al obtener los clientes:', error));  // Manejo de errores en caso de fallar la solicitud
        }, []);  
    
        useEffect(() => {
            if (clientes.length > 0) {  
              const cli = document.getElementById('myChart2');  // Obtiene el elemento canvas con el ID 'myChart'
        
                if (myChart2 !== null) {
                    myChart2.destroy(); // Destruye el gráfico existente antes de crear uno nuevo para evitar conflictos
                }
    
        
                const procedencias = clientes.map((cliente) => cliente.Procedencia);  // Extrae los nombres de los productos
                const totalesVentas = clientes.map((cliente) => cliente.TotalVentas);
    
                const grafico2 = new Chart(cli, {  // Crea un nuevo gráfico de tipo 'bar' con Chart.js y lo asigna al elemento canvas
                    type: 'bar',
                    data: {
                    labels: procedencias,  // Asigna los nombres de productos como etiquetas para el eje X
                    datasets: [{
                      label: 'Total de ventas',  // Etiqueta para la leyenda del gráfico
                      data: totalesVentas,  // Asigna las cantidades de productos para la visualización
                      backgroundColor: 'rgba(51, 214, 18, 0.843)',  // Define el color de fondo de las barras
                      borderColor: 'rgba(51, 214, 18, 0)',  // Define el color del borde de las barras
                      borderWidth: 1  // Define el ancho del borde de las barras
                    }]
                },
                options: {
                    scales: {
                    y: {
                        beginAtZero: true  // Comienza el eje Y desde cero
                    }
                    }
                }
                });
                setMyChart2(grafico2); // Guarda la referencia al nuevo gráfico en el estado 'myChart'
            }
            }, [clientes]);

    //Gráfico 3 ///////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        fetch('http://localhost:5000/Estadistica/ventasporcategoria')
            .then((response) => response.json())
            .then((data) => setCategorias(data))
            .catch((error) => console.error('Error al obtener las ventas por categoría:', error));
       }, []);
    
    
        useEffect(() => {
        if (categorias.length > 0) {
        const cate = document.getElementById('myCategories');
    
        if (myChart3 !== null) {
        myChart3.destroy(); // Destruye el gráfico existente antes de crear uno nuevo para evitar conflictos
        }
    
        const nombresCategoria = categorias.map((categoria) => categoria.NombreCategoria); 
        const ventasTotales = categorias.map((categoria) => categoria.Ventas_Totales);
    
        const chart = new Chart(cate, {
            type: 'pie',
            data: {
            labels: nombresCategoria,
            datasets: [{
            label: 'Ventas Totales',
            data: ventasTotales,
    
                backgroundColor: [
                'rgba(214, 18, 132, 0.843)',
                'rgba(214, 18, 34, 0.8435)',
                'rgba(255, 206, 86, 0.5)', 
                'rgba(75, 192, 192, 0.5)', 
                'rgba(153, 102, 255, 0.5)', 
                'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                'rgba(214, 18, 132, 0.843)', 
                'rgba(214, 18, 34, 0.8435)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                Legend: {
                    position: 'top',
            },
            title: {
                display: true,
                text: 'Ventas totales por categoría'
                }
            }
            }
        });
        setMyChart3(chart)
        }
    }, [categorias]);
        
    return(
        <div>
        <Header Rol={ Rol } />  

        <Container className="margen-conten" responsive>

        <Row className="g-3">

            <Col sm="3" md="6" lg="6">
                <Card>
                <Card.Body>
                    <Card.Title className='title'>Top 5 de productos más vendidos</Card.Title>
                    <canvas id="myChart"  height="120"></canvas>
                </Card.Body>
                    </Card>
                </Col> 

                <Col sm="6" md="6" lg="6">
                <Card>
                <Card.Body>
                    <Card.Title className='title'>Ventas totales por procedencias</Card.Title>
                    <canvas id="myChart2"  height="120"></canvas>
                </Card.Body>
                    </Card>
                </Col> 

                <Col sm="6" md="6" lg="6">
                <Card>
                <Card.Body>
                    <Card.Title className='title'>Ventas totales por categoría</Card.Title>
                    <canvas id="myCategories"  height="120"></canvas>
                </Card.Body>
                    </Card>
                </Col> 


            </Row>
        </Container> 


        </div>
    );
}

export default Grafico;