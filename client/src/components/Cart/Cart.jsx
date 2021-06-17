import Body from "../Body";
import React, { useEffect, useState } from "react";
import { getCart } from "../Core/apiCore";
import { Link } from "react-router-dom";
import "./Cart.css";
import CartItem from "./CartItem";
import { isAuthenticated } from "../../auth/userAuth";

const Cart = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        setItems(getCart());
    }, []);
    console.log(items);
    const showCartItems = (cartItems) =>
        cartItems.map((item, i) => (
            <CartItem item={item} key={i} setItems={setItems} />
        ));

    const getTotal = () => {
        return items.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const emptyCartMsg = () => {
        return (
            <div className="cart_product empty_cart">
                Cart is Empty. <Link to="/search"> Continue shopping</Link>
            </div>
        );
    };

    return (
        <Body>
            <div className="main_container">
                <div className="cart_container">
                    <div className="total_items">
                        Your cart has {items.length}{" "}
                        {items.length === 1 ? "item" : "items"}.
                    </div>
                    <div className="cart_nav">
                        <h2>Product</h2>
                        <h2>Price</h2>
                    </div>
                    <div className="products_container">
                        {items.length > 0
                            ? showCartItems(items)
                            : emptyCartMsg()}
                    </div>
                    <div className="product_total">
                        <div className="subtotal">
                            <h1>Subtotal</h1>
                            <span>
                                <i className="fas fa-rupee-sign"></i>
                                {getTotal()}
                            </span>
                        </div>
                        {isAuthenticated() ? (
                            <button className="btn">Proceed to Checkout</button>
                        ) : (
                            <Link to="/signup">
                                <button className="btn btn-danger">
                                    Sign in to Checkout
                                </button>
                            </Link>
                        )}
                    </div>
                </div>

                <div className="side_container">
                    <div className="product_total">
                        <div className="subtotal">
                            <h1>Subtotal</h1>
                            <span>
                                <i className="fas fa-rupee-sign"></i>
                                {getTotal()}
                            </span>
                        </div>
                        {isAuthenticated() ? (
                            <button className="btn">Proceed to Checkout</button>
                        ) : (
                            <Link to="/signup">
                                <button className="btn btn-danger">
                                    Sign in to Checkout
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </Body>
    );
};

export default Cart;
