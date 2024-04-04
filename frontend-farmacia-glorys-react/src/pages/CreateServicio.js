import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function CreateServicio({Rol}) {

  // Crear un estado para cada campo del formulario
    const [NombreS, setNombreS] = useState('');
    const [EstadoS, setEstadoS] = useState('');
    const [Descripcion, setDescripcion] = useState('');
    const [PrecioS, setPrecioS] = useState('');

       //Variables de estado de una imagen
    const [imagen, setImagen] = useState('');

    const handleImagenChange = (event) => {
        const file = event.target.files[0]; // Obtener el primer archivo seleccionado
    
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result; // Obtener la imagen en formato base64
          setImagen(base64String); // Puedes visualizar la imagen en base64 en la consola para asegurarte de que la conversión se hizo correctamente
        }; 
        if (file) {
          reader.readAsDataURL(file); // Lee el contenido del archivo como base64
        }
    };

      //Validar input del nombre del servicio
        const handleNombreServicioChange = (e) => {
        const nomS = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Solo agrega letras
        setNombreS(nomS);
        };

        const handleDescripServicioChange = (e) => {
            const descrip = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Solo agrega letras
            setDescripcion(descrip);
            };

  // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

              //Validar campos
    if (!NombreS || !EstadoS || !Descripcion || !PrecioS || !imagen) {
        alert ('Debe completar los campos');
        return;
    }

        // Crear un objeto con los datos del formulario
        const formData = {
        NombreS,
        EstadoS,
        Descripcion,
        PrecioS,
        imagen
        };

        try {
        // Realizar una solicitud HTTP al backend para enviar los datos
        const response = await fetch('http://localhost:5000/crud/createServicio', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            // El registro se creó exitosamente
            alert('Servicio Registrado');
            // Reiniciar los campos del formulario
            setNombreS('');
            setEstadoS('');
            setDescripcion('');
            setPrecioS('');
        } else {
            alert('Los campos están vacíos');
        }
        } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud al servidor');
        }
    };
    
    return(
        <div>
        <Header Rol={Rol}/>
        
        <Container>
            <Card className="formulario">
            <Card.Body>
                <Card.Title>Nuevo Servicio</Card.Title>
                <Form className="mt-3" onSubmit={handleSubmit}>
                <Row className="g-3">

                    <Col sm="6" md="6" lg="8">
                    <FloatingLabel controlId="NombreS" label="Nombre de Servicio">
                        <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre del Servicio"
                        value={NombreS}
                        onChange={handleNombreServicioChange}
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="EstadoS" label="Estado">
                        <Form.Select 
                        aria-label="Estado"
                        value={EstadoS}
                        onChange={(e) => setEstadoS(e.target.value)}
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
                        value={Descripcion}
                        onChange={handleDescripServicioChange}
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="12" md="6" lg="8">
                    <Form.Group controlId="imagen" className="" >
                        <Form.Control 
                        type="file" 
                        accept=".jpg, .png, .jpeg"
                        size="lg"
                        onChange={handleImagenChange}
                        />
                    </Form.Group>
                    </Col>

                    <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="PrecioS" label="Precio del Servicio">
                        <Form.Control
                        type="number"
                        min={1}
                        placeholder="Ingrese el precio del Servicio"
                        value={PrecioS}
                        onChange={(e) => setPrecioS(e.target.value)}
                        />
                    </FloatingLabel>
                    </Col>

                </Row>
                <div className="center-button">
                    <Button variant="primary" type="submit" className="mt-3" size="lg">
                    Registrar
                    </Button>
                </div>
                </Form>
            </Card.Body>
            </Card>
        </Container>

        </div>
    );
}

export default CreateServicio;