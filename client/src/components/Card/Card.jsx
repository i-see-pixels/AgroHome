import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { addItem } from "../Core/apiCore";
import ShowProducts from "../Core/ShowProducts";
import "./Card.css";

const Card = ({ product }) => {
    const [redirect, setRedirect] = useState(false);

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        });
    };

    const redirectToCart = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };

    return (
        <div className="card product-card">
            <div className="card-body product-card-body">
                {redirectToCart(redirect)}
                <div className="card-image">
                    <ShowProducts item={product} url="product" />
                </div>
                <Link to={`/product/${product._id}`}>
                    <h4 className="card-name">{product.name}</h4>
                </Link>
                <p className="card-price">&#x20B9; {product.price}</p>

                <button onClick={addToCart} className="btn btn--primary">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Card;
