import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function CreateCategoria({Rol}) {

  // Crear un estado para cada campo del formulario
    const [NombreCategoria, setNombreCategoria] = useState('');

      //Validar input del nombre de la categoría
        const handleNombreCategoriaChange = (e) => {
        const nomC = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Solo agrega letras
        setNombreCategoria(nomC);
        };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        //Validar campos
    if (!NombreCategoria) {
        alert ('Debe completar los campos');
        return;
    }

        // Crear un objeto con los datos del formulario
        const formData = {
        NombreCategoria,
        };

        try {
        // Realizar una solicitud HTTP al backend para enviar los datos
        const response = await fetch('http://localhost:5000/crud/createCategoria', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            // El registro se creó exitosamente
            alert('Categoria Registrada');
            // Reiniciar los campos del formulario
            setNombreCategoria('');
        } else {
            alert('Error al registrar la categoría');
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
                <Card.Title>Registro de Categoria</Card.Title>
                <Form className="mt-3" onSubmit={handleSubmit}>
                <Row className="g-3">

                    <Col sm="6" md="6" lg="12">
                    <FloatingLabel controlId="NombreCategoria" label="Nombre de Categoria">
                        <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre de la Categoria"
                        value={NombreCategoria}
                        onChange={handleNombreCategoriaChange}
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

export default CreateCategoria;