import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import Navbar from 'react-bootstrap/Navbar'; // Importa el componente Navbar de Bootstrap
import Nav from 'react-bootstrap/Nav'; // Importa el componente Nav de Bootstrap
import Offcanvas from 'react-bootstrap/Offcanvas'; // Importa el componente Offcanvas de Bootstrap
import Button from 'react-bootstrap/Button'; // Importa el componente Button de Bootstrap
import NavDropdown from 'react-bootstrap/NavDropdown'; // Importa el componente NavDropDown de Bootstrap
import Container from 'react-bootstrap/Container'; // Importa el componente Container de Bootstrap
import { Link } from 'react-router-dom';
import logo from './logo.png';
import { BsCartFill } from "react-icons/bs";
import { FaRightFromBracket } from 'react-icons/fa6';


function Header({ Rol }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

    // Función para cerrar sesión
    const cerrarSesion = () => {
      // Eliminar el rol del localStorage al cerrar sesión
      localStorage.removeItem('userRol');
    };

  return (

    <div>
      {Rol === 'Administrador' && (
    <div>
      {/* Navbar principal */}
      <Navbar className="navbar-color" variant="dark" expand="md" fixed='top'>
        <Container>
        <img src={logo} alt="Logo" className="brand-logo" style={{ maxWidth: '50px' }}/>
            <Navbar.Brand href="#home" className='nombre'>Farmacia Glorys</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ display: 'none' }}
            className="d-sm-none d-xs-none"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">

              <NavDropdown title="Gestión de" id="productos">
                <NavDropdown.Item>
                  <Link to="/producto" className="link-unstyled">Nuevo Producto</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/marca" className="link-unstyled">Nueva Marca</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/presentacion" className="link-unstyled">Nueva Presentacion</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/categoria" className="link-unstyled">Nueva Categoria</Link>
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item>
                  <Link to="/actualizar-producto" className="link-unstyled">Productos</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-marca" className="link-unstyled">Marcas</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-categoria" className="link-unstyled">Categoria</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-presentacion" className="link-unstyled">Presentaciones</Link>
                </NavDropdown.Item>

                </NavDropdown>

                <NavDropdown title="Estadísticas" id="servicios">
                <NavDropdown.Item>
                  <Link to="/producto-reporte" className="link-unstyled">Stock de productos</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/producto-reporte" className="link-unstyled">Compra de productos</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/producto-reporte" className="link-unstyled">Productos más comprados</Link>
                </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Gestión de Servicios" id="servicios">
                <NavDropdown.Item>
                  <Link to="/servicio" className="link-unstyled">Nuevo Servicio</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-servicio" className="link-unstyled">Listar Servicios</Link>
                </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Gestión de compras" id="compras">
                <NavDropdown.Item>
                  <Link to="/compras" className="link-unstyled">Gestión de Compra</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link>
                  <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /> Cerrar Sesión</Link>
                </Nav.Link>

            </Nav>
          </Navbar.Collapse>
          <Button
            variant="outline-light"
            onClick={toggleMenu}
            className="d-md-none d-block"
            aria-controls="basic-navbar-nav"
            aria-expanded={showMenu ? 'true' : 'false'}
          >
            Menú
          </Button>
        </Container>
      </Navbar>

      {/* Menú lateral (Offcanvas) */}
      <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">

          <NavDropdown title="Gestión de" id="productos">
                <NavDropdown.Item>
                  <Link to="/producto" className="link-unstyled">Nuevo Producto</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/marca" className="link-unstyled">Nueva Marca</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/presentacion" className="link-unstyled">Nueva Presentacion</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/categoria" className="link-unstyled">Nueva Categoria</Link>
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item>
                  <Link to="/actualizar-producto" className="link-unstyled">Productos</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-marca" className="link-unstyled">Marcas</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-categoria" className="link-unstyled">Categoria</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-presentacion" className="link-unstyled">Presentaciones</Link>
                </NavDropdown.Item>

                </NavDropdown>

                <NavDropdown title="Estadísticas" id="servicios">
                <NavDropdown.Item>
                  <Link to="/producto-reporte" className="link-unstyled">Stock de productos</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/producto-reporte" className="link-unstyled">Compra de productos</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/producto-reporte" className="link-unstyled">Productos más comprados</Link>
                </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Gestión de Servicios" id="servicios">
                <NavDropdown.Item>
                  <Link to="/servicio" className="link-unstyled">Nuevo Servicio</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-servicio" className="link-unstyled">Listar Servicios</Link>
                </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Gestión de compras" id="compras">
                <NavDropdown.Item>
                  <Link to="/compras" className="link-unstyled">Gestión de Compra</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link>
                  <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /> Cerrar Sesión</Link>
                </Nav.Link>

          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
    )}

    {Rol === 'Vendedor' && (
      <div>
      {/* Navbar principal */}
      <Navbar className="navbar-color" variant="dark" expand="md" fixed='top'>
        <Container>
        <img src={logo} alt="Logo" className="brand-logo" style={{ maxWidth: '50px' }}/>
            <Navbar.Brand href="#home" className='nombre'>Farmacia Glorys</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ display: 'none' }}
            className="d-sm-none d-xs-none"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">

              <NavDropdown title="Gestión de" id="productos">
                <NavDropdown.Item>
                  <Link to="/producto" className="link-unstyled">Nuevo Producto</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/marca" className="link-unstyled">Nueva Marca</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/presentacion" className="link-unstyled">Nueva Presentacion</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/categoria" className="link-unstyled">Nueva Categoria</Link>
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item>
                  <Link to="/actualizar-producto" className="link-unstyled">Productos</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-marca" className="link-unstyled">Marcas</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-categoria" className="link-unstyled">Categoria</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-presentacion" className="link-unstyled">Presentaciones</Link>
                </NavDropdown.Item>

                </NavDropdown>


              <NavDropdown title="Gestión de compras" id="compras">
                <NavDropdown.Item>
                  <Link to="/compras" className="link-unstyled">Gestión de Compra</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link>
                  <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /> Cerrar Sesión</Link>
                </Nav.Link>

            </Nav>
          </Navbar.Collapse>
          <Button
            variant="outline-light"
            onClick={toggleMenu}
            className="d-md-none d-block"
            aria-controls="basic-navbar-nav"
            aria-expanded={showMenu ? 'true' : 'false'}
          >
            Menú
          </Button>
        </Container>
      </Navbar>

      {/* Menú lateral (Offcanvas) */}
      <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">

          <NavDropdown title="Gestión de" id="productos">
                <NavDropdown.Item>
                  <Link to="/producto" className="link-unstyled">Nuevo Producto</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/marca" className="link-unstyled">Nueva Marca</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/presentacion" className="link-unstyled">Nueva Presentacion</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/categoria" className="link-unstyled">Nueva Categoria</Link>
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item>
                  <Link to="/actualizar-producto" className="link-unstyled">Productos</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-marca" className="link-unstyled">Marcas</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-categoria" className="link-unstyled">Categoria</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-presentacion" className="link-unstyled">Presentaciones</Link>
                </NavDropdown.Item>

                </NavDropdown>


              <NavDropdown title="Gestión de compras" id="compras">
                <NavDropdown.Item>
                  <Link to="/compras" className="link-unstyled">Gestión de Compra</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link>
                  <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /> Cerrar Sesión</Link>
                </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>

    )}

  {Rol === 'Cliente' && (
        <div>
        {/* Navbar principal */}
        <Navbar className="navbar-color" variant="dark" expand="md" fixed='top'>
          <Container>
          <img src={logo} alt="Logo" className="brand-logo" style={{ maxWidth: '50px' }}/>
            <Navbar.Brand href="#home" className='nombre'>Farmacia Glorys</Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              style={{ display: 'none' }}
              className="d-sm-none d-xs-none"
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">

              <Nav.Link>
                <Link to="/productos" className="link-unstyled">Productos</Link>
                </Nav.Link>

                <Nav.Link>
                <Link to="/servicios" className="link-unstyled">Servicios</Link>
                </Nav.Link>

                <Nav.Link>
                <Link to="/compra" className="link-unstyled"><BsCartFill /> Carrito</Link>
                </Nav.Link>

                <Nav.Link>
                  <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /> Cerrar Sesión</Link>
                </Nav.Link>

              </Nav>
            </Navbar.Collapse>
            <Button
              variant="outline-light"
              onClick={toggleMenu}
              className="d-md-none d-block"
              aria-controls="basic-navbar-nav"
              aria-expanded={showMenu ? 'true' : 'false'}
            >
              Menú
            </Button>
          </Container>
        </Navbar>

        {/* Menú lateral (Offcanvas) */}
        <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menú</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">

            <Nav.Link>
                <Link to="/productos" className="link-unstyled">Productos</Link>
                </Nav.Link>

                <Nav.Link>
                <Link to="/servicios" className="link-unstyled">Servicios</Link>
                </Nav.Link>

                  <Nav.Link>
                <Link to="/compra" className="link-unstyled"><BsCartFill /> Carrito</Link>
                </Nav.Link>

                <Nav.Link>
                  <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /> Cerrar Sesión</Link>
                </Nav.Link>

            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </div>

      )}
      </div>
      

    );
  }

  export default Header;