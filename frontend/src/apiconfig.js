import axios from 'axios';

// Función para obtener la configuración del backend
const getBackendConfig = async () => {
  try {
    const response = await axios.get('/api/config'); // Llamada al backend
    return response.data.baseUrl;
  } catch (error) {
    console.error('Error fetching backend config:', error);
    return 'http://localhost:4000'; // Fallback URL en caso de error
  }
};

export default getBackendConfig;
