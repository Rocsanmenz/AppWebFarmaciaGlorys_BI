import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import '../styles/App.css';

function CreateEmpleado() {
  const [NombreUsuario, setNombreUsuario] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [Rol, setRol] = useState('');
  const [Correo, setCorreo] = useState('');
  const [Telefono, setTelefono] = useState('');

  const [formErrors, setFormErrors] = useState({
    NombreUsuario: '',
    Contraseña: '',
    Rol: '',
    Correo: '',
    Telefono: ''
  });

  const handleTelefonoChange = (e) => {
    const telf = e.target.value.replace(/[^0-9]/g, '');
    setTelefono(telf);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!NombreUsuario) {
      errors.NombreUsuario = 'Ingrese un nombre de usuario';
    }

    if (!Contraseña) {
      errors.Contraseña = 'Ingrese una contraseña';
    }

    if (!Rol) {
      errors.Rol = 'Seleccione el rol';
    }

    if (!Correo) {
      errors.Correo = 'Ingrese un correo';
    }

    if (!Telefono) {
      errors.Telefono = 'Ingrese un número de teléfono';
    }

    setFormErrors(errors);

    if (Object.values(errors).some((error) => error !== '')) {
      return;
    }

    const formData = {
      NombreUsuario,
      Contraseña,
      Rol,
      Correo,
      Telefono,
    };

    try {
      const response = await fetch('http://localhost:5000/crud/createEmpleado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Cuenta creada');
        setNombreUsuario('');
        setContraseña('');
        setRol('');
        setCorreo('');
        setTelefono('');
      } else {
        alert('Error al registrar la cuenta');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  return (
    <div className="section">
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Row className="justify-content-md-center">
          <Col md={12}>
            <Card>
              <Card.Body>
                <div className="h2">
                  <Card.Title className="mb-3">Crear Cuenta</Card.Title>
                </div>
                <div className="form">
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col sm="12" md="12" lg="12" className="mb-3">
                        <FloatingLabel controlId="NombreUsuario" label="Ingrese su usuario">
                          <Form.Control
                            placeholder="Ingrese su usuario"
                            type="text"
                            value={NombreUsuario}
                            onChange={(e) => setNombreUsuario(e.target.value)}
                            pattern="[a-zA-Z]+[a-zA-Z0-9_]*"
                            minLength="6"
                            maxLength="20"
                          />
                        </FloatingLabel>
                        {formErrors.NombreUsuario && <div className="error-message">{formErrors.NombreUsuario}</div>}
                      </Col>
                      <Col sm="12" md="12" lg="12" className="mb-3">
                        <FloatingLabel controlId="Contraseña" label="Ingrese su contraseña">
                          <Form.Control
                            placeholder="Ingrese su contraseña"
                            type={showPassword ? 'text' : 'password'}
                            value={Contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,8}$"
                            title="Debe contener 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial."
                          />
                          <Button
                            variant="link"
                            className="show-password-button"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                          </Button>
                        </FloatingLabel>
                        {formErrors.Contraseña && <div className="error-message">{formErrors.Contraseña}</div>}
                      </Col>
                      <Col sm="12" md="12" lg="12" className="mb-3">
                        <FloatingLabel controlId="Correo" label="Ingrese su correo">
                          <Form.Control
                            placeholder="Ingrese su correo"
                            type="email"
                            value={Correo}
                            onChange={(e) => setCorreo(e.target.value)}
                          />
                        </FloatingLabel>
                        {formErrors.Correo && <div className="error-message">{formErrors.Correo}</div>}
                      </Col>
                      <Col sm="12" md="12" lg="12" className="mb-3">
                        <FloatingLabel controlId="Telefono" label="Ingrese su número">
                          <Form.Control
                            placeholder="Ingrese su número"
                            type="text"
                            value={Telefono}
                            onChange={handleTelefonoChange}
                          />
                        </FloatingLabel>
                        {formErrors.Telefono && <div className="error-message">{formErrors.Telefono}</div>}
                      </Col>
                      <Col sm="12" md="12" lg="12">
                        <FloatingLabel controlId="Rol" label="Rol">
                          <Form.Select
                            aria-label="Rol"
                            value={Rol}
                            onChange={(e) => setRol(e.target.value)}
                          >
                            <option>Seleccione el rol</option>
                            <option value="Vendedor">Vendedor</option>
                            <option value="Contador">Contador</option>
                          </Form.Select>
                        </FloatingLabel>
                        {formErrors.Rol && <div className="error-message">{formErrors.Rol}</div>}
                      </Col>
                    </Row>
                    <div className="center-button">
                      <Button variant="primary" type="submit" block className="mt-3">
                        Crear Cuenta
                      </Button>
                    </div>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CreateEmpleado;
