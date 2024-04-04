import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import {FaPencil, FaTrashCan} from 'react-icons/fa6';

function MarcaList({Rol}) {
    const [marcas, setMarcas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMarca, setSelectedMarca] = useState({});
    const [formData, setFormData] = useState({
        NombreMarca: '',
    });

    const [searchQuery, setSearchQuery] = useState('');
    
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredMarcas = marcas.filter((marca) => {
        // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
        const nombremarca = marca.NombreMarca.toLowerCase();
        const search = searchQuery.toLowerCase();
    
        // Verifica si la cadena de búsqueda se encuentra en algún campo
        return (
        nombremarca.includes(search)
        );
    });

    // Función para abrir el modal y pasar los datos de la marca seleccionada
    const openModal = (marca) => {
        setSelectedMarca(marca);

        setFormData({
        NombreMarca: marca.NombreMarca,
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
        fetch('http://localhost:5000/crud/readMarca')
        .then((response) => response.json())
        .then((data) => setMarcas(data))
        .catch((error) => console.error('Error al obtener las marcas:', error));
    };


    // Función para enviar el formulario de actualización
    const handleUpdate = () => {
        // Realiza la solicitud PUT al servidor para actualizar el registro
        fetch(`http://localhost:5000/crud/updateMarca/${selectedMarca.IDMarca}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        })
        .then((response) => {
            if (response.ok) {
            // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de marcas
            setShowModal(false);
            loadMarcas(); // Cargar la lista de marcas actualizada
            }
        })
        .catch((error) => console.error('Error al actualizar el registro:', error));
    };

    // Función para eliminar un servicio
    const handleDelete = (idMarca) => {
        const confirmation = window.confirm('¿Seguro que deseas eliminar esta marca?');
        if (confirmation) {
        // Realiza la solicitud DELETE al servidor para eliminar la marca
        fetch(`http://localhost:5000/crud/deleteMarca/${idMarca}`, {
            method: 'DELETE',
        })
            .then((response) => {
            if (response.ok) {
                // La eliminación fue exitosa, refresca la lista de marcas
                loadMarcas();
            }
            })
            .catch((error) => console.error('Error al eliminar la marca:', error));
        }
    };

    // Realiza una solicitud GET al servidor para obtener las marcas
    useEffect(() => {
        fetch('http://localhost:5000/crud/readMarca')
        .then((response) => response.json())
        .then((data) => setMarcas(data))
        .catch((error) => console.error('Error al obtener las marcas:', error));
    }, []);

    return (
        <div>
        <Header Rol={Rol} />

        <Card className="margen" responsive>
            <Card.Body>
            <Card.Title className="titulo-2">Marcas</Card.Title>

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
                    <th>Nombre de Marca</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {filteredMarcas.map((marca) => (
                    <tr key={marca.IDMarca}>
                    <td>{marca.IDMarca}</td>
                    <td>{marca.NombreMarca}</td>
                    <td>
                        <Button variant="primary" onClick={() => openModal(marca)}><FaPencil/></Button>
                        <Button variant="danger" onClick={() => handleDelete(marca.IDMarca)}><FaTrashCan/></Button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </Card.Body>
        </Card>

        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" responsive>
            <Modal.Header closeButton>
            <Modal.Title>Actualizar Marca</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Card className="mt-3">
                <Card.Body>
                <Card.Title>Registro de Marca</Card.Title>
                <Form className="mt-3">
                    <Row className="g-3">

                    <Col sm="6" md="6" lg="12">
                        <FloatingLabel controlId="NombreMarca" label="Nombre de Marca">
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre de la marca"
                            name="NombreMarca"
                            value={formData.NombreMarca}
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

export default MarcaList;
