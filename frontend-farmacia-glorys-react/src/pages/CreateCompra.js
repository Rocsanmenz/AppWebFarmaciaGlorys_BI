import React , { useState, useEffect } from 'react';
import { Button, Container, Card, Row, Col, Form, Modal, FloatingLabel, Table } from 'react-bootstrap';
import { FaSearch, FaPlus, FaTrashAlt } from 'react-icons/fa';
import Header from '../components/Header';
import '../styles/App.css';
import Footer from '../components/Footer';

function Compra({ Rol }) {

    const [formData, setFormData] = useState({
        IDEmpleado: '',
        IDCliente: '',
        IDProducto: '',
    });

    const [CantProductos, setCantProductos] = useState('');
    const [TipoEntrega, setTipoEntrega] = useState('');
    const [EstadoC, setEstadoC] = useState('');
    const [DirecCompra, setDireCompra] = useState('');

    const [empleados, setEmpleados] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);

    const [detalleCompra, setDetalleCompra] = useState([]);

    const [showClienteModal, setShowClienteModal] = useState(false);
    const [showEmpleadoModal, setShowEmpleadoModal] = useState(false);
    const [showProductoModal, setShowProductoModal] = useState(false);

    const [selectedCliente, setSelectedCliente] = useState(null);
    const [selectedEmpleado, setSelectedEmpleado] = useState(null);
    const [selectedProducto, setSelectedProducto] = useState(null);


    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const AgregarDetalleProducto = () => {
        if (selectedProducto && CantProductos) {
        const nuevoDetalle = {
            IDProducto: selectedProducto.IDProducto,
            NomProducto: selectedProducto.NomProducto,
            PrecioProducto: selectedProducto.PrecioProducto,
            CantProductos: CantProductos
        };
        setDetalleCompra([...detalleCompra, nuevoDetalle]);
        setCantProductos('');
        setSelectedProducto('');
        } else {
        alert('Asegúrese de selecionar un producto o ingresar una cantidad.');
        }
    };

    const EliminarDetalle = (IDProducto) => {
        const detallesActualizados = detalleCompra.filter(detalle => detalle.IDProducto !== IDProducto);
        setDetalleCompra(detallesActualizados);
    };

    

    //Manejo de carga y selección de Clientes --------------------------------------
    const loadClientes = () => {
        fetch('http://localhost:5000/crud/readCliente')
        .then((response) => response.json())
        .then((data) => setClientes(data))
        .catch((error) => console.error('Error al obtener los clientes:', error));
    };

    //Control de apertura de modal de Clientes
    const openClienteModal = () => {
        setShowClienteModal(true);
    };

    //Control de clierre de modal de Clientes
    const closeClienteModal = () => {
        setShowClienteModal(false);
        setSearchQuery('');
    };

    //Actualización de valor de variable de estado de Cliente selecionado
    const selectCliente = (cliente) => {
        setSelectedCliente(cliente);
        setFormData({
        ...formData,
        IDCliente: cliente.IDCliente,
        });
        closeClienteModal();
    };

    //Manejo de carga y selección de Empleados --------------------------------------
    const loadEmpleados = () => {
        fetch('http://localhost:5000/crud/readEmpleado')
        .then((response) => response.json())
        .then((data) => setEmpleados(data))
        .catch((error) => console.error('Error al obtener los empleados:', error));
    };

    //Control de apertura de modal de Empleados
    const openEmpleadoModal = () => {
        setShowEmpleadoModal(true);
    };

    //Control de clierre de modal de Empleados
    const closeEmpleadoModal = () => {
        setShowEmpleadoModal(false);
    };

    //Actualización de valor de variable de estado de Empleado selecionado
    const selectEmpleado = (empleado) => {
        setSelectedEmpleado(empleado);
        setFormData({
        ...formData,
        IDEmpleado: empleado.IDEmpleado,
        });
        closeEmpleadoModal();
    };

    //Manejo de carga y selección de Productos --------------------------------------
    const loadProductos = () => {
        fetch('http://localhost:5000/crud/readProducto')
        .then((response) => response.json())
        .then((data) => setProductos(data))
        .catch((error) => console.error('Error al obtener los productos:', error));
    };

    //Control de apertura de modal de Empleados
    const openProductoModal = () => {
        setShowProductoModal(true);
    };

    //Control de clierre de modal de Empleados
    const closeProductoModal = () => {
        setShowProductoModal(false);
    };

    //Actualización de valor de variable de estado de Empleado selecionado
    const selectProducto = (producto) => {
        setSelectedProducto(producto);
        setFormData({
        ...formData,
        IDProducto: producto.IDProducto,
        });
        closeProductoModal();
    };

    //Carga de datos de Clientes, Empleados y Productos
    useEffect(() => {
        loadClientes ();
        loadEmpleados();
        loadProductos();
    }, []);


    const registrarCompra = () => {
        if (selectedCliente && selectedEmpleado && detalleCompra.length > 0) {
        const data = {
            IDCliente: selectedCliente.IDCliente,
            IDEmpleado: selectedEmpleado.IDEmpleado,
            TipoEntrega: TipoEntrega,
            DirecCompra: DirecCompra,
            EstadoC: 'EN PROCESO',
            detalle: detalleCompra
        };

        fetch('http://localhost:5000/crud/createCompra', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
            if (response.ok) {
                // Aquí puedes mostrar un mensaje de éxito o reiniciar los estados
                console.log('Compra registrada con éxito');
                alert('¡Compra registrada con éxito!');
                setDetalleCompra([]);
                setTipoEntrega('');
                setDireCompra('');
                // Limpia otros estados según sea necesario
            } else {
                // Aquí maneja el caso de error en la petición
                console.error('Error al registrar la compra');
            }
            })
            .catch((error) => {
            // Aquí maneja los errores de red u otros
            console.error('Error en la solicitud:', error);
            });
        } else {
        alert('Asegúrese de completar la información necesaria para registrar la compra.');
        }
    };

      //Validar input de la descripción del producto
        const handleDescripCompraChange = (e) => {
        const descrip = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Solo agrega letras
        setDireCompra(descrip);
        };


    return(
        <div>
        <Header Rol={ Rol } />

        <Container className="margen-contenedor">
            <Card className="global-margin-top">
            <Card.Body>
                <Card.Title className="mt-5 title">Registro de Compra</Card.Title>
                <Form className="mt-5" >
                <Row className="g-3">

                    <Col sm="12" md="4" lg="4">
                    <FloatingLabel controlId="IDCliente" label="Cliente">
                        <Form.Control
                        type="text"
                        placeholder="Seleccionar Cliente"
                        name="IDCliente"
                        value={selectedCliente ? selectedCliente.NombreUsuario : ''}
                        readOnly
                        />
                        <div className="button-container">
                        <Button className="botones" variant="outline-primary" onClick={openClienteModal}>
                            <FaSearch />
                        </Button>
                        </div>
                    </FloatingLabel>
                    </Col>

                    <Col sm="12" md="4" lg="4">
                    <FloatingLabel controlId="IDEmpleado" label="Empleado">
                        <Form.Control
                        type="text"
                        placeholder="Seleccionar Empleado"
                        name="IDEmpleado"
                        value={selectedEmpleado ? selectedEmpleado.NombreUsuario : ''}
                        readOnly
                        />
                        <div className="button-container">
                        <Button className="botones" variant="outline-primary" onClick={openEmpleadoModal}>
                            <FaSearch />
                        </Button>
                        </div>
                    </FloatingLabel>
                    </Col>

                    <Col sm="12" md="4" lg="4">
                    <FloatingLabel controlId="IDProducto" label="Producto">
                        <Form.Control
                        type="text"
                        placeholder="Seleccionar Producto"
                        name="IDProducto"
                        value={selectedProducto ? selectedProducto.NomProducto : ''}
                        readOnly
                        />
                        <div className="button-container">
                        <Button className="botones" variant="outline-primary" onClick={openProductoModal}>
                            <FaSearch />
                        </Button>
                        </div>
                    </FloatingLabel>
                    </Col>

                    <Col sm="12" md="2" lg="2" className="">
                    <FloatingLabel controlId="CantProductos" label="Cantidad">
                        <Form.Control 
                        type="number" 
                        min={1}
                        placeholder="Cantidad de Producto"
                        value={CantProductos}
                        onChange={(e) => setCantProductos(e.target.value)} 
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="12" md="2" lg="2" className="d-flex align-items-center">
                    <Button onClick={AgregarDetalleProducto} variant="outline-success" size="lg">
                        <FaPlus />
                    </Button>
                    </Col>

                    <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="TipoEntrega" label="Tipo de Entrega">
                        <Form.Select 
                        aria-label="Tipo de Entrega"
                        value={TipoEntrega}
                        onChange={(e) => setTipoEntrega(e.target.value)}
                        >
                        <option>Seleccione el tipo de entrega</option>
                        <option value="RETIRO EN SUCURSAL">RETIRO EN SUCURSAL</option>
                        <option value="A DOMICILIO">A DOMICILIO</option>
                        </Form.Select>
                    </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="12">
                    <FloatingLabel controlId="DirecCompra" label="Dirección de Entrega">
                        <Form.Control
                        type="text"
                        placeholder="Escriba aquí"
                        value={DirecCompra}
                        onChange={handleDescripCompraChange}
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="12" md="1" lg="12">
                    <Card className="global-margin-top">
                        <Card.Body>
                        <Card.Title className="mt-3 title">Detalle de productos</Card.Title>
                        <Table striped bordered hover responsive>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {detalleCompra.map((detalle) => (
                            <tr key={detalle.IDProducto}>
                                <td>{detalle.IDProducto}</td>
                                <td>{detalle.NomProducto}</td>
                                <td>C$ {detalle.PrecioProducto}</td>
                                <td>{detalle.CantProductos} Unidades</td>
                                <td>C$ {detalle.CantProductos * detalle.PrecioProducto}</td>
                                <td className="align-button">
                                <Button 
                                    size="sm"
                                    onClick={() => EliminarDetalle(detalle.IDProducto)}
                                    variant="danger">
                                    
                                    <FaTrashAlt />
                                </Button>
                                </td>
                            </tr>
                            ))}
                            </tbody>
                        </Table>
                        </Card.Body>
                    </Card>
                    </Col>

                </Row>
                <div className="center-button">
                    <Button variant="primary" onClick={registrarCompra} className="mt-3" size="lg">
                    Registrar
                    </Button>
                </div>
                </Form>
            </Card.Body>
            </Card>
        </Container>

        <Modal show={showClienteModal} onHide={closeClienteModal} centered scrollable size='md'>
            <Modal.Header closeButton>
            <Modal.Title>Seleccionar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row className="mb-3">
                <Col sm="12" md="12" lg="12">
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

            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>Nombre</th>
                </tr>
                </thead>
                <tbody>
                {clientes.map((cliente) => (
                    <tr key={cliente.IDCliente} onClick={() => selectCliente(cliente)}>
                    <td>{cliente.NombreUsuario}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </Modal.Body>
        </Modal>

        <Modal show={showEmpleadoModal} onHide={closeEmpleadoModal} centered>
            <Modal.Header closeButton>
            <Modal.Title>Seleccionar Empleado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {empleados.map((empleado) => (
                <div className="Seleccion" key={empleado.IDEmpleado} onClick={() => selectEmpleado(empleado)}>
                {empleado.NombreUsuario}
                </div>
            ))}
            </Modal.Body>
        </Modal>

        <Modal show={showProductoModal} onHide={closeProductoModal} centered>
            <Modal.Header closeButton>
            <Modal.Title>Seleccionar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {productos.map((producto) => (
                <div className="Seleccion" key={producto.IDProducto} onClick={() => selectProducto(producto)}>
                {producto.NomProducto}
                </div>
            ))}
            </Modal.Body>
        </Modal>
        </div>
    );
}

export default Compra;