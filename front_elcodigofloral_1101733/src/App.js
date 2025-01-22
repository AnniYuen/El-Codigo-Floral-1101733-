import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import FlowerDetails from './Components/FlowerDetails';
import FlowerOfTheDay from './Components/FlowerOfTheDay';
import FlowerSearch from './Components/FlowerSearch';
import Menu from './Components/Menu';
import Login from './Components/LogIn';
import Register from './Components/Registro';
import getBackendConfig from './apiconfig';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

function App() {
    const [flowers, setFlowers] = useState([]);
    const [filteredFlowers, setFilteredFlowers] = useState([]);
    const [flowerOfTheDay, setFlowerOfTheDay] = useState(null);
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [BASE_URL, setBaseUrl] = useState('');

    const location = useLocation();

    useEffect(() => {
        const fetchConfig = async () => {
            const url = await getBackendConfig();
            setBaseUrl(url);
            fetchInitialData(url);
        };
        fetchConfig();
    }, []);

    const fetchInitialData = (url) => {
        fetch(`${url}/api/flores`)
            .then((response) => response.json())
            .then((data) => {
                setFlowers(data);
                setFilteredFlowers(data);

                const randomFlower = data[Math.floor(Math.random() * data.length)];
                setFlowerOfTheDay(randomFlower);
            })
            .catch((error) => console.error('Error fetching flowers:', error));

        fetch(`${url}/api/colores`)
            .then((response) => response.json())
            .then((data) => setColors(data))
            .catch((error) => console.error('Error fetching colors:', error));

        fetch(`${url}/api/categorias`)
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error('Error fetching categories:', error));
    };

    const handleFilter = (colorId, categoriaId, nombre) => {
        fetch(
            `${BASE_URL}/api/flores?colorId=${colorId || ''}&categoriaId=${categoriaId || ''}&nombre=${nombre || ''}`
        )
            .then((response) => response.json())
            .then((data) => setFilteredFlowers(data))
            .catch((error) => console.error('Error filtering flowers:', error));
    };

    const handleAddToFavorites = (flower) => {
        setFavorites((prevFavorites) => [...prevFavorites, flower]);
    };

    const isLoggedIn = !!localStorage.getItem('token'); // Verifica si el usuario está autenticado

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#fff', color: '#333', padding: '10px' }}>
            <Menu isLoggedIn={isLoggedIn} />
            {location.pathname !== '/login' && location.pathname !== '/register' && <Header />}
            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            {flowerOfTheDay && <FlowerOfTheDay flowerOfTheDay={flowerOfTheDay} />}
                            <FlowerSearch onFilter={handleFilter} categories={categories} colors={colors} />
                            {filteredFlowers.map((flower) => (
                                <FlowerDetails
                                    key={flower.Id}
                                    flower={flower}
                                    onAddToFavorites={handleAddToFavorites}
                                />
                            ))}
                        </div>
                    }
                />
                <Route
                    path="/favoritos"
                    element={
                        isLoggedIn ? (
                            <div>
                                <h2>Mis Favoritos</h2>
                                {favorites.length > 0 ? (
                                    favorites.map((flower) => (
                                        <FlowerDetails key={flower.Id} flower={flower} />
                                    ))
                                ) : (
                                    <p>No tienes flores en favoritos.</p>
                                )}
                            </div>
                        ) : (
                            <Login />
                        )
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            {location.pathname !== '/login' && location.pathname !== '/register' && <Footer />}
        </div>
    );
}

export default App;
