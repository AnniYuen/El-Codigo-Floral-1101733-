import React, { useState } from 'react';

// Estilos en línea utilizando un objeto de JavaScript
const styles = {
  container: {
    maxWidth: '1300px',
    margin: '20px auto',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '1.5rem',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: '20px',
  },
  inputGroup: {
    display: 'flex', // Cambié la disposición de los inputs a flexbox
    justifyContent: 'space-between',
    gap: '10px', // Espacio entre los campos
    marginBottom: '15px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block',
    color: '#555',
  },
  select: {
    width: '200px',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  input: {
    width: '300px',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  searchButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  searchButtonHover: {
    backgroundColor: '#45a049',
  },
};

function FlowerSearch({ onFilter, categories, colors }) {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [name, setName] = useState('');
  const [hover, setHover] = useState(false); // Estado para manejar el hover del botón

  const handleSearch = () => {
    onFilter(selectedColor, selectedCategory, name);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Buscar Flores</h2>
      <div style={styles.inputGroup}>
        <div>
          <label style={styles.label}>Color:</label>
          <select
            style={styles.select}
            value={selectedColor}
            onChange={e => setSelectedColor(e.target.value)}
          >
            <option value="">Todos</option>
            {colors.map(color => (
              <option key={color.Id} value={color.Id}>
                {color.Nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={styles.label}>Categoría:</label>
          <select
            style={styles.select}
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas</option>
            {categories.map(category => (
              <option key={category.Id} value={category.Id}>
                {category.Nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={styles.label}>Nombre:</label>
          <input
            style={styles.input}
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
      </div>
      <button
        style={{
          ...styles.searchButton,
          ...(hover && styles.searchButtonHover), // Aplicar estilo de hover
        }}
        onClick={handleSearch}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Buscar
      </button>
    </div>
  );
}

export default FlowerSearch;
