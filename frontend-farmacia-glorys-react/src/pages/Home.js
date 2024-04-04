import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/App.css';

function Home({ Rol }) {
    return(
        <div>
        <Header Rol={ Rol } />
        </div>
    );
}

export default Home;