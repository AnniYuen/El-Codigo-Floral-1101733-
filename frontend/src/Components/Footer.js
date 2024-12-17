function Footer() {
    const footerStyle = {
        textAlign: 'center',
        padding: '20px',
        background: '#586358', //verde
        color: '#fff', // blanco
        marginTop: '20px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    };

    const textStyle = {
        margin: '0',
        fontSize: '1.2rem',
        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)', // Sombra en el texto
    };

    return (
        <footer style={footerStyle}>
            <p style={textStyle}>
                Mas alla de la belleza, el poder de las flores. 🌼 Anni Yuen ID: 1101733
            </p>
        </footer>
    );
}

export default Footer;
