// frontend/src/services/productService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';  // Thay đổi nếu cần

const getAllProducts = async () => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.get(API_URL, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

const createProduct = async (productData) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.post(API_URL, productData, config);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.get(`${API_URL}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

const updateProduct = async (id, productData) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.put(`${API_URL}/${id}`, productData, config);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with id ${id}:`, error);
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    await axios.delete(`${API_URL}/${id}`, config);
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error;
  }
};

const productService = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};

export default productService;