import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function CreatePresentacion({Rol}) {

  // Crear un estado para cada campo del formulario
    const [NombrePresentacion, setNombrePresentacion] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        
            if (!NombrePresentacion) {
            alert('Debe completar los campos');
            return;
            }
        
            const formData = {
            NombrePresentacion,
            };
        
            try {
            const response = await fetch('http://localhost:5000/crud/createPresentacion', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        
            const responseData = await response.json();
        
            if (response.ok) {
                alert('Presentación Registrada');
                setNombrePresentacion('');
            } else {
                // Manejar el caso cuando el servidor responde con un error
                alert(responseData.error || 'Error al registrar la presentación');
            }
            } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud al servidor');
            }
        };

    return(
        <div className='formulario-1'>
        <Header Rol={Rol} />
        
        <Container responsive>
            <Card className="mt-3">
            <Card.Body>
                <Card.Title>Registro de Presentación</Card.Title>
                <Form className="mt-3" onSubmit={handleSubmit}>
                <Row className="g-3">

                    <Col sm="6" md="6" lg="12">
                    <FloatingLabel controlId="FormaDosificacion" label="Nombre de Presentación">
                        <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre de la Presentacion"
                        value={NombrePresentacion}
                        onChange={(e) => setNombrePresentacion(e.target.value)}
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

export default CreatePresentacion;