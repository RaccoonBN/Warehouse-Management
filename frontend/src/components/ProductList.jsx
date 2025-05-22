// frontend/src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import productService from '../services/productService';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error appropriately (e.g., display an error message)
      }
    }
    fetchProducts();
  }, []);

  const handleEdit = (productId) => {
      navigate(`/products/edit/${productId}`); // Navigate to edit page
  };

  const handleDelete = async (productId) => {
      try {
          await productService.deleteProduct(productId);
          setProducts(products.filter(product => product.id !== productId)); // Update the product list
      } catch (error) {
          console.error('Error deleting product:', error);
          // Handle error (e.g., show an error message)
      }
  };

  return (
    <div>
      <h2>Product List</h2>
      <table>
          <thead>
              <tr>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Description</th>
                  <th>Actions</th>
              </tr>
          </thead>
          <tbody>
              {products.map(product => (
                  <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.sku}</td>
                      <td>{product.description}</td>
                      <td>
                          <button onClick={() => handleEdit(product.id)}>Edit</button>
                          <button onClick={() => handleDelete(product.id)}>Delete</button>
                      </td>
                  </tr>
              ))}
          </tbody>
      </table>
    </div>
  );
}

export default ProductList;