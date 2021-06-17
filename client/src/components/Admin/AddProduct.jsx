import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../auth/userAuth";
import Body from "../Body";
import "./AddCategory.css";
import { createProduct, getCategories } from "../../auth/adminAuth";

const AddProduct = () => {
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        categories: [],
        category: "",
        shipping: false,
        stockQty: "",
        image: "",
        error: "",
        loading: false,
        createdProduct: "",
        formData: "",
    });

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        stockQty,
        image,
        error,
        loading,
        createdProduct,
        formData,
    } = values;

    useEffect(() => {
        const initValues = () => {
            getCategories().then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({
                        ...values,
                        error: "",
                        categories: data,
                        formData: new FormData(),
                    });
                }
            });
        };
        initValues();
    }, []);

    const handleChange = (eventName) => (event) => {
        const value =
            eventName === "image" ? event.target.files[0] : event.target.value;
        formData.set(eventName, value);
        setValues({ ...values, [eventName]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: "", loading: true });
        createProduct(user._id, token, formData).then((data) => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error,
                });
            } else {
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    price: "",
                    stockQty: "",
                    loading: false,
                    createdProduct: data.name,
                });
            }
        });
    };

    const newForm = () => (
        <div className="category-form product-form">
            <form className="mb-3" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        onChange={handleChange("name")}
                        type="text"
                        value={name}
                        className="form-control"
                        placeholder="Name"
                    />
                </div>
                <div className="form-group">
                    <textarea
                        onChange={handleChange("description")}
                        value={description}
                        className="form-control"
                        placeholder="Description"
                    />
                </div>
                <div className="form-group">
                    <input
                        onChange={handleChange("price")}
                        type="number"
                        value={price}
                        className="form-control"
                        placeholder="Price"
                    />
                </div>
                <div className="form-group">
                    <select
                        onChange={handleChange("category")}
                        className="form-control col-5 mr-2"
                        value={category}
                    >
                        <option>Category</option>
                        {categories &&
                            categories.map((category, index) => (
                                <option key={index} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                    </select>
                    <select
                        onChange={handleChange("shipping")}
                        className="form-control col-5 ml-2"
                        value={shipping}
                    >
                        <option>Shipping</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
                <div className="form-group">
                    <input
                        onChange={handleChange("stockQty")}
                        type="number"
                        value={stockQty}
                        className="form-control"
                        placeholder="Stock Qty"
                    />
                </div>
                <div className="form-group">
                    <h5>Upload Image</h5>
                    <input
                        onChange={handleChange("image")}
                        className="post-image"
                        type="file"
                        name={image}
                        accept="image/*"
                    />
                </div>
                <button>Create</button>
            </form>
        </div>
    );

    const displaySuccess = () => {
        return (
            <div
                className="alert alert-info"
                style={{ display: createdProduct ? "" : "none" }}
            >
                {createdProduct} is created.
            </div>
        );
    };

    const displayError = () => {
        return (
            <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
            >
                {error}
            </div>
        );
    };

    const displayLoading = () => {
        return (
            <div
                className="alert text-success"
                style={{ display: loading ? "" : "none" }}
            >
                Loading ...
            </div>
        );
    };

    return (
        <Body>
            <div className="container product-cont">
                <div className="heading">
                    <h2>Create Product</h2>
                </div>
                {displayError()}
                {displayLoading()}
                {displaySuccess()}
                {newForm()}
            </div>
        </Body>
    );
};

export default AddProduct;
