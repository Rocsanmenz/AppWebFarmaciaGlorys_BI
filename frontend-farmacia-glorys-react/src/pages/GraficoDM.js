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

        //Reporte 
    const generarReporteAlmacenImg = async () => {
        try {
            const canvas = await html2canvas(document.getElementById('myChart'));
            const pdf = new jsPDF();
            const imgData = canvas.toDataURL('image/png');
            pdf.text("Reporte de Cantidad Total Vendida Por Producto", 60, 10);
            pdf.addImage(imgData, 'PNG', 46, 20, 120, 120);

            fetch('http://localhost:5000/Estadistica/mostrar1') 
            .then((response) => response.json())  
            .then((productos) => {
            let y = 150; 
    
            productos.forEach((pro) => {  
                pdf.text(`Nombre del Producto: ${pro.NomProducto}`, 20, y);  
                pdf.text(`Cantidad Vendida: ${pro.Cantidad_Total_Vendida}`, 20, y + 10);  
    
                y += 30; 
                if (y >= 280) { 
                    pdf.addPage();
                y = 15; 
                }
            });
    
                pdf.save("reporte_ventas_por_producto.pdf");  
            })

            } catch (error) {
            console.error('Error al generar el reporte con imagen:', error);
            }
        };

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

            //Reporte 1
            const generarReporteAlmacenImg1 = async () => {
                try {
                    const canvas = await html2canvas(document.getElementById('myChart2'));
                    const pdf = new jsPDF();
                    const imgData = canvas.toDataURL('image/png');
                    pdf.text("Reporte de Ventas Por Procedencia", 65, 10);
                    pdf.addImage(imgData, 'PNG', 30, 20, 140, 120);

                    fetch('http://localhost:5000/Estadistica/ventasporprocedencia') 
                    .then((response) => response.json())  
                    .then((clientes) => {
                    let y = 150; 
            
                    clientes.forEach((cliente) => {  
                        pdf.text(`Procedencia: ${cliente.Procedencia}`, 20, y);  
                        pdf.text(`Ventas Totales: ${cliente.TotalVentas}`, 20, y + 10);  
            
                        y += 30; 
                        if (y >= 280) { 
                            pdf.addPage();
                        y = 15; 
                        }
                    });
            
                        pdf.save("reporte_ventas_procedencia.pdf");  
                    })

                    } catch (error) {
                    console.error('Error al generar el reporte con imagen:', error);
                    }
                };

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
                text: 'Ventas Totales por Categoría'
                }
            }
            }
        });
        setMyChart3(chart)
        }
    }, [categorias]);

    //Reporte 2
    const generarReporteAlmacenImg2 = async () => {
        try {
            const canvas = await html2canvas(document.getElementById('myCategories'));
            const pdf = new jsPDF();
            const imgData = canvas.toDataURL('image/png');
            pdf.text("Reporte de Ventas por Categoría", 65, 10);
            pdf.addImage(imgData, 'PNG', 46, 20, 120, 120);

            fetch('http://localhost:5000/Estadistica/ventasporcategoria') 
            .then((response) => response.json())  
            .then((categorias) => {
            let y = 150; 
    
            categorias.forEach((cate) => {  
                pdf.text(`Categoría: ${cate.NombreCategoria}`, 20, y);  
                pdf.text(`Ventas Totales: ${cate.Ventas_Totales}`, 20, y + 10);  
    
                y += 30; 
                if (y >= 280) { 
                    pdf.addPage();
                y = 15; 
                }
            });
    
                pdf.save("reporte_ventas_categoría.pdf");  
            })

            } catch (error) {
            console.error('Error al generar el reporte con imagen:', error);
            }
        };

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
        
        //Reporte 3
        const generarReporteAlmacenImg3 = async () => {
            try {
                const canvas = await html2canvas(document.getElementById('myChart4'));
                const pdf = new jsPDF();
                const imgData = canvas.toDataURL('image/png');
                pdf.text("Reporte de ventas por año", 65, 10);
                pdf.addImage(imgData, 'PNG', 30, 20, 140, 120);
    
                fetch('http://localhost:5000/Estadistica/ventasporanio') 
                .then((response) => response.json())  
                .then((fechas) => {
                let y = 150; 
        
                fechas.forEach((fecha) => {  
                    pdf.text(`Año: ${fecha.Anyo}`, 20, y);  
                    pdf.text(`Ventas Totales: ${fecha.Ventas_totales}`, 20, y + 10);  
        
                    y += 30; 
                    if (y >= 280) { 
                        pdf.addPage();
                    y = 15; 
                    }
                });
        
                    pdf.save("reporte_ventas_por_año.pdf");  
                })
    
                } catch (error) {
                console.error('Error al generar el reporte con imagen:', error);
                }
            };

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
                  label: 'Total de ventas por Mes',  // Etiqueta para la leyenda del gráfico
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
        }, [tiempos]);

    //Reporte 4
    const generarReporteAlmacenImg4 = async () => {
        try {
            const canvas = await html2canvas(document.getElementById('myChart5'));
            const pdf = new jsPDF();
            const imgData = canvas.toDataURL('image/png');
            pdf.text("Reporte de ventas por mes", 65, 10);
            pdf.addImage(imgData, 'PNG', 30, 20, 160, 120);

            fetch('http://localhost:5000/Estadistica/ventaspormes2024') 
            .then((response) => response.json())  
            .then((tiempos) => {
            let y = 150; 
    
            tiempos.forEach((tiem) => {  
                pdf.text(`Mes: ${tiem.Mes}`, 20, y);  
                pdf.text(`Ventas Totales: ${tiem.Ventas_totales}`, 20, y + 10);  
    
                y += 30; 
                if (y >= 280) { 
                    pdf.addPage();
                y = 15; 
                }
            });
    
                pdf.save("reporte_ventas_por_mes.pdf");  
            })

            } catch (error) {
            console.error('Error al generar el reporte con imagen:', error);
            }
        };

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

     //Reporte 5
        const generarReporteAlmacenImg5 = async () => {
        try {
            const canvas = await html2canvas(document.getElementById('myChart6'));
            const pdf = new jsPDF();
            const imgData = canvas.toDataURL('image/png');
            pdf.text("Reporte de ventas totales por día de un mes y año específicos", 20, 10);
            pdf.addImage(imgData, 'PNG', 20, 20, 180, 120);

            fetch('http://localhost:5000/Estadistica/ventastotal') 
            .then((response) => response.json())  
            .then((dias) => {
            let y = 150; 
    
            dias.forEach((di) => {  
                pdf.text(`Día: ${di.Dia}`, 20, y);  
                pdf.text(`Ventas Totales: ${di.Ventas_totales}`, 20, y + 10);  
    
                y += 30; 
                if (y >= 280) { 
                    pdf.addPage();
                y = 15; 
                }
            });
    
                pdf.save("reporte_ventas_por_día.pdf");  
            })

            } catch (error) {
            console.error('Error al generar el reporte con imagen:', error);
            }
        };

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

    //Reporte 6
    const generarReporteAlmacenImg6 = async () => {
        try {
            const canvas = await html2canvas(document.getElementById('myChart7'));
            const pdf = new jsPDF();
            const imgData = canvas.toDataURL('image/png');
            pdf.text("Reporte de ventas por trimestre", 65, 10);
            pdf.addImage(imgData, 'PNG', 30, 20, 160, 120);

            fetch('http://localhost:5000/Estadistica/ventasportrimestre') 
            .then((response) => response.json())  
            .then((trimestres) => {
            let y = 150; 
    
            trimestres.forEach((tri) => {  
                pdf.text(`Trimestre: ${tri.Trimestre}`, 20, y);  
                pdf.text(`Ventas Totales: ${tri.Ventas_totales}`, 20, y + 10);  
    
                y += 30; 
                if (y >= 280) { 
                    pdf.addPage();
                y = 15; 
                }
            });
    
                pdf.save("reporte_ventas_por_trimestre.pdf");  
            })

            } catch (error) {
            console.error('Error al generar el reporte con imagen:', error);
            }
        };

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

            //Reporte 
            const generarReporteAlmacenImg9 = async () => {
                try {
                    const canvas = await html2canvas(document.getElementById('myChart8'));
                    const pdf = new jsPDF();
                    const imgData = canvas.toDataURL('image/png');
                    pdf.text("Reporte de ventas totales por producto", 60, 10);
                    pdf.addImage(imgData, 'PNG', 20, 20, 180, 120);
        
                    fetch('http://localhost:5000/Estadistica/ventaspromedio') 
                    .then((response) => response.json())  
                    .then((productos1) => {
                    let y = 150; 
            
                    productos1.forEach((prod) => {  
                        pdf.text(`Nombre del Producto: ${prod.NomProducto}`, 20, y);  
                        pdf.text(`Ventas Totales: ${prod.Promedio_Ventas}`, 20, y + 10);  
            
                        y += 30; 
                        if (y >= 280) { 
                            pdf.addPage();
                        y = 15; 
                        }
                    });
            
                        pdf.save("reporte_ventas_por_productos.pdf");  
                    })
        
                    } catch (error) {
                    console.error('Error al generar el reporte con imagen:', error);
                    }
                };

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

    //Reporte 7
    const generarReporteAlmacenImg7 = async () => {
        try {
            const canvas = await html2canvas(document.getElementById('myEmpleados'));
            const pdf = new jsPDF();
            const imgData = canvas.toDataURL('image/png');
            pdf.text("Reporte de ventas por empleado", 65, 10);
            pdf.addImage(imgData, 'PNG', 46, 20, 120, 120);

            fetch('http://localhost:5000/Estadistica/ventasporempleado') 
            .then((response) => response.json())  
            .then((empleados) => {
            let y = 150; 
    
            empleados.forEach((emp) => {  
                pdf.text(`Nombre del Empleado: ${emp.NombreEmpleado}`, 20, y);  
                pdf.text(`Ventas Totales: ${emp.VentasTotales}`, 20, y + 10);  
    
                y += 30; 
                if (y >= 280) { 
                    pdf.addPage();
                y = 15; 
                }
            });
    
                pdf.save("reporte_ventas_por_empleado.pdf");  
            })

            } catch (error) {
            console.error('Error al generar el reporte con imagen:', error);
            }
        };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
    return(
        <div>
        <Header Rol={ Rol } />  

        <Container className="margen-conten" responsive>

        <Row className="g-3">

            <Col sm="12" md="6" lg="12">
                <Card>
                <Card.Body>
                    <Card.Title className='title'>Top 5 de Productos Más Vendidos</Card.Title>
                    <canvas id="myChart"  height="120"></canvas>
                </Card.Body>
                <Card.Body>
                    <Button onClick={generarReporteAlmacenImg}>
                    Generar PDF
                    </Button>
                </Card.Body>
                    </Card>
                </Col> 

                <Col sm="12" md="6" lg="12">
                <Card>
                <Card.Body>
                    <Card.Title className='title'>Ventas Totales por Procedencias</Card.Title>
                    <canvas id="myChart2"  height="120"></canvas>
                </Card.Body>
                <Card.Body>
                    <Button onClick={generarReporteAlmacenImg1}>
                    Generar PDF
                    </Button>
                </Card.Body>
                    </Card>
                </Col> 

                <Col sm="6" md="6" lg="6">
                <Card>
                <Card.Body>
                    <Card.Title className='title'>Ventas Totales Por Categoría</Card.Title>
                    <canvas id="myCategories"  height="120"></canvas>
                </Card.Body>
                <Card.Body>
                    <Button onClick={generarReporteAlmacenImg2}>
                    Generar PDF
                    </Button>
                </Card.Body>
                    </Card>

                </Col> 
                <Col sm="6" md="6" lg="6"Co>
                <Card>
                <Card.Body>
                    <Card.Title className='title'>Ventas Totales Por Empleado</Card.Title>
                    <canvas id="myEmpleados"  height="120"></canvas>
                </Card.Body>
                <Card.Body>
                    <Button onClick={generarReporteAlmacenImg7}>
                    Generar PDF
                    </Button>
                </Card.Body>
                    </Card>
                </Col> 

                <Col sm="12" md="6" lg="12">
                <Card>
                <Card.Body>
                    <Card.Title className='title'>Ventas Totales por Año</Card.Title>
                    <canvas id="myChart4"  height="120"></canvas>
                </Card.Body>
                <Card.Body>
                    <Button onClick={generarReporteAlmacenImg3}>
                    Generar PDF
                    </Button>
                </Card.Body>
                    </Card>
                </Col> 

                <Col sm="12" md="6" lg="12">
                <Card>
                <Card.Body>
                    <Card.Title className='title'>Ventas Totales por Mes</Card.Title>
                    <canvas id="myChart5"  height="120"></canvas>
                </Card.Body>
                <Card.Body>
                    <Button onClick={generarReporteAlmacenImg4}>
                    Generar PDF
                    </Button>
                </Card.Body>
                    </Card>
                </Col> 

                <Col sm="12" md="6" lg="12">
                <Card>
                <Card.Body>
                    <Card.Title className='title'>Ventas Totales Por Día de Un Mes y Año Específicos</Card.Title>
                    <canvas id="myChart6"  height="120"></canvas>
                </Card.Body>
                <Card.Body>
                    <Button onClick={generarReporteAlmacenImg5}>
                    Generar PDF
                    </Button>
                </Card.Body>
                    </Card>
                </Col> 

                <Col sm="12" md="6" lg="12">                <Card>
                <Card.Body>
                    <Card.Title className='title'>Ventas Totales por Trimestre</Card.Title>
                    <canvas id="myChart7"  height="120"></canvas>
                </Card.Body>
                <Card.Body>
                    <Button onClick={generarReporteAlmacenImg6}>
                    Generar PDF
                    </Button>
                </Card.Body>
                    </Card>
                </Col> 

                <Col sm="12" md="6" lg="12">                <Card>
                <Card.Body>
                    <Card.Title className='title'>Ventas Totales Por Producto</Card.Title>
                    <canvas id="myChart8"  height="120"></canvas>
                </Card.Body>
                <Card.Body>
                    <Button onClick={generarReporteAlmacenImg9}>
                    Generar PDF
                    </Button>
                </Card.Body>
                    </Card>
                </Col> 


            </Row>
        </Container> 


        </div>
    );
}

export default Grafico;