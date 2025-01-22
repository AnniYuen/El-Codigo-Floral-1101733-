import React, { useState } from 'react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#FFFAFA', // Fondo blanco
            padding: '20px',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        },
        input: {
            width: '300px',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #FF69B4', // Rosado
            borderRadius: '5px',
        },
        button: {
            backgroundColor: '#32CD32', // Verde
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
        },
        title: {
            color: '#FF69B4', // Rosado
            fontSize: '24px',
            marginBottom: '20px',
        },
        error: {
            color: 'red',
            fontSize: '14px',
            marginTop: '10px',
        },
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        setError('');
        console.log('Usuario:', username);
        console.log('Contraseña:', password);
        // Aquí puedes manejar el envío de los datos
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2 style={styles.title}>Crear Cuenta</h2>
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    style={styles.input}
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    style={styles.input}
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <div style={styles.error}>{error}</div>}
                <button style={styles.button} type="submit">
                    Registrarse
                </button>
            </form>
        </div>
    );
};

export default Register;
