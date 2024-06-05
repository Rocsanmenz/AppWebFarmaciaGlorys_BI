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
    const [fechas, setFechas] = useState([]);
    const [tiempos, setTiempos] = useState([]);
    const [dias, setDias] = useState([]);
    const [trimestres, setTrimestres] = useState([]);
    const [productos1, setProductos1] = useState([]);
    const [empleados, setEmpleados] = useState([]);

    const [myChart, setMyChart] = useState(null);
    const [myChart2, setMyChart2] = useState(null);
    const [myChart3, setMyChart3] = useState(null);
    const [myChart4, setMyChart4] = useState(null);
    const [myChart5, setMyChart5] = useState(null);
    const [myChart6, setMyChart6] = useState(null);
    const [myChart7, setMyChart7] = useState(null);
    const [myChart8, setMyChart8] = useState(null);
    const [myChart9, setMyChart9] = useState(null);


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

    // Gráfico 4 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        fetch('http://localhost:5000/Estadistica/ventasporanio')  // Realiza una solicitud GET al servidor para obtener productos
          .then((response) => response.json())  // Convierte la respuesta a formato JSON
          .then((data) => setFechas(data))  // Almacena los productos en el estado 'productos'
          .catch((error) => console.error('Error al obtener las fechas:', error));  // Manejo de errores en caso de fallar la solicitud
    }, []);  

    useEffect(() => {
        if (fechas.length > 0) {  
          const fech = document.getElementById('myChart4');  // Obtiene el elemento canvas con el ID 'myChart'
    
            if (myChart4 !== null) {
                myChart4.destroy(); // Destruye el gráfico existente antes de crear uno nuevo para evitar conflictos
            }

    
            const años = fechas.map((fecha) => fecha.Anyo);  // Extrae los nombres de los productos
            const ventasTotales = fechas.map((fecha) => fecha.Ventas_totales);

            const grafico4 = new Chart(fech, {  // Crea un nuevo gráfico de tipo 'bar' con Chart.js y lo asigna al elemento canvas
                type: 'bar',
                data: {
                labels: años,  // Asigna los nombres de productos como etiquetas para el eje X
                datasets: [{
                  label: 'Total de ventas por año',  // Etiqueta para la leyenda del gráfico
                  data: ventasTotales,  // Asigna las cantidades de productos para la visualización
                  backgroundColor: 'rgba(214, 122, 18, 0.843)',  // Define el color de fondo de las barras
                  borderColor: 'rgba(214, 122, 18, 0.843)',  // Define el color del borde de las barras
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
            setMyChart4(grafico4); // Guarda la referencia al nuevo gráfico en el estado 'myChart'
        }
        }, [fechas]);

    // Gráfico 5 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        fetch('http://localhost:5000/Estadistica/ventaspormes2024')  // Realiza una solicitud GET al servidor para obtener productos
          .then((response) => response.json())  // Convierte la respuesta a formato JSON
          .then((data) => setTiempos(data))  // Almacena los productos en el estado 'productos'
          .catch((error) => console.error('Error al obtener las fechas:', error));  // Manejo de errores en caso de fallar la solicitud
    }, []);  

    useEffect(() => {
        if (tiempos.length > 0) {  
          const fec = document.getElementById('myChart5');  // Obtiene el elemento canvas con el ID 'myChart'
    
            if (myChart5 !== null) {
                myChart5.destroy(); // Destruye el gráfico existente antes de crear uno nuevo para evitar conflictos
            }

    
            const meses = tiempos.map((tiempo) => tiempo.Mes);  // Extrae los nombres de los productos
            const Ventastotales = tiempos.map((tiempo) => tiempo.Ventas_totales);

            const grafico5 = new Chart(fec, {  // Crea un nuevo gráfico de tipo 'bar' con Chart.js y lo asigna al elemento canvas
                type: 'bar',
                data: {
                labels: meses,  // Asigna los nombres de productos como etiquetas para el eje X
                datasets: [{
                  label: 'Total de ventas por mes',  // Etiqueta para la leyenda del gráfico
                  data: Ventastotales,  // Asigna las cantidades de productos para la visualización
                  backgroundColor: 'rgba(18, 168, 214, 0.843)',  // Define el color de fondo de las barras
                  borderColor: 'rgba(18, 168, 214, 0.843)',  // Define el color del borde de las barras
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
            setMyChart5(grafico5); // Guarda la referencia al nuevo gráfico en el estado 'myChart'
        }
        }, [fechas]);

    // Gráfico 6 ////////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        fetch('http://localhost:5000/Estadistica/ventastotal')  // Realiza una solicitud GET al servidor para obtener productos
          .then((response) => response.json())  // Convierte la respuesta a formato JSON
          .then((data) => setDias(data))  // Almacena los productos en el estado 'productos'
          .catch((error) => console.error('Error al obtener los productos:', error));  // Manejo de errores en caso de fallar la solicitud
    }, []);  

    useEffect(() => {
        if (dias.length > 0) {  // Si hay productos disponibles
          const di = document.getElementById('myChart6');  // Obtiene el elemento canvas con el ID 'myChart'
    
            if (myChart6 !== null) {
                myChart6.destroy(); // Destruye el gráfico existente antes de crear uno nuevo para evitar conflictos
            }

    
            const diass = dias.map((dia) => dia.Dia);  // Extrae los nombres de los productos
            const ventas = dias.map((dia) => dia.Ventas_totales);

            const grafico6 = new Chart(di, {  // Crea un nuevo gráfico de tipo 'bar' con Chart.js y lo asigna al elemento canvas
                type: 'bar',
                data: {
                labels: diass,  // Asigna los nombres de productos como etiquetas para el eje X
                datasets: [{
                  label: 'Ventas totales por día de un mes y año específicos',  // Etiqueta para la leyenda del gráfico
                  data: ventas,  // Asigna las cantidades de productos para la visualización
                  backgroundColor: 'rgba(155, 214, 18, 0.843)',  // Define el color de fondo de las barras
                  borderColor: 'rgba(155, 214, 18, 0.843)',  // Define el color del borde de las barras
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
            setMyChart6(grafico6); // Guarda la referencia al nuevo gráfico en el estado 'myChart'
        }
        }, [dias]);

    // Gráfico 7 ///////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        fetch('http://localhost:5000/Estadistica/ventasportrimestre')  // Realiza una solicitud GET al servidor para obtener productos
          .then((response) => response.json())  // Convierte la respuesta a formato JSON
          .then((data) => setTrimestres(data))  // Almacena los productos en el estado 'productos'
          .catch((error) => console.error('Error al obtener los trimestres:', error));  // Manejo de errores en caso de fallar la solicitud
    }, []);  

    useEffect(() => {
        if (trimestres.length > 0) {  // Si hay productos disponibles
          const tri = document.getElementById('myChart7');  // Obtiene el elemento canvas con el ID 'myChart'
    
            if (myChart7 !== null) {
                myChart7.destroy(); // Destruye el gráfico existente antes de crear uno nuevo para evitar conflictos
            }

    
            const trim = trimestres.map((trimestre) => trimestre.Trimestre);  // Extrae los nombres de los productos
            const ventasT = trimestres.map((trimestre) => trimestre.Ventas_totales);

            const grafico7 = new Chart(tri, {  // Crea un nuevo gráfico de tipo 'bar' con Chart.js y lo asigna al elemento canvas
                type: 'bar',
                data: {
                labels: trim,  // Asigna los nombres de productos como etiquetas para el eje X
                datasets: [{
                  label: 'Ventas totales por trimestre',  // Etiqueta para la leyenda del gráfico
                  data: ventasT,  // Asigna las cantidades de productos para la visualización
                  backgroundColor: 'rgba(175, 121, 219, 0.788)',  // Define el color de fondo de las barras
                  borderColor: 'rgba(175, 121, 219, 0.788)',  // Define el color del borde de las barras
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
            setMyChart7(grafico7); // Guarda la referencia al nuevo gráfico en el estado 'myChart'
        }
        }, [trimestres]);

    // Gráfico 8 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        fetch('http://localhost:5000/Estadistica/ventaspromedio')  // Realiza una solicitud GET al servidor para obtener productos
          .then((response) => response.json())  // Convierte la respuesta a formato JSON
          .then((data) => setProductos1(data))  // Almacena los productos en el estado 'productos'
          .catch((error) => console.error('Error al obtener los productos:', error));  // Manejo de errores en caso de fallar la solicitud
    }, []);  

    useEffect(() => {
        if (productos1.length > 0) {  // Si hay productos disponibles
          const pro = document.getElementById('myChart8');  // Obtiene el elemento canvas con el ID 'myChart'
    
            if (myChart8 !== null) {
                myChart8.destroy(); // Destruye el gráfico existente antes de crear uno nuevo para evitar conflictos
            }

    
            const produc = productos1.map((producto1) => producto1.NomProducto);  // Extrae los nombres de los productos
            const VentasP = productos1.map((producto1) => producto1.Promedio_Ventas);

            const grafico8 = new Chart(pro, {  // Crea un nuevo gráfico de tipo 'bar' con Chart.js y lo asigna al elemento canvas
                type: 'bar',
                data: {
                labels: produc,  // Asigna los nombres de productos como etiquetas para el eje X
                datasets: [{
                  label: 'Ventas totales por producto',  // Etiqueta para la leyenda del gráfico
                  data: VentasP,  // Asigna las cantidades de productos para la visualización
                  backgroundColor: 'rgba(214, 18, 181, 0.843)',  // Define el color de fondo de las barras
                  borderColor: 'rgba(214, 18, 181, 0.843)',  // Define el color del borde de las barras
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
            setMyChart8(grafico8); // Guarda la referencia al nuevo gráfico en el estado 'myChart'
        }
        }, [productos1]);

    // Gráfico 9 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        fetch('http://localhost:5000/Estadistica/ventasporempleado')
            .then((response) => response.json())
            .then((data) => setEmpleados(data))
            .catch((error) => console.error('Error al obtener los empleados:', error));
       }, []);
    
    
        useEffect(() => {
        if (empleados.length > 0) {
        const emp = document.getElementById('myEmpleados');
    
        if (myChart9 !== null) {
        myChart9.destroy(); // Destruye el gráfico existente antes de crear uno nuevo para evitar conflictos
        }
    
        const nombres = empleados.map((empleado) => empleado.NombreEmpleado); 
        const ventasE = empleados.map((empleado) => empleado.VentasTotales);
    
        const chart = new Chart(emp, {
            type: 'pie',
            data: {
            labels: nombres,
            datasets: [{
            label: 'Ventas Totales',
            data: ventasE,
    
                backgroundColor: [
                'rgba(241, 245, 19, 0.843)',
                'rgba(80, 214, 18, 0.843)',
                'rgba(255, 206, 86, 0.5)', 
                'rgba(75, 192, 192, 0.5)', 
                'rgba(153, 102, 255, 0.5)', 
                'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                'rgba(241, 245, 19, 0.843)', 
                'rgba(80, 214, 18, 0.843)',
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
                text: 'Ventas totales por empleado'
                }
            }
            }
        });
        setMyChart9(chart)
        }
    }, [empleados]);
        
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
                <Col sm="6" md="6" lg="6">
                <Card>
                <Card.Body>
                    <Card.Title className='title'>Ventas totales por empleado</Card.Title>
                    <canvas id="myEmpleados"  height="120"></canvas>
                </Card.Body>
                    </Card>
                </Col> 

                <Col sm="6" md="6" lg="6">
                <Card>
                <Card.Body>
                    <Card.Title className='title'>Ventas totales por año</Card.Title>
                    <canvas id="myChart4"  height="120"></canvas>
                </Card.Body>
                    </Card>
                </Col> 

                <Col sm="6" md="6" lg="6">
                <Card>
                <Card.Body>
                    <Card.Title className='title'>Ventas totales por mes</Card.Title>
                    <canvas id="myChart5"  height="120"></canvas>
                </Card.Body>
                    </Card>
                </Col> 

                <Col sm="6" md="6" lg="6">
                <Card>
                <Card.Body>
                    <Card.Title className='title'>Ventas totales por día de un mes y año específicos</Card.Title>
                    <canvas id="myChart6"  height="120"></canvas>
                </Card.Body>
                    </Card>
                </Col> 

                <Col sm="6" md="6" lg="6">
                <Card>
                <Card.Body>
                    <Card.Title className='title'>Ventas totales por trimestre</Card.Title>
                    <canvas id="myChart7"  height="120"></canvas>
                </Card.Body>
                    </Card>
                </Col> 

                <Col sm="6" md="6" lg="12">
                <Card>
                <Card.Body>
                    <Card.Title className='title'>Ventas totales por producto</Card.Title>
                    <canvas id="myChart8"  height="120"></canvas>
                </Card.Body>
                    </Card>
                </Col> 


            </Row>
        </Container> 


        </div>
    );
}

export default Grafico;