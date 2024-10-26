import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductService from './ProductService'; 

const ViewProductComponent = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await ProductService.getProductById(id);
                setProduct(res.data);
            } catch (err) {
                console.error("Error fetching product:", err);
                navigate('/'); 
            } finally {
                setLoading(false); 
            }
        };

        fetchProduct();
    }, [id, navigate]);

    // Display a loading message while fetching product details
    if (loading) {
        return <div className="text-center">Loading product details...</div>;
    }

    // If the product is not found, display a message
    if (!product) {
        return <div className="text-center">Product not found.</div>;
    }

    return (
        <div>
            <br />
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center">View Product Details</h3>
                <div className="card-body">
                    <div className="row">
                        <label>Product Name:</label>
                        <b>{product.name}</b>
                    </div>
                    <div className="row">
                        <label>description:</label>
                        <b>{product.description}</b>
                    </div>
                    <div className="row">
                        <label>Price:</label>
                        <b>${product.price}</b> 
                    </div>
                    <div className="row">
                        <label>Quantity:</label>
                        <b>{product.quantity}</b>
                    </div>
                    <div className="row">
                        <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Product List</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProductComponent;
