import React, { useState, useEffect } from 'react';  // Importa las funciones useState y useEffect de React
import { Row, Col, Container, Card, Badge, Form, Button, Modal, FloatingLabel } from 'react-bootstrap';  // Importa componentes de react-bootstrap
import Header from '../components/Header';  // Importa el componente Header desde su ubicación relativa
import '../styles/App.css';  // Importa estilos CSS del archivo App.css
import { BsCardText } from 'react-icons/bs';

function CatalogoServicio({ Rol }) {  // Define un componente funcional Galeria que recibe props

    const [servicios, setServicios] = useState([]); 
    const [searchQuery, setSearchQuery] = useState('');  // Crea un estado para almacenar la cadena de búsqueda

    const [showServicioModal, setShowServicioModal] = useState(false);
    const [selectedServicio, setSelectedServicio] = useState({});
    const [formData, setFormData] = useState({
        NombreS: '',
        Descripcion: '',
        PrecioS: '',
        EstadoS: '',
        imagen: ''
    });

    const openModalServicio = (servicio) => {
        setSelectedServicio(servicio);

        setFormData({
        NombreS: servicio.NombreS,
        Descripcion: servicio.Descripcion,
        PrecioS: servicio.PrecioS,
        EstadoS: servicio.EstadoS,
        imagen: servicio.imagen
        });
        setShowServicioModal(true);
    };

    const handleServicio = () => {

        fetch(`http://localhost:5000/crud/readServicio/${selectedServicio.IDServicio}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        })
        .then((response) => {
            if (response.ok) {
            setShowServicioModal(false);
            }
        })
        .catch((error) => console.error('Error al obtener el servicio:', error));
    };


    const handleSearchChange = (e) => {  // Función para manejar cambios en la búsqueda
        setSearchQuery(e.target.value);  // Actualiza el estado con la cadena de búsqueda ingresada
    };

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

    useEffect(() => {  
        fetch('http://localhost:5000/crud/readServicio')  // Realiza una petición GET al servidor
        .then((response) => response.json())  // Convierte la respuesta a formato JSON
        .then((data) => setServicios(data)) 
        .catch((error) => console.error('Error al obtener los servicios:', error)); 
    }, []);  // Se ejecuta solo en la primera renderización del componente

    return (
        <div className='formulario'>
        <Header Rol={ Rol } />

        <div className='contenedor'>
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
                <Button className="detalles1" variant="primary">
                            <BsCardText/>
                        </Button>
                </Card.Body>
                </Card>
            </Col>            
            ))}
        </Row>
        </Container>
        </div>

        <Modal show={showServicioModal} onHide={() => setShowServicioModal(false)}responsive>
        <Modal.Header closeButton>
            <Modal.Title>Solicitar Servicio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {filteredServicios.map((servicio) => (
            <Col sm="12" md="12" lg="12">
                <Card>
                <Card.Img className="image-card" variant="top" src={servicio.imagen} alt={servicio.NombreS} />
                <Card.Body>
                    <Card.Title>{servicio.NombreS}</Card.Title>
                    <Card.Text>
                    {servicio.Descripcion}
                    </Card.Text>
                    <div>
                    <Badge bg="success">Estado: {servicio.EstadoS}</Badge>
                    <Badge bg="warning" text="dark">
                        Precio: {servicio.PrecioS}%
                    </Badge>
                    </div>
                </Card.Body>
                </Card>
            </Col>                
            ))}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowServicioModal(false)}>
                Cerrar
            </Button>
            </Modal.Footer>
        </Modal>

    </div>
    );
}

export default CatalogoServicio;  // Exporta el componente 
