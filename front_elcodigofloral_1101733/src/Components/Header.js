function Header() {
    const headerStyle = {
        background: '#f79cca', // rosado medio
        color: 'ffe0f0', // rosado claro
        textAlign: 'center',
        padding: '50px',
        borderBottom: '3px solid #586358', // verde
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    };

    const titleStyle = {
        fontSize: '2.5rem',
        margin: '0',
        fontWeight: 'bold',
        text: 'ffe0f0',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Sombra en el texto
    };

    return (
        <header style={headerStyle}>
            <h1 style={titleStyle}>El Codigo Floral</h1>
        </header>
    );
}

export default Header;
