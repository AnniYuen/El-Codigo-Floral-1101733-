import React from 'react';

function FlowerDetails({ flower }) {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ffe0f0',
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '40px auto',
        border: '#586358',
        maxWidth: '600px',
        textAlign: 'center',
    };

    const imageStyle = {
        width: '200px',
        height: '200px',
        borderRadius: '10px',
        marginBottom: '20px',
    };

    const textStyle = {
        color: '#000000',
    };

    return (
        <div style={containerStyle}>
            <img src={flower.Imagen} alt={flower.NombreComun} style={imageStyle} />
            <div style={textStyle}>
                <h2>{flower.NombreComun}</h2>
                <p><strong>Categoría:</strong> {flower.Categoria}</p>
                <p><strong>Color:</strong> {flower.Color}</p>
                <p><strong>Simbolismo:</strong> {flower.Simbolismo}</p>
                <p><strong>Origen:</strong> {flower.Origen}</p>
                <p><strong>Descripción:</strong> {flower.Descripcion}</p>
            </div>
        </div>
    );
}

export default FlowerDetails;
