import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function CreateCliente() {

  // Crear un estado para cada campo del formulario
    const [NombreUsuarioC, setNombreUsuarioC] = useState('');
    const [ContraseñaC, setContraseñaC] = useState('');
    const [CorreoC, setCorreoC] = useState('');   
    const [TelefonoC, setTelefonoC] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un objeto con los datos del formulario
        const formData = {
        NombreUsuarioC,
        ContraseñaC,
        CorreoC,
        TelefonoC,
        };

        try {
        // Realizar una solicitud HTTP al backend para enviar los datos
        const response = await fetch('http://localhost:5000/crud/createCliente', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            // El registro se creó exitosamente
            alert('Registro exitoso');
            // Reiniciar los campos del formulario
            setNombreUsuarioC('');
            setContraseñaC('');
            setCorreoC('');
            setTelefonoC('');
        } else {
            alert('Error al registrar el Cliente');
        }
        } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud al servidor');
        }
    };

    return(
        <div>
        <Header />
        
        <Container>
            <Card className="mt-3">
            <Card.Body>
                <Card.Title>Nuevo Cliente</Card.Title>
                <Form className="mt-3" onSubmit={handleSubmit}>
                <Row className="g-3">

                    <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="NombreUsuarioC" label="Nombre de Usuario">
                        <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre de usuario"
                        value={NombreUsuarioC}
                        onChange={(e) => setNombreUsuarioC(e.target.value)}
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="ContraseñaC" label="Contraseña de Usuario">
                        <Form.Control
                        type="text"
                        placeholder="Ingrese su contraseña"
                        value={ContraseñaC}
                        onChange={(e) => setContraseñaC(e.target.value)}
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="8">
                    <FloatingLabel controlId="CorreoC" label="Correo">
                        <Form.Control
                        type="text"
                        placeholder="Ingrese su correo"
                        value={CorreoC}
                        onChange={(e) => setCorreoC(e.target.value)}
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="TelefonoC" label="Telefono">
                        <Form.Control
                        type="number"
                        placeholder="Ingrese su número de teléfono"
                        value={TelefonoC}
                        onChange={(e) => setTelefonoC(e.target.value)}
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

export default CreateCliente;