import React, { useState, useEffect } from 'react';  // Importa las funciones useState y useEffect de React
import { Row, Col, Container, Card, Badge, FloatingLabel, Form } from 'react-bootstrap';  // Importa componentes de react-bootstrap
import Header from '../components/Header';  // Importa el componente Header desde su ubicación relativa
import '../styles/App.css';  // Importa estilos CSS del archivo App.css
import Footer from '../components/Footer';
import Button from 'react-bootstrap/Button'; // Importa el componente Button de Bootstrap
import { FaCartPlus} from 'react-icons/fa6';

function Inicio({Rol}) {

    const [productos, setProductos] = useState([]);  // Crea un estado para almacenar la lista de productos
    const [searchQuery, setSearchQuery] = useState('');
    const [marcas, setMarcas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [presentaciones, setPresentaciones] = useState([]);

    const handleSearchChange = (e) => {  // Función para manejar cambios en la búsqueda
        setSearchQuery(e.target.value);  // Actualiza el estado con la cadena de búsqueda ingresada
        };

        const filteredProductos = productos.filter((producto) => {  // Filtra los productos según la cadena de búsqueda
            // Convierte a minúsculas los valores de los campos para realizar una búsqueda insensible a mayúsculas y minúsculas
            const idproducto = producto.IDProducto;
            const nomproducto = producto.NomProducto.toLowerCase(); 
            const descripproducto = producto.DescripProducto.toLowerCase();
            const precioproducto = producto.PrecioProducto;
            const cantproducto = producto.CantProducto;
            const marca = marcas.find((marca) => marca.IDMarca === producto.IDMarca)?.NombreMarca.toLowerCase();
            const categoria = categorias.find((categoria) => categoria.IDCategoria === producto.IDCategoria)?.NombreCategoria.toLowerCase();
            const presentacion = presentaciones.find((presentacion) => presentacion.IDPresentacion === producto.IDPresentacion)?.NombrePresentacion.toLowerCase();
            const estado = producto.Estado.toLowerCase();
            const search = searchQuery.toLowerCase();
            
            // Verifica si la cadena de búsqueda se encuentra en algún campo de los productos
            // Devuelve un nuevo array con los productos filtrados
            return (
                idproducto === (search) ||
                nomproducto.includes(search) ||
                descripproducto.includes(search) ||
                precioproducto === (search) ||
                cantproducto === (search) ||
                marca.includes(search) ||
                categoria.includes(search) ||
                presentacion.includes(search) ||
                estado.includes(search)
                );
        
            });

            useEffect(() => {  // Realiza una solicitud GET al servidor para obtener los productos
                fetch('http://localhost:5000/crud/readProducto')  // Realiza una petición GET al servidor
                .then((response) => response.json())  // Convierte la respuesta a formato JSON
                .then((data) => setProductos(data))  // Actualiza el estado con la lista de productos obtenida
                .catch((error) => console.error('Error al obtener los productos:', error));  // Maneja errores en la obtención de productos
            }, []);  // Se ejecuta solo en la primera renderización del componente
        
            const loadMarcas = () => {
                fetch('http://localhost:5000/crud/readMarca')
                    .then((response) => response.json())
                    .then((data) => setMarcas(data))
                    .catch((error) => console.error('Error al obtener las marcas:', error));
                };
        
                const loadCategorias = () => {
                    fetch('http://localhost:5000/crud/readCategoria')
                    .then((response) => response.json())
                    .then((data) => setCategorias(data))
                    .catch((error) => console.error('Error al obtener las categorias:', error));
                };
        
                const loadPresentaciones = () => {
                    fetch('http://localhost:5000/crud/readPresentacion')
                    .then((response) => response.json())
                    .then((data) => setPresentaciones(data))
                    .catch((error) => console.error('Error al obtener las presentaciones:', error));
                };
        
                // Realiza una solicitud GET al servidor para obtener los datos
                useEffect(() => {
                    loadMarcas();
                    loadCategorias();
                    loadPresentaciones();
                }, []);

    return (

    <div>
        <Header Rol={ Rol } />
        <Container className="margen1" responsive>
        <Row className="mb-3">
        <Col sm="6" md="6" lg="12">
            <FloatingLabel controlId="search" label="Buscar">
                <Form.Control
                type="text"
                placeholder="Buscar"
                value={searchQuery}
                onChange={handleSearchChange}
                />
            </FloatingLabel>
            </Col>
        </Row>

        <Card.Title className="titulo">Productos</Card.Title>
        <Row className="g-3">
            {filteredProductos.map((producto) => (
            <Col sm="12" md="4" lg="3">
                <Card className='producto'>
                <Badge className='estado' bg="success">{producto.Estado}</Badge>
                <Card.Img className="image-card" variant="top" src={producto.imagen} alt={producto.NomProducto} />
                <Card.Body>
                    <Card.Title className='title'>{producto.NomProducto}</Card.Title>
                    <Card.Text>
                    {producto.DescripProducto}
                    </Card.Text>
                    <div>
                    <Badge bg="primary">Marca: {marcas.find((marca) => marca.IDMarca === producto.IDMarca)?.NombreMarca}</Badge>
                    <Badge bg="primary">Categoría: {categorias.find((categoria) => categoria.IDCategoria === producto.IDCategoria)?.NombreCategoria}</Badge>
                    <Badge bg="primary">Presentación: {presentaciones.find((presentacion) => presentacion.IDPresentacion === producto.IDPresentacion)?.NombrePresentacion}</Badge>
                    <Badge bg="warning" text="dark" className='precio-precio'> 
                        <div className='precio'>
                        C$ {producto.PrecioProducto.toFixed(2)}
                        </div>
                    </Badge>
                    </div>
                </Card.Body>
                <Card.Body>
                <div className="button-container">
                        <div className="button-container">
                        <Button className="boton-1" variant="primary">
                            <FaCartPlus/> Agregar al carrito
                        </Button>
                    </div>
                    </div>
                </Card.Body>
                </Card>
            </Col>                
            ))}
        </Row>
        </Container>


        <Footer/>

    </div>
);
            }  
    
    export default  Inicio; 