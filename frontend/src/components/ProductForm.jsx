// frontend/src/components/ProductForm.js
import React, { useState, useEffect } from 'react';
import productService from '../services/productService';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams

const ProductForm = () => {
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const { id } = useParams(); // Get the product ID from the URL, if present

    useEffect(() => {
        if (id) {
            // If there's an ID, it's an edit operation, so fetch the product
            async function fetchProduct() {
                try {
                    const product = await productService.getProductById(id);
                    setName(product.name);
                    setSku(product.sku);
                    setDescription(product.description);
                } catch (error) {
                    console.error('Error fetching product:', error);
                    // Handle error appropriately
                }
            }
            fetchProduct();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = { name, sku, description };

        try {
            if (id) {
                // Update existing product
                await productService.updateProduct(id, productData);
            } else {
                // Create new product
                await productService.createProduct(productData);
            }
            navigate('/products'); // Redirect to the product list page
        } catch (error) {
            console.error('Error submitting product:', error);
            // Handle error appropriately (e.g., display an error message)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="sku">SKU:</label>
                <input
                    type="text"
                    id="sku"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button type="submit">{id ? 'Update Product' : 'Add Product'}</button>
        </form>
    );
};

export default ProductForm;