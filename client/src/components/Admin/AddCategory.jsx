import React, { useState } from "react";
import { isAuthenticated } from "../../auth/userAuth";
import Body from "../Body";
import "./AddCategory.css";
import { createCategory } from "../../auth/adminAuth";

const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const newCatForm = () => (
        <div className="category-form">
            <form onSubmit={clickSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Category Name"
                        onChange={handleChange}
                        value={name}
                        autoFocus
                        required
                    />
                </div>
                <button>Create</button>
            </form>
        </div>
    );

    const handleChange = (e) => {
        setError(false);
        setSuccess(false);
        setName(e.target.value);
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        createCategory(user._id, token, { name }).then((data) => {
            if (data.error) {
                setError(true);
            } else {
                setError(false);
                setSuccess(true);
            }
        });
    };

    const displaySuccess = () => {
        return (
            <div
                className="alert alert-info"
                style={{ display: success ? "" : "none" }}
            >
                {name} is created.
            </div>
        );
    };

    const displayError = () => {
        return (
            <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
            >
                Category should be unique.
            </div>
        );
    };

    return (
        <Body>
            <div className="container category-cont">
                <div className="heading">
                    <h2>Create Category</h2>
                </div>
                {displayError()}
                {displaySuccess()}
                {newCatForm()}
            </div>
        </Body>
    );
};

export default AddCategory;
