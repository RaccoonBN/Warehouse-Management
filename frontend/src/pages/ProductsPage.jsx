// frontend/src/pages/ProductsPage.js
import React from 'react';
import ProductList from '../components/ProductList';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
    return (
        <div>
            <h1>Products</h1>
            <Link to="/products/add">Add New Product</Link>
            <ProductList />
        </div>
    );
};

export default ProductsPage;