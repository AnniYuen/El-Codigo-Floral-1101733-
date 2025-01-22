import React from 'react';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const navigate = useNavigate();

    const styles = {
        nav: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#013220', // Verde oscuro
            padding: '10px 20px',
        },
        left: {
            display: 'flex',
            gap: '15px',
        },
        right: {
            display: 'flex',
            gap: '15px',
        },
        button: {
            backgroundColor: 'transparent', // Sin color de fondo
            color: '#fff', // Texto blanco
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
        },
        loginButton: {
            backgroundColor: '#fff', // Fondo blanco
            color: '#013220', // Texto verde oscuro
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
        },
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.left}>
                <button style={styles.button} onClick={() => navigate('/')}>Home</button>
                <button style={styles.button} onClick={() => navigate('/favoritos')}>Favoritos</button>
            </div>
            <div style={styles.right}>
                <button style={styles.loginButton} onClick={() => navigate('/login')}>Iniciar Sesión</button>
                <button style={styles.button} onClick={() => navigate('/register')}>Registrarse</button>
            </div>
        </nav>
    );
};

export default Menu;
