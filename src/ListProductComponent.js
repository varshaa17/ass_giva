import React, { useEffect, useState } from 'react';
import ProductService from './ProductService'; 
import { useNavigate } from 'react-router-dom';

const ListProductComponent = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // Fetch products from the backend
    useEffect(() => {
        ProductService.getProducts().then((res) => {
            
            setProducts(res.data);
            
        }).catch((error) => {
            console.error('Error fetching products:', error);
        });
    }, []);

    const deleteProduct = (id) => {
        // Call delete API from ProductService
        ProductService.deleteProduct(id).then(() => {
            // Update the local state to remove the deleted product
            setProducts(products.filter(product => product.id !== id));
        }).catch((error) => {
            console.error('Error deleting product:', error);
        });
    };

    const viewProduct = (id) => {
        navigate(`/view-product/${id}`);
    };

    const editProduct = (id) => {
        navigate(`/add-product/${id}`);
    };

    const addProduct = () => {
        navigate('/add-product/_add');
    };

    return (
        <div>
            <h2 className="text-center" style={{marginTop: "10px"}}>Products List</h2>
            <div className="row">
                <button className="btn btn-primary" onClick={addProduct}> Add Product</button>
            </div>
            <br />
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th> Product Name</th>
                            <th> Description</th>
                            <th> Price</th>
                            <th> Quantity</th>
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.length > 0 ? (
                                products.map(product => 
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.description || 'N/A'}</td>
                                        <td>${parseFloat(product.price).toFixed(2)}</td>
                                        <td>{product.quantity}</td>
                                        <td>
                                            <button onClick={() => editProduct(product.id)} className="btn btn-info">Update</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => deleteProduct(product.id)} className="btn btn-danger">Delete</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => viewProduct(product.id)} className="btn btn-info">View</button>
                                        </td>
                                    </tr>
                                )
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">No products available</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListProductComponent;
