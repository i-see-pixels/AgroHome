import React, { useState, useEffect } from "react";
import Body from "../Body";
import "./Home.css";
import { getProducts } from "../Core/apiCore";
import Card from "../Card/Card";

//Images
import c1 from "../../resources/Images/c1.jpg";
import c2 from "../../resources/Images/c2.jpg";
import c3 from "../../resources/Images/c3.jpg";

export const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState("");

    const getProductsBySold = () => {
        getProducts("sold").then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const getProductsByArrival = () => {
        getProducts("createdAt").then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        getProductsByArrival();
        getProductsBySold();
    }, []);

    return (
        <Body>
            <div className="slider">
                <div id="demo" className="carousel slide" data-ride="carousel">
                    <ul className="carousel-indicators">
                        <li
                            data-target="#demo"
                            data-slide-to="0"
                            class="active"
                        ></li>
                        <li data-target="#demo" data-slide-to="1"></li>
                        <li data-target="#demo" data-slide-to="2"></li>
                    </ul>

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                src={c1}
                                className="d-block w-100"
                                alt="Los Angeles"
                            />

                            <div className="carousel-caption">
                                <h1 className="title-color">
                                    Welcome to AgroHome
                                </h1>
                                <p>We deal in Agricultural products</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img
                                src={c2}
                                className="d-block w-100"
                                alt="Chicago"
                            />
                            <div className="carousel-caption">
                                <h1>We are first of our own kind</h1>
                                <p>With best Services</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img
                                src={c3}
                                className="d-block w-100"
                                alt="New York"
                            />
                            <div className="carousel-caption">
                                <h1>The best you can get</h1>
                                <p>
                                    Local Products prepared by best in business
                                </p>
                            </div>
                        </div>
                    </div>

                    <a
                        className="carousel-control-prev"
                        href="#demo"
                        data-slide="prev"
                    >
                        <span className="carousel-control-prev-icon"></span>
                    </a>
                    <a
                        className="carousel-control-next"
                        href="#demo"
                        data-slide="next"
                    >
                        <span className="carousel-control-next-icon"></span>
                    </a>
                </div>
            </div>
            <div className="products">
                <div className="card-div">
                    <div className="card-heading">Products by Arrival</div>
                </div>
                <div className="prod-body">
                    {productsByArrival.map((prod, i) => (
                        <Card product={prod} key={i} />
                    ))}
                </div>

                <div className="card-heading">Popular Products</div>
                <div className="prod-body">
                    {productsBySell.map((prod, i) => (
                        <Card product={prod} key={i} />
                    ))}
                </div>
            </div>
        </Body>
    );
};

export default Home;
