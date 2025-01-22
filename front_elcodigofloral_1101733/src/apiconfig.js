import axios from 'axios';

const backendUrls = [
  'http://localhost:8000', 
  'http://localhost:8500', 
  'http://127.0.0.1:4000', 
  'http://localhost:3001'
];

const getBackendConfig = async () => {
  for (const url of backendUrls) {
    try {
      const response = await axios.get(`${url}/api/config`);
      if (response.status === 200) {
        console.log(`Backend config found at ${url}`);
        return response.data.baseUrl;  // O cualquier otra respuesta que necesites
      }
    } catch (error) {
      console.error(`Error fetching config from ${url}:`, error.message);
    }
  }

  // Si todas las URLs fallan, puedes devolver un valor por defecto o lanzar un error
  console.error('Failed to fetch backend config from all URLs');
  return 'http://127.0.0.1:4000'; // Fallback URL
};

export default getBackendConfig;
