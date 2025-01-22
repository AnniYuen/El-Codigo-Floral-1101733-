import React from 'react';

function FlowerOfTheDay({ flowerOfTheDay }) {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f5abcb, #db5e94)',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        margin: '20px auto',
        border: '3px solid #ad054e',
        maxWidth: '800px',
        textAlign: 'center',
    };

    const imageStyle = {
        width: '220px',
        height: '220px',
        borderRadius: '50%',
        marginBottom: '20px',
    };

    const textStyle = {
        color: '#fff',
    };

    return (
        <div style={containerStyle}>
            <img src={flowerOfTheDay.Imagen} alt={flowerOfTheDay.NombreComun} style={imageStyle} />
            <div style={textStyle}>
                <h2>🌸 Flor del Día: {flowerOfTheDay.NombreComun}</h2>
                <p><strong>Categoría:</strong> {flowerOfTheDay.Categoria}</p>
                <p><strong>Color:</strong> {flowerOfTheDay.Color}</p>
                <p><strong>Simbolismo:</strong> {flowerOfTheDay.Simbolismo}</p>
                <p><strong>Origen:</strong> {flowerOfTheDay.Origen}</p>
                <p><strong>Descripción:</strong> {flowerOfTheDay.Descripcion}</p>
            </div>
        </div>
    );
}

export default FlowerOfTheDay;
