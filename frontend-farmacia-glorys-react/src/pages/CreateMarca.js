import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function CreateMarca({Rol}) {

  // Crear un estado para cada campo del formulario
    const [NombreMarca, setNombreMarca] = useState('');

      //Validar input del nombre de la marca
        const handleNombreMarcaChange = (e) => {
        const nomM = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Solo agrega letras
        setNombreMarca(nomM);
        };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        //Validar campos
    if (!NombreMarca) {
        alert ('Debe completar los campos');
        return;
    }

        // Crear un objeto con los datos del formulario
        const formData = {
        NombreMarca,
        };

        try {
        // Realizar una solicitud HTTP al backend para enviar los datos
        const response = await fetch('http://localhost:5000/crud/createMarca', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            // El registro se creó exitosamente
            alert('Marca Registrada');
            // Reiniciar los campos del formulario
            setNombreMarca('');
        } else {
            alert('Campo vacío');
        }
        } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud al servidor');
        }
    };

    return(
        <div className='formulario-1'>
        <Header Rol={Rol}/>
        
        <Container responsive>
            <Card className="mt-3">
            <Card.Body>
                <Card.Title>Registro de Marca</Card.Title>
                <Form className="mt-3" onSubmit={handleSubmit}>
                <Row className="g-3">

                    <Col sm="6" md="6" lg="12">
                    <FloatingLabel controlId="NombreMarca" label="Nombre de Marca">
                        <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre de la Marca"
                        value={NombreMarca}
                        onChange={handleNombreMarcaChange}
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

export default CreateMarca;