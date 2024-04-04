import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Marca from './pages/CreateMarca';
import ListMarca from './pages/MarcaList';
import Categoria from './pages/CreateCategoria';
import ListCategoria from './pages/CategoriaList';
import Presentacion from './pages/CreatePresentacion';
import ListPresentacion from './pages/PresentacionList';
import Producto from './pages/CreateProducto';
import ListProducto from './pages/ProductoList';
import Servicio from './pages/CreateServicio';
import ListaServicio from './pages/ServicioList';
import Cliente from './pages/CreateCliente';
import Login from './pages/Login';
import Empleado from './pages/CreateEmpleado';
import Inicio from './pages/Inicio';
import CatalogoServicio from './pages/CatalogoServicios';
import Estadistica1 from './pages/EstadisticaProducto';
import Catalogo from './pages/CatalogoProductos';
import SinAcceso from './pages/SinAcceso';

function App() {

  const storedRol = localStorage.getItem('userRol');

  //const [userRol, setUserRol] = useState('');
  const [userRol, setUserRol] = useState(storedRol || '');

  // Guardar el rol del usuario en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('userRol', userRol);
  }, [userRol]);

  return (
    <Router>
    <Routes>
    <Route path="/" element={<Inicio Rol={userRol}/>} />
    <Route path="/registrarse" element={<Empleado Rol={userRol} />} />
    <Route path="/inicio" element={<Login Rol={userRol} setRol={setUserRol} />} />
    <Route path="/home" element={userRol ? <Home Rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/marca" element={userRol ? <Marca Rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/actualizar-marca" element={userRol ? <ListMarca Rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/categoria" element={userRol ? <Categoria Rol={userRol}/> : <Navigate to="/sinacceso" />} />
      <Route path="/actualizar-categoria" element={userRol ? <ListCategoria Rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/presentacion" element={userRol ? <Presentacion Rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/actualizar-presentacion" element={userRol ? <ListPresentacion Rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/producto" element={userRol ? <Producto Rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/actualizar-producto" element={userRol ? <ListProducto Rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/servicio" element={userRol ? <Servicio Rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/actualizar-servicio" element={userRol ? <ListaServicio Rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/cliente" element={userRol ? <Cliente Rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/servicios" element={userRol ? <CatalogoServicio Rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/producto-reporte" element={userRol ? <Estadistica1 Rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/productos" element={userRol ? <Catalogo Rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/sinacceso" element={<SinAcceso />} />
    </Routes>
  </Router>
  );
}

export default App;
