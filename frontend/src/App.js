import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import FlowerDetails from './Components/FlowerDetails';
import FlowerOfTheDay from './Components/FlowerOfTheDay';
import FlowerSearch from './Components/FlowerSearch';

function App() {
    const [flowers, setFlowers] = useState([]);
    const [filteredFlowers, setFilteredFlowers] = useState([]);
    const [flowerOfTheDay, setFlowerOfTheDay] = useState(null);
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [BASE_URL, setBaseUrl] = useState('');

    // Obtener la URL base del backend dinámicamente
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch('/api/config');
                const data = await response.json();
                setBaseUrl(data.baseUrl); // Base URL obtenida del backend
                fetchInitialData(data.baseUrl);
            } catch (error) {
                console.error('Error fetching backend config:', error);
                const fallbackUrl = 'http://127.0.0.1:4000';
                setBaseUrl(fallbackUrl);
                fetchInitialData(fallbackUrl);
            }
        };
        fetchConfig();
    }, []);

    // Función para obtener las flores, colores y categorías
    const fetchInitialData = (url) => {
        // Obtener flores
        fetch(`${url}/api/flores`)
            .then(response => response.json())
            .then(data => {
                setFlowers(data);
                setFilteredFlowers(data);

                // Elegir una flor aleatoria como "Flor del día"
                const randomFlower = data[Math.floor(Math.random() * data.length)];
                setFlowerOfTheDay(randomFlower);
            })
            .catch(error => console.error('Error fetching flowers:', error));

        // Obtener colores
        fetch(`${url}/api/colores`)
            .then(response => response.json())
            .then(data => setColors(data))
            .catch(error => console.error('Error fetching colors:', error));

        // Obtener categorías
        fetch(`${url}/api/categorias`)
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    };

    // Filtrar las flores
    const handleFilter = (colorId, categoriaId, nombre) => {
        fetch(`${BASE_URL}/api/flores?colorId=${colorId || ''}&categoriaId=${categoriaId || ''}&nombre=${nombre || ''}`)
            .then(response => response.json())
            .then(data => setFilteredFlowers(data))
            .catch(error => console.error('Error filtering flowers:', error));
    };

    return (
        <div>
            <Header />
            {flowerOfTheDay && <FlowerOfTheDay flowerOfTheDay={flowerOfTheDay} />}
            <FlowerSearch onFilter={handleFilter} categories={categories} colors={colors} />
            {filteredFlowers.map(flower => (
                <FlowerDetails key={flower.Id} flower={flower} />
            ))}
            <Footer />
        </div>
    );
}

export default App;
