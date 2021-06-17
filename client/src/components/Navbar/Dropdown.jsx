import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dropdown.css";
import { getCategories } from "../../auth/adminAuth";

function Dropdown() {
    const [click, setClick] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        const initValues = () => {
            getCategories().then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setData(data);
                }
            });
        };
        initValues();
    }, []);

    const handleClick = () => {
        setClick(!click);
    };

    return (
        <div>
            <ul
                onClick={handleClick}
                className={
                    click ? "categories-menu clicked" : "categories-menu"
                }
            >
                <li>
                    <Link
                        to={{
                            pathname: `/search`,
                            state: {
                                browseCategory: "",
                            },
                        }}
                        className="category-link"
                        onClick={() => setClick(false)}
                    >
                        Browse all
                    </Link>
                </li>
                {data.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link
                                exact
                                to={{
                                    pathname: `/search/${item._id}`,
                                    state: {
                                        browseCategory: item._id,
                                    },
                                }}
                                className="category-link"
                                onClick={() => setClick(false)}
                            >
                                {item.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Dropdown;
