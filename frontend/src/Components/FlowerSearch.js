import React, { useState } from 'react';

function FlowerSearch({ onFilter, categories, colors }) {
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [name, setName] = useState('');

    const handleSearch = () => {
        onFilter(selectedColor, selectedCategory, name);
    };

    return (
        <div>
            <h2>Buscar Flores</h2>
            <div>
                <label>Color:</label>
                <select value={selectedColor} onChange={e => setSelectedColor(e.target.value)}>
                    <option value="">Todos</option>
                    {colors.map(color => (
                        <option key={color.Id} value={color.Id}>{color.Nombre}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Categoría:</label>
                <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                    <option value="">Todas</option>
                    {categories.map(category => (
                        <option key={category.Id} value={category.Id}>{category.Nombre}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Nombre:</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <button onClick={handleSearch}>Buscar</button>
        </div>
    );
}

export default FlowerSearch;
