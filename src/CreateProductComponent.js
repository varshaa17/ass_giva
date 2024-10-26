import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductService from './ProductService';

const CreateProductComponent = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setdescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (id !== '_add') {
            ProductService.getProductById(id).then(res => {
                const product = res.data;
                setName(product.name);
                setdescription(product.description);
                setPrice(product.price);
                setQuantity(product.quantity);
            });
        }
    }, [id]);

    const saveOrUpdateProduct = (e) => {
       
        e.preventDefault();
        const product = { name, description, price, quantity };

        if (id === '_add') {
            ProductService.createProduct(product).then(() => {
                navigate('/');
            });
        } else {
            ProductService.updateProduct(product, id).then(() => {
                navigate('/');
            });
        }
    };

    const cancel = () => {
        navigate('/');
    };

    const getTitle = () => (id === '_add' ? 'Add Product' : 'Update Product');

    return (
        <div>
            <br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        <h3 className="text-center" style={{ marginTop: "10px" }}>{getTitle()}</h3>
                        <div className="card-body">
                            <form onSubmit={saveOrUpdateProduct}>
                                <div className="form-group">
                                    <label>Product Name:</label>
                                    <input
                                        placeholder="Product Name"
                                        name="name"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>description:</label>
                                    <input
                                        placeholder="description"
                                        name="description"
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setdescription(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Price:</label>
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        name="price"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Quantity:</label>
                                    <input
                                        type="number"
                                        placeholder="Quantity"
                                        name="quantity"
                                        className="form-control"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-success" type="submit" style={{ marginTop: "10px" }} onClick={saveOrUpdateProduct}>Save</button>
                                    <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: "10px" ,marginTop:"10px" }}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProductComponent;
