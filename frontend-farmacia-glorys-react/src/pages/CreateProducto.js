import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';
import { FaPlus } from 'react-icons/fa6';

function CreateProducto({Rol}) {

  // Crear un estado para cada campo del formulario
    const [NomProducto, setNomProducto] = useState('');
    const [DescripProducto, setDescripProducto] = useState('');
    const [PrecioProducto, setPrecioProducto] = useState('');
    const [Estado, setEstado] = useState('');
    const [CantProducto, setCantProducto] = useState('');

    //Variables de estado de categoria
    const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorias
    const [IDCategoria, setIDCategoria] = useState(''); // Estado para el valor seleccionado

    //Variables de estado de marca
    const [marcas, setMarcas] = useState([]); // Estado para almacenar las marcas
    const [IDMarca, setIDMarca] = useState(''); // Estado para el valor seleccionado

    //Variables de estado de presentacion
    const [presentaciones, setPresentaciones] = useState([]); // Estado para almacenar las presentaciones
    const [IDPresentacion, setIDPresentacion] = useState(''); // Estado para el valor seleccionado
            
    const [showCategoriaModal, setShowCategoriaModal] = useState(false);
    const [showMarcaModal, setShowMarcaModal] = useState(false);
    const [showPresentacionModal, setShowPresentacionModal] = useState(false);

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

        const loadMarca = () => {
            fetch('http://localhost:5000/crud/readMarca')
                .then((response) => response.json())
                .then((data) => setMarcas(data))
                .catch((error) => console.error('Error al obtener las marcas:', error));
            };
    
            const loadCategoria = () => {
                fetch('http://localhost:5000/crud/readCategoria')
                    .then((response) => response.json())
                    .then((data) => setCategorias(data))
                    .catch((error) => console.error('Error al obtener las categorias:', error));
                };
            
            const loadPresentacion = () => {
                    fetch('http://localhost:5000/crud/readPresentacion')
                    .then((response) => response.json())
                    .then((data) => setPresentaciones(data))
                    .catch((error) => console.error('Error al obtener las presentaciones:', error));
                };
    
                useEffect(() => {
                    loadMarca();
                    loadCategoria();
                    loadPresentacion();
                }, []);

                const openMarcaModal = () => {
                    setShowMarcaModal(true);
                    };
                    
                    const closeMarcaModal = () => {
                        setShowMarcaModal(false);
                    };
                    
                    const openCategoriaModal = () => {
                        setShowCategoriaModal(true);
                    };
                    
                    const closeCategoriaModal = () => {
                        setShowCategoriaModal(false);
                    };
                
                    const openPresentacionModal = () => {
                        setShowPresentacionModal(true);
                    };
                    
                    const closePresentacionModal = () => {
                        setShowPresentacionModal(false);
                    };

    
    //Validar input de la descripción del producto
    const handleDescripProductoChange = (e) => {
    const descrip = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Solo agrega letras
    setDescripProducto(descrip);
    };


 // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
    e.preventDefault();

    //Validar los campos
    if (!NomProducto || !DescripProducto || !PrecioProducto || !Estado || !CantProducto || !imagen || !IDMarca || !IDCategoria || !IDPresentacion) {
        alert('Debe completar todos los campos');
        return;
    }

    // Crear un objeto con los datos del formulario
    const formData = {
    NomProducto,
    DescripProducto,
    PrecioProducto,
    Estado,
    CantProducto,
    imagen,
    IDMarca,
    IDCategoria,
    IDPresentacion
    };

    try {
    // Realizar una solicitud HTTP al backend para enviar los datos
    const response = await fetch('http://localhost:5000/crud/createProducto', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (response.ok) {
        // El registro se creó exitosamente
        alert('Producto Registrado');
        // Reiniciar los campos del formulario
        setNomProducto('');
        setDescripProducto('');
        setPrecioProducto('');
        setEstado('');
        setCantProducto('');
        setIDMarca('');
        setIDCategoria('');
        setIDPresentacion('');
    } else {
        alert('Los campos están vacíos');
    }
    } catch (error) {
    console.error('Error en la solicitud:', error);
    alert('Error en la solicitud al servidor');
    }
};

const [NombreMarca, setNombreMarca] = useState('');

const handleSubmitMarca = async (e) => {
    e.preventDefault();

    //Validar campos
    if (!NombreMarca) {
        alert ('Debe completar los campos');
        return;
    }

    const formData = {
        NombreMarca,
        };

        try {
        const response = await fetch('http://localhost:5000/crud/createMarca', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Marca Registrada');
            loadMarca();
            setNombreMarca('');
        } else {
            alert('Campo vacío');
        }
        } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud al servidor');
        }
    };

    const [NombreCategoria, setNombreCategoria] = useState('');

const handleSubmitCategoria = async (e) => {
    e.preventDefault();

    //Validar campos
    if (!NombreCategoria) {
        alert ('Debe completar los campos');
        return;
    }

    const formData = {
        NombreCategoria,
        };

        try {
        const response = await fetch('http://localhost:5000/crud/createCategoria', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Categoria Registrada');
            loadCategoria();
            setNombreCategoria('');
        } else {
            alert('Campo vacío');
        }
        } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud al servidor');
        }
    };

    const [NombrePresentacion, setNombrePresentacion] = useState('');

const handleSubmitPresentacion = async (e) => {
    e.preventDefault();

    //Validar campos
    if (!NombrePresentacion) {
        alert ('Debe completar los campos');
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

        if (response.ok) {
            alert('Presentacion Registrada');
            loadPresentacion();
            setNombrePresentacion('');
        } else {
            alert('Campo vacío');
        }
        } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud al servidor');
        }
    };


    return(
        <div className='formulario'>
        <Header Rol={Rol} />
        
        <Container responsive>
            <Card className="mt-5">
            <Card.Body>
                <Card.Title className="mt-3">Nuevo Producto</Card.Title>
                <div className='form-1'>
                <Form className="mt-4" onSubmit={handleSubmit}>
                <Row className="g-3">

                    <Col sm="6" md="6" lg="8">
                    <FloatingLabel controlId="NomProducto" label="Nombre del producto">
                        <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre del producto"
                        value={NomProducto}
                        onChange={(e) => setNomProducto(e.target.value)}
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="Estado" label="Estado">
                        <Form.Select 
                        aria-label="Estado"
                        value={Estado}
                        onChange={(e) => setEstado(e.target.value)}
                        >
                        <option>Seleccione el estado</option>
                        <option value="DISPONIBLE">DISPONIBLE</option>
                        <option value="AGOTADO">AGOTADO</option>
                        </Form.Select>
                    </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="12">
                    <FloatingLabel controlId="DescripProducto" label="Descripción del producto">
                        <Form.Control
                        type="text"
                        placeholder="Escriba aquí"
                        value={DescripProducto}
                        onChange={handleDescripProductoChange}
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="PrecioProducto" label="Precio del producto">
                        <Form.Control
                        type="number"
                        min={1} //mínimo de número
                        placeholder="Ingrese el precio del producto"
                        value={PrecioProducto}
                        onChange={(e) => setPrecioProducto(e.target.value)}
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="CantProducto" label="Cantidad">
                        <Form.Control
                        type="number"
                        min={1} //mínimo de número
                        placeholder="Escriba aquí"
                        value={CantProducto}
                        onChange={(e) => setCantProducto(e.target.value)}
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="12" md="6" lg="4">
                    <Form.Group controlId="imagen" className="" >
                        <Form.Control 
                        type="file" 
                        accept=".jpg, .png, .jpeg"
                        size="lg"
                        onChange={handleImagenChange}
                        />
                    </Form.Group>
                    </Col>
                    
                    <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="IDMarca" label="Marca">
                        <Form.Select
                        aria-label="Marca"
                        value={IDMarca}
                        onChange={(e) => setIDMarca(e.target.value)}
                        >
                        <option>Seleccione la marca</option>
                        {marcas.map((marca) => (
                            <option key={marca.IDMarca} value={marca.IDMarca}>
                            {marca.NombreMarca}
                            </option>
                        ))}
                        </Form.Select>
                        <div className="button-container">
                        <Button className="botones" variant="primary" onClick={openMarcaModal}>
                            <FaPlus />
                        </Button>
                    </div>
                    </FloatingLabel>
                    </Col>

                    <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="IDCategoria" label="Categoria">
                        <Form.Select
                        aria-label="Categoria"
                        value={IDCategoria}
                        onChange={(e) => setIDCategoria(e.target.value)}
                        >
                        <option>Seleccione la categoria</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.IDCategoria} value={categoria.IDCategoria}>
                            {categoria.NombreCategoria}
                            </option>
                        ))}
                        </Form.Select>
                        <div className="button-container">
                        <Button className="botones" variant="primary" onClick={openCategoriaModal}>
                            <FaPlus />
                        </Button>
                    </div>
                    </FloatingLabel>
                    </Col>

                    <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="IDPresentacion" label="Presentacion">
                        <Form.Select
                        aria-label="Presentacion"
                        value={IDPresentacion}
                        onChange={(e) => setIDPresentacion(e.target.value)}
                        >
                        <option>Seleccione la presentacion</option>
                        {presentaciones.map((presentacion) => (
                            <option key={presentacion.IDPresentacion} value={presentacion.IDPresentacion}>
                            {presentacion.NombrePresentacion}
                            </option>
                        ))}
                        </Form.Select>
                        <div className="button-container">
                        <Button className="botones" variant="primary" onClick={openPresentacionModal}>
                            <FaPlus />
                        </Button>
                    </div>
                    </FloatingLabel>
                    </Col>


                </Row>
                <div className="center-button">
                    <Button variant="primary" type="submit" className="mt-3" size="lg">
                    Registrar
                    </Button>
                </div>
                </Form>
                </div>
            </Card.Body>
            </Card>
        </Container>

        <Modal show={showMarcaModal} onHide={closeMarcaModal} responsive centered scrollable size='md'>
        <Modal.Header closeButton>
            <Modal.Title>Nueva Marca</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmitMarca}>
                <FloatingLabel controlId="NombreMarca" label="Marca">
                <Form.Control
                    type="text"
                    placeholder="Ingrese la marca"
                    value={NombreMarca}
                    onChange={(e) => setNombreMarca(e.target.value)}
                />
                </FloatingLabel>
                <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3" onClick={closeMarcaModal}>
                    Registrar
                </Button>
                </div>
            </Form>
            </Modal.Body>
        </Modal>

        <Modal show={showCategoriaModal} onHide={closeCategoriaModal} responsive centered scrollable size='md'>
        <Modal.Header closeButton>
            <Modal.Title>Nueva Categoria</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmitCategoria}>
                <FloatingLabel controlId="NombreCategoria" label="Categoria">
                <Form.Control
                    type="text"
                    placeholder="Ingrese la categoria"
                    value={NombreCategoria}
                    onChange={(e) => setNombreCategoria(e.target.value)}
                />
                </FloatingLabel>
                <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3" onClick={closeCategoriaModal}>
                    Registrar
                </Button>
                </div>
            </Form>
            </Modal.Body>
        </Modal>

        <Modal show={showPresentacionModal} onHide={closePresentacionModal} responsive centered scrollable size='md'>
        <Modal.Header closeButton>
            <Modal.Title>Nueva Presentacion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmitPresentacion}>
                <FloatingLabel controlId="NombrePresentacion" label="Presentacion">
                <Form.Control
                    type="text"
                    placeholder="Ingrese la presentacion"
                    value={NombrePresentacion}
                    onChange={(e) => setNombrePresentacion(e.target.value)}
                />
                </FloatingLabel>
                <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3" onClick={closePresentacionModal}>
                    Registrar
                </Button>
                </div>
            </Form>
            </Modal.Body>
        </Modal>

        </div>
    );
}

export default CreateProducto;