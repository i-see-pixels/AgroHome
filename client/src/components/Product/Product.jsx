import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Body from "../Body";
import moment from "moment";
import { addItem, getProductInfo, getRelatedProducts } from "../Core/apiCore";
import ShowProducts from "../Core/ShowProducts";
import "./Product.css";
import Card from "../Card/Card";

const Product = (props) => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState([]);
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const loadProduct = (productId) => {
        getProductInfo(productId).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                getRelatedProducts(data._id).then((data) => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProducts(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadProduct(productId);
    }, [props]);

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
        <Body page_name="product">
            <div className="prodInfo-container">
                {redirectToCart(redirect)}
                <div className="product-image">
                    <ShowProducts item={product} url="product" />
                </div>
                <div className="product-details">
                    <div className="product-name">{product.name}</div>
                    <div className="product-description">
                        <p>{product.description}</p>
                    </div>
                    <div className="category-info">
                        Category : {product.category && product.category.name}
                    </div>
                    <div className="added-on">
                        Added {moment(product.createdAt).fromNow()}
                    </div>
                    {showStock(product.stockQty)}
                    <div className="product-price">
                        &#x20B9; {product.price} <span>/kg</span>
                    </div>
                    <button className="btn" onClick={addToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>

            <div className="prodInfo-container related-products">
                <div className="card-heading">Related Products</div>
                <div className="prod-body">
                    {relatedProducts.map((prod, i) => (
                        <Card product={prod} key={i} />
                    ))}
                </div>
            </div>
        </Body>
    );
};

export default Product;
