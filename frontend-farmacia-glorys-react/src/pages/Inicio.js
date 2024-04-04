import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import Navbar from 'react-bootstrap/Navbar'; // Importa el componente Navbar de Bootstrap
import { Row, Col, Card, Badge, Form, FloatingLabel } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav'; // Importa el componente Nav de Bootstrap
import Button from 'react-bootstrap/Button'; // Importa el componente Button de Bootstrap
import Container from 'react-bootstrap/Container'; // Importa el componente Container de Bootstrap
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/App.css';
import { FaCartPlus} from 'react-icons/fa6';
import logo from '../components/logo.png';
import { FaUser } from "react-icons/fa6";
import { BsCartFill } from "react-icons/bs";

function Inicio() {
    const [showMenu, setShowMenu] = useState(false);

    const [servicios, setServicios] = useState([]); 
    const [searchQuery, setSearchQuery] = useState(''); 
    const [productos, setProductos] = useState([]); 
    const [marcas, setMarcas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [presentaciones, setPresentaciones] = useState([]);

    const filteredServicios = servicios.filter((servicio) => {  // Filtra los productos según la cadena de búsqueda
        // Convierte a minúsculas los valores de los campos para realizar una búsqueda insensible a mayúsculas y minúsculas
        const nombres = servicio.NombreS.toLowerCase(); 
        const descripcion = servicio.Descripcion;
        const estados = servicio.EstadoS;
        const search = searchQuery.toLowerCase();
        
        // Devuelve un nuevo array con los productos filtrados
        return (
        nombres.includes(search) ||
        descripcion.includes(search) ||
        estados.includes(search)
        );

    });

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

    useEffect(() => {  
        fetch('http://localhost:5000/crud/readServicio')  // Realiza una petición GET al servidor
        .then((response) => response.json())  // Convierte la respuesta a formato JSON
        .then((data) => setServicios(data)) 
        .catch((error) => console.error('Error al obtener los servicios:', error)); 
    }, []);  // Se ejecuta solo en la primera renderización del componente

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

const toggleMenu = () => {
    setShowMenu(!showMenu);
};

    return (

    <div>
    {/* Navbar principal */}
    <Navbar className="navbar-color" variant="dark" expand="md" fixed='top'>
    <Container>
    <img src={logo} alt="Logo" className="brand-logo" style={{ maxWidth: '50px' }}/>
            <Navbar.Brand href="#home" className='nombre'>Farmacia Glorys</Navbar.Brand>
        <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        style={{ display: 'none' }}
        className="d-sm-none d-xs-none"
        />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">

                <Nav.Link>
                <Link to="/" className="link-unstyled">Inicio</Link>
                </Nav.Link>

                <Nav.Link>
                <Link to="/inicio" className="link-unstyled"><FaUser /> Iniciar Sesión</Link>
                </Nav.Link>

                <Nav.Link>
                <Link to="/registrarse" className="link-unstyled">Registrarse</Link>
                </Nav.Link>

                <Nav.Link>
                <Link to="/compra" className="link-unstyled"><BsCartFill /> Carrito</Link>
                </Nav.Link>

                </Nav>
            </Navbar.Collapse>
            <Button
                variant="outline-light"
                onClick={toggleMenu}
                className="d-md-none d-block"
                aria-controls="basic-navbar-nav"
                aria-expanded={showMenu ? 'true' : 'false'}
            >
                Menú
            </Button>
            </Container>
        </Navbar>

        <Container className="margen1" responsive>
        <Card.Title className="titulo">Algunos Productos</Card.Title>
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

        <Container className="margen1" responsive>
        <Card.Title className="titulo">Algunos Servicios</Card.Title>
        <Row className="g-3">
            {filteredServicios.map((servicio) => (
            <Col sm="12" md="12" lg="6">
                <Card className='producto'>
                <Badge className='estado' bg="success">{servicio.EstadoS}</Badge>
                <Card.Img className="image-card1" variant="top" src={servicio.imagen} alt={servicio.NombreS} />
                <Card.Body>
                    <Card.Title className='title'>{servicio.NombreS}</Card.Title>
                    <Card.Text>
                    {servicio.Descripcion}
                    </Card.Text>
                    <div>
                    <Badge bg="warning" text="dark" className='precio-precio1'>
                    <div className='precio1'>
                        C$ {servicio.PrecioS.toFixed(2)}
                        </div>
                    </Badge>
                    </div>
                </Card.Body>
                <Card.Body>
                <Button className='boton1' variant="primary">Solicitar servicio</Button>
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
    