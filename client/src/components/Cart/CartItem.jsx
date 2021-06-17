import React, { useState } from "react";
import { Link } from "react-router-dom";
import { removeCartItem, updateCartItem } from "../Core/apiCore";
import ShowProducts from "../Core/ShowProducts";

const CartItem = ({ item, setItems }) => {
    const [qtyCount, setQtyCount] = useState(item.count);

    const handleChange = (productId) => (e) => {
        setQtyCount(e.target.value < 1 ? 1 : e.target.value);
        if (e.target.value >= 1) {
            updateCartItem(productId, e.target.value);
        }
    };

    const showStock = (quantity) => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">In stock</span>
        ) : (
            <span className="badge badge-primary badge-pill alert-danger">
                Out of stock
            </span>
        );
    };

    return (
        <div className="cart_product">
            <div className="product_img">
                {<ShowProducts item={item} url="product" />}
            </div>
            <div className="product_description">
                <div className="product_name">
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                </div>
                <div className="subline">
                    {item.description.substr(0, 150)} ...
                </div>
                <div className="category-info">
                    Category : {item.category && item.category.name}
                </div>

                {showStock(item.stockQty)}
                <div className="utils">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Qty</span>
                        </div>
                        <input
                            type="number"
                            className="form-control"
                            value={qtyCount}
                            onChange={handleChange(item._id)}
                        />
                    </div>
                    <button
                        className="btn btn-danger"
                        onClick={() => removeCartItem(item._id, setItems)}
                    >
                        Remove
                    </button>
                </div>
            </div>
            <div className="product_price">
                <i className="fas fa-rupee-sign"></i>
                {item.price}
            </div>
        </div>
    );
};

export default CartItem;
