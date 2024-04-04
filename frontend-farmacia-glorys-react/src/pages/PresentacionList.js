import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import {FaPencil, FaTrashCan} from 'react-icons/fa6';

function PresentacionList({Rol}) {
    const [presentaciones, setPresentaciones] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPresentacion, setSelectedPresentacion] = useState({});
    const [formData, setFormData] = useState({
        NombrePresentacion: '',
    });

    const [searchQuery, setSearchQuery] = useState('');
    
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredPresentaciones = presentaciones.filter((presentacion) => {
        // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
        const nombrepresentacion = presentacion.NombrePresentacion.toLowerCase();
        const search = searchQuery.toLowerCase();
    
        // Verifica si la cadena de búsqueda se encuentra en algún campo
        return (
        nombrepresentacion.includes(search)
        );
    });

    // Función para abrir el modal y pasar los datos de la marca seleccionada
    const openModal = (presentacion) => {
        setSelectedPresentacion(presentacion);

        setFormData({
        NombrePresentacion: presentacion.NombrePresentacion,
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

    const loadMarcas = () => {
        fetch('http://localhost:5000/crud/readPresentacion')
        .then((response) => response.json())
        .then((data) => setPresentaciones(data))
        .catch((error) => console.error('Error al obtener las presentaciones:', error));
    };


    // Función para enviar el formulario de actualización
    const handleUpdate = () => {
        // Realiza la solicitud PUT al servidor para actualizar el registro
        fetch(`http://localhost:5000/crud/updatePresentacion/${selectedPresentacion.IDPresentacion}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        })
        .then((response) => {
            if (response.ok) {
            // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de presentaciones
            setShowModal(false);
            loadMarcas(); // Cargar la lista de presentaciones actualizada
            }
        })
        .catch((error) => console.error('Error al actualizar el registro:', error));
    };

    // Función para eliminar un servicio
    const handleDelete = (idPresentacion) => {
        const confirmation = window.confirm('¿Seguro que deseas eliminar esta presentacion?');
        if (confirmation) {
        // Realiza la solicitud DELETE al servidor para eliminar la presentación
        fetch(`http://localhost:5000/crud/deletePresentacion/${idPresentacion}`, {
            method: 'DELETE',
        })
            .then((response) => {
            if (response.ok) {
                // La eliminación fue exitosa, refresca la lista de presentaciones
                loadMarcas();
            }
            })
            .catch((error) => console.error('Error al eliminar la presentación:', error));
        }
    };

    // Realiza una solicitud GET al servidor para obtener las presentaciones
    useEffect(() => {
        fetch('http://localhost:5000/crud/readPresentacion')
        .then((response) => response.json())
        .then((data) => setPresentaciones(data))
        .catch((error) => console.error('Error al obtener las presentaciones:', error));
    }, []);

    return (
        <div>
        <Header Rol={Rol} />

        <Card className="margen" responsive>
            <Card.Body>
            <Card.Title className="titulo-2">Presentaciones</Card.Title>

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
                    <th>Nombre de Presentación</th>
                </tr>
                </thead>
                <tbody>
                {filteredPresentaciones.map((presentacion) => (
                    <tr key={presentacion.IDPresentacion}>
                    <td>{presentacion.IDPresentacion}</td>
                    <td>{presentacion.NombrePresentacion}</td>
                    <td>
                        <Button variant="primary" onClick={() => openModal(presentacion)}><FaPencil/></Button>
                        <Button variant="danger" onClick={() => handleDelete(presentacion.IDPresentacion)}><FaTrashCan/></Button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </Card.Body>
        </Card>

        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" responsive>
            <Modal.Header closeButton>
            <Modal.Title>Actualizar Presentación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Card className="mt-3">
                <Card.Body>
                <Card.Title>Registro de Presentación</Card.Title>
                <Form className="mt-3">
                    <Row className="g-3">

                    <Col sm="6" md="6" lg="12">
                        <FloatingLabel controlId="NombrePresentacion" label="Nombre de Presentación">
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre de la presentación"
                            name="NombrePresentacion"
                            value={formData.NombrePresentacion}
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

export default PresentacionList;
