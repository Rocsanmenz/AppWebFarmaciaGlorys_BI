import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaSistrix, FaPencil, FaTrashCan} from 'react-icons/fa6';

function ProductoList({Rol}) {
    const [productos, setProductos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProducto, setSelectedProducto] = useState({});
    const [formData, setFormData] = useState({
        NomProducto: '',
        DescripProducto: '',
        PrecioProducto: '',
        Estado: '',
        CantProducto: '',
        imagen: '',
        IDMarca: '',
        IDCategoria: '',
        IDPresentacion: ''
    });

    const handleImagenChange = (event) => {
        const file = event.target.files[0]; // Obtener el primer archivo seleccionado
        
            const reader = new FileReader();
            reader.onload = () => {
            const base64String = reader.result; // Obtener la imagen en formato base64
            setFormData({
                ...formData,
                imagen: base64String
            });
            }; 
            if (file) {
            reader.readAsDataURL(file); // Lee el contenido del archivo como base64
            }
        };

    const [searchQuery, setSearchQuery] = useState('');

    const [marcas, setMarcas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [presentaciones, setPresentaciones] = useState([]);
    const [selectedCategoria, setSelectedCategory] = useState(null);
    const [selectedMarca, setSelectedMarca] = useState(null);
    const [showCategoriaModal, setShowCategoryModal] = useState(false);
    const [showMarcaModal, setShowMarcaModal] = useState(false);
    const [selectedPresentacion, setSelectedPresentacion] = useState(null);
    const [showPresentacionModal, setShowPresentacionModal] = useState(false);
    
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredProductos = productos.filter((producto) => {
        // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
        const nomproducto = producto.NomProducto.toLowerCase();
        const descripproducto = producto.DescripProducto.toLowerCase();
        const precioproducto = producto.PrecioProducto;
        const estado = producto.Estado.toLowerCase();
        const cantproducto = producto.CantProducto;
        const marca = marcas.find((marca) => marca.IDMarca === producto.IDMarca)?.NombreMarca.toLowerCase();
        const categoria = categorias.find((categoria) => categoria.IDCategoria === producto.IDCategoria)?.NombreCategoria.toLowerCase();
        const presentacion = presentaciones.find((presentacion) => presentacion.IDPresentacion === producto.IDPresentacion)?.NombrePresentacion.toLowerCase();
        const search = searchQuery.toLowerCase();
    
        // Verifica si la cadena de búsqueda se encuentra en algún campo
        return (
        nomproducto.includes(search) ||
        descripproducto.includes(search) ||
        precioproducto === (search) ||
        estado.includes(search) ||
        cantproducto === (search) ||
        marca.includes(search) ||
        categoria.includes(search) ||
        presentacion.includes(search)
        );
    });

    // Función para abrir el modal y pasar los datos del producto seleccionado
    const openModal = (producto) => {
        setSelectedProducto(producto);

        setFormData({
        NomProducto: producto.NomProducto,
        DescripProducto: producto.DescripProducto,
        PrecioProducto: producto.PrecioProducto,
        Estado: producto.Estado,
        CantProducto: producto.CantProducto,
        imagen: producto.imagen,
        IDMarca: producto.IDMarca,
        IDCategoria: producto.IDCategoria,
        IDPresentacion: producto.IDPresentacion
        });
        setShowModal(true);
    };

      // Función para manejar cambios en el formulario
    const handleFormChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'IDCategoria' || name === 'IDMarca' || name === 'IDPresentacion') {
            setFormData({
                ...formData,
                [name]: value,
            });
            } else {
            setFormData({
                ...formData,
                [name]: value,
            });
            }
        };

    const loadProductos = () => {
        fetch('http://localhost:5000/crud/readProducto')
        .then((response) => response.json())
        .then((data) => setProductos(data))
        .catch((error) => console.error('Error al obtener los productos:', error));
    };

    const loadMarcas = () => {
        fetch('http://localhost:5000/crud/readMarca')
            .then((response) => response.json())
            .then((data) => setMarcas(data))
            .catch((error) => console.error('Error al obtener las marcas:', error));
        };

        const loadCategorias = () => {
            fetch('http://localhost:5000/crud/readCategoria')
            .then((response) => response.json())
            .then((data) => setCategorias(data))
            .catch((error) => console.error('Error al obtener las categorias:', error));
        };

        const loadPresentaciones = () => {
            fetch('http://localhost:5000/crud/readPresentacion')
            .then((response) => response.json())
            .then((data) => setPresentaciones(data))
            .catch((error) => console.error('Error al obtener las presentaciones:', error));
        };

        // Realiza una solicitud GET al servidor para obtener los datos
        useEffect(() => {
            loadProductos();
            loadMarcas();
            loadCategorias();
            loadPresentaciones();
        }, []);

    // Función para enviar el formulario de actualización
    const handleUpdate = () => {
        // Realiza la solicitud PUT al servidor para actualizar el registro
        fetch(`http://localhost:5000/crud/updateProducto/${selectedProducto.IDProducto}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        })
        .then((response) => {
            if (response.ok) {
            // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de productos
            setShowModal(false);
            loadProductos(); // Cargar la lista de productos actualizada
            }
        })
        .catch((error) => console.error('Error al actualizar el registro:', error));
    };

    // Función para eliminar un producto
    const handleDelete = (idProducto) => {
        const confirmation = window.confirm('¿Seguro que deseas eliminar esta producto?');
        if (confirmation) {
        // Realiza la solicitud DELETE al servidor para eliminar el producto
        fetch(`http://localhost:5000/crud/deleteProducto/${idProducto}`, {
            method: 'DELETE',
        })
            .then((response) => {
            if (response.ok) {
                // La eliminación fue exitosa, refresca la lista de marcas
                loadProductos();
            }
            })
            .catch((error) => console.error('Error al eliminar el producto:', error));
        }
    };

    const openCategoriaModal = () => {
        setShowCategoryModal(true);
        };
        
        const closeCategoriaModal = () => {
            setShowCategoryModal(false);
        };
        
        const selectCategoria = (categoria) => {
            setSelectedCategory(categoria);
            setFormData({
            ...formData,
            IDCategoria: categoria.IDCategoria,
            });
            closeCategoriaModal();
        };
        
        const openMarcaModal = () => {
            setShowMarcaModal(true);
        };
        
        const closeMarcaModal = () => {
            setShowMarcaModal(false);
        };
        
        const selectMarca = (marca) => {
            setSelectedMarca(marca);
            setFormData({
            ...formData,
            IDMarca: marca.IDMarca,
            });
            closeMarcaModal();
        };

        const openPresentacionModal = () => {
            setShowPresentacionModal(true);
            };
            
            const closePresentacionModal = () => {
                setShowPresentacionModal(false);
            };
            
            const selectPresentacion = (presentacion) => {
                setSelectedPresentacion(presentacion);
                setFormData({
                ...formData,
                IDPresentacion: presentacion.IDPresentacion,
                });
                closePresentacionModal();
            };
            

    return (
        <div>
        <Header Rol={Rol} />

        <Card className="margen" responsive>
            <Card.Body>
            <Card.Title className="titulo-2">Productos</Card.Title>
            
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
                    <th>Nombre de Producto</th>
                    <th>Imagen</th>
                    <th>Descripción</th>
                    <th>C$</th>
                    <th>Estado</th>
                    <th>Almacen</th>
                    <th>Marca</th>
                    <th>Categoria</th>
                    <th>Presentación</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {filteredProductos.map((producto) => (
                    <tr key={producto.IDProducto}>
                    <td>{producto.IDProducto}</td>
                    <td>{producto.NomProducto}</td>
                    <td><img src={producto.imagen} alt={producto.NomProducto} style={{ maxWidth: '100px' }} /></td>
                    <td>{producto.DescripProducto}</td>
                    <td>{producto.PrecioProducto}</td>
                    <td>{producto.Estado}</td>
                    <td>{producto.CantProducto}</td>
                    <td>{marcas.find((marca) => marca.IDMarca === producto.IDMarca)?.NombreMarca}</td>
                    <td>{categorias.find((categoria) => categoria.IDCategoria === producto.IDCategoria)?.NombreCategoria}</td>
                    <td>{presentaciones.find((presentacion) => presentacion.IDPresentacion === producto.IDPresentacion)?.NombrePresentacion}</td>
                    <td>
                        <Button variant="primary" onClick={() => openModal(producto)}><FaPencil/></Button>
                        <Button variant="danger" onClick={() => handleDelete(producto.IDProducto)}><FaTrashCan/></Button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </Card.Body>
        </Card>

        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" responsive>
            <Modal.Header closeButton>
            <Modal.Title>Actualizar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Card className="mt-3">
                <Card.Body>
                <Card.Title>Producto</Card.Title>
                <Form className="mt-3">
                    <Row className="g-3">

                    <Col sm="6" md="6" lg="8">
                        <FloatingLabel controlId="NomProducto" label="Nombre de Producto">
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre del producto"
                            name="NomProducto"
                            value={formData.NomProducto}
                            onChange={handleFormChange}
                        />
                        </FloatingLabel>
                    </Col>

                    <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="Estado" label="Estado">
                        <Form.Select 
                            aria-label="Estado"
                            name="Estado"
                            value={formData.Estado}
                            onChange={handleFormChange}
                        >
                            <option>Seleccione el estado</option>
                            <option value="DISPONIBLE">DISPONIBLE</option>
                            <option value="AGOTADO">AGOTADO</option>
                        </Form.Select>
                        </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="12">
                        <FloatingLabel controlId="DescripProducto" label="Descripción de Producto">
                        <Form.Control
                            type="text"
                            placeholder="Escriba aquí"
                            name="DescripProducto"
                            value={formData.DescripProducto}
                            onChange={handleFormChange}
                        />
                        </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="6">
                        <FloatingLabel controlId="PrecioProducto" label="Precio de Producto">
                        <Form.Control
                            type="number"
                            placeholder="Escriba aquí"
                            name="PrecioProducto"
                            value={formData.PrecioProducto}
                            onChange={handleFormChange}
                        />
                        </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="6">
                        <FloatingLabel controlId="CantProducto" label="Cantidad de Producto">
                        <Form.Control
                            type="number"
                            placeholder="Escriba aquí"
                            name="CantProducto"
                            value={formData.CantProducto}
                            onChange={handleFormChange}
                        />
                        </FloatingLabel>
                    </Col>

                    <Col sm="12" md="12" lg="6">
                    <Form.Group controlId="imagen" className="" >
                        <Form.Control 
                            type="file" 
                            accept=".jpg, .png, .jpeg"
                            size="lg"
                            name="imagen"
                            onChange={handleImagenChange}
                        />
                        </Form.Group>
                    </Col>

                    <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="IDMarca" label="Marca">
                        <Form.Control
                            type="text"
                            placeholder="Marca seleccionada"
                            name="marca"
                            value={selectedMarca ? selectedMarca.NombreMarca : ''}
                            readOnly
                        />
                        <Button className='botones' variant="outline-primary" onClick={openMarcaModal}>
                        <FaSistrix/>
                        </Button>
                        </FloatingLabel>

                    </Col>

                    <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="IDCcategoria" label="Categoría">
                        <Form.Control
                            type="text"
                            placeholder="Categoría seleccionada"
                            name="categoria"
                            value={selectedCategoria ? selectedCategoria.NombreCategoria : ''}
                            readOnly
                        />
                        <Button className='botones' variant="outline-primary" onClick={openCategoriaModal}>
                        <FaSistrix/>
                        </Button>
                        </FloatingLabel>
                    </Col>

                    <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="IDPresentacion" label="Presentacion">
                        <Form.Control
                            type="text"
                            placeholder="Presentacion seleccionada"
                            name="presentacion"
                            value={selectedPresentacion ? selectedPresentacion.NombrePresentacion : ''}
                            readOnly
                        />
                        <Button className='botones' variant="outline-primary" onClick={openPresentacionModal}>
                        <FaSistrix/>
                        </Button>
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

        <Modal show={showCategoriaModal} onHide={closeCategoriaModal} responsive centered scrollable size='md'>
        <Modal.Header closeButton>
            <Modal.Title>Seleccionar Categoría</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {categorias.map((categoria) => (
                <div className='Seleccion' key={categoria.IDCategoria} onClick={() => selectCategoria(categoria)}>
                {categoria.NombreCategoria}
                </div>
            ))}
            </Modal.Body>
        </Modal>
        <Modal show={showPresentacionModal} onHide={closePresentacionModal} responsive centered scrollable size='md'>
        <Modal.Header closeButton>
            <Modal.Title>Seleccionar Presentacion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {presentaciones.map((presentacion) => (
                <div className='Seleccion' key={presentacion.IDPresentacion} onClick={() => selectPresentacion(presentacion)}>
                {presentacion.NombrePresentacion}
                </div>
            ))}
            </Modal.Body>
        </Modal>
        <Modal show={showMarcaModal} onHide={closeMarcaModal} responsive centered scrollable size='md'>
            <Modal.Header closeButton>
            <Modal.Title>Seleccionar Marca</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {marcas.map((marca) => (
                <div className='Seleccion' key={marca.IDMarca} onClick={() => selectMarca(marca)}>
                {marca.NombreMarca}
                </div>
            ))}
            </Modal.Body>
        </Modal>

        </div>
    );
}

export default ProductoList;
