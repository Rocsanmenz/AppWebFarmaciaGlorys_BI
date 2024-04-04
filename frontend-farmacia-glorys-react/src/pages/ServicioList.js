import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaPencil, FaTrashCan} from 'react-icons/fa6';

function ServicioList({Rol}) {
    const [servicios, setServicios] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedServicio, setSelectedServicio] = useState({});
    const [formData, setFormData] = useState({
        NombreS: '',
        EstadoS: '',
        Descripcion: '',
        PrecioS: '',
        imagen: ''
    });

    const [searchQuery, setSearchQuery] = useState('');

    const handleImagenChange = (event) => {
        const file = event.target.files[0]; // Obtener el primer archivo seleccionado
        
            const reader = new FileReader();
            reader.onload = () => {
            const base64String = reader.result; // Obtener la imagen en formato base64
            setFormData({
                ...formData,
                imagen: base64String
            });
            }; 
            if (file) {
            reader.readAsDataURL(file); // Lee el contenido del archivo como base64
            }
        };
    
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredServicios = servicios.filter((servicio) => {
        // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
        const nombres = servicio.NombreS.toLowerCase();
        const estados = servicio.EstadoS.toLowerCase();
        const descripcion = servicio.Descripcion.toLowerCase();
        const search = searchQuery.toLowerCase();
    
        // Verifica si la cadena de búsqueda se encuentra en algún campo
        return (
        nombres.includes(search) ||
        estados.includes(search) ||
        descripcion.includes(search)
        );
    });

    // Función para abrir el modal y pasar los datos del servicio seleccionado
    const openModal = (servicio) => {
        setSelectedServicio(servicio);

        setFormData({
        NombreS: servicio.NombreS,
        EstadoS: servicio.EstadoS,
        Descripcion: servicio.Descripcion,
        PrecioS: servicio.PrecioS,
        imagen: servicio.imagen
        });
        setShowModal(true);
    };

    // Función para manejar cambios en el formulario
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const loadServicios = () => {
        fetch('http://localhost:5000/crud/readServicio')
        .then((response) => response.json())
        .then((data) => setServicios(data))
        .catch((error) => console.error('Error al obtener los servicios:', error));
    };


    // Función para enviar el formulario de actualización
    const handleUpdate = () => {
        // Realiza la solicitud PUT al servidor para actualizar el registro
        fetch(`http://localhost:5000/crud/updateServicio/${selectedServicio.IDServicio}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        })
        .then((response) => {
            if (response.ok) {
            // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de servicios
            setShowModal(false);
            loadServicios(); // Cargar la lista de servicios actualizada
            }
        })
        .catch((error) => console.error('Error al actualizar el registro:', error));
    };

    // Función para eliminar un servicio
    const handleDelete = (idServicio) => {
        const confirmation = window.confirm('¿Seguro que deseas eliminar este servicio?');
        if (confirmation) {
        // Realiza la solicitud DELETE al servidor para eliminar el servicio
        fetch(`http://localhost:5000/crud/deleteServicio/${idServicio}`, {
            method: 'DELETE',
        })
            .then((response) => {
            if (response.ok) {
                // La eliminación fue exitosa, refresca la lista de servicios
                loadServicios();
            }
            })
            .catch((error) => console.error('Error al eliminar el servicio:', error));
        }
    };

    // Realiza una solicitud GET al servidor para obtener los servicios
    useEffect(() => {
        fetch('http://localhost:5000/crud/readServicio')
        .then((response) => response.json())
        .then((data) => setServicios(data))
        .catch((error) => console.error('Error al obtener los servicios:', error));
    }, []);

    return (
        <div>
        <Header Rol={Rol}/>

        <Card className="margen">
            <Card.Body>
            <Card.Title className="titulo-2">Servicios</Card.Title>

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

            <Table striped bordered hover className='table'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre del Servicio</th>
                    <th>Imagen</th>
                    <th>C$</th>
                    <th>Estado</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {filteredServicios.map((servicio) => (
                    <tr key={servicio.IDServicio}>
                    <td>{servicio.IDServicio}</td>
                    <td>{servicio.NombreS}</td>
                    <td><img src={servicio.imagen} alt={servicio.NombreS} style={{ maxWidth: '100px' }} /></td>
                    <td>{servicio.PrecioS}</td>
                    <td>{servicio.EstadoS}</td>
                    <td>{servicio.Descripcion}</td>
                    <td>
                        <Button variant="primary" onClick={() => openModal(servicio)}><FaPencil/></Button>
                        <Button variant="danger" onClick={() => handleDelete(servicio.IDServicio)}><FaTrashCan/></Button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </Card.Body>
        </Card>

        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Actualizar Servicio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Card className="mt-3">
                <Card.Body>
                <Card.Title>Registro de Servicio</Card.Title>
                <Form className="mt-3">
                    <Row className="g-3">

                    <Col sm="6" md="6" lg="8">
                        <FloatingLabel controlId="NombreS" label="Nombre">
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre del servicio"
                            name="NombreS"
                            value={formData.NombreS}
                            onChange={handleFormChange}
                        />
                        </FloatingLabel>
                    </Col>

                    <Col sm="12" md="6" lg="4">
                        <FloatingLabel controlId="EstadoS" label="Estado">
                        <Form.Select 
                            aria-label="Estado"
                            name="EstadoS"
                            value={formData.EstadoS}
                            onChange={handleFormChange}
                        >
                            <option>Seleccione el estado</option>
                            <option value="DISPONIBLE">DISPONIBLE</option>
                            <option value="EN ESPERA">EN ESPERA</option>
                        </Form.Select>
                        </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="12">
                        <FloatingLabel controlId="Descripcion" label="Descripción">
                        <Form.Control
                            type="text"
                            placeholder="Escriba aquí"
                            name="Descripcion"
                            value={formData.Descripcion}
                            onChange={handleFormChange}
                        />
                        </FloatingLabel>
                    </Col>

                    <Col sm="12" md="12" lg="6">
                    <Form.Group controlId="imagen" className="" >
                        <Form.Control 
                            type="file" 
                            accept=".jpg, .png, .jpeg"
                            size="lg"
                            name="imagen"
                            onChange={handleImagenChange}
                        />
                        </Form.Group>
                    </Col>

                    <Col sm="6" md="6" lg="6">
                        <FloatingLabel controlId="PrecioS" label="Precio del servicio">
                        <Form.Control
                            type="number"
                            placeholder="Ingrese el precio del servicio"
                            name="PrecioS"
                            value={formData.PrecioS}
                            onChange={handleFormChange}
                        />
                        </FloatingLabel>
                    </Col>

                    </Row>
                </Form>
                </Card.Body>
            </Card>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cerrar
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
                Actualizar
            </Button>
            </Modal.Footer>
        </Modal>

        </div>
    );
}

export default ServicioList;
