import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5005/api',
});

export const uploadProduct = async (formData) => {
  try {
    const response = await api.post('/vendor/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default api;