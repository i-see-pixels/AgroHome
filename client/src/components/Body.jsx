import "./Body.css";
import React from "react";

const Body = ({ children, page_name }) => {
    return (
        <div className="body-wrapper">
            <div className="nav-overlay"></div>
            <div
                className={
                    page_name === "product"
                        ? "body-container prod-overlay"
                        : "body-container"
                }
            >
                {children}
            </div>
        </div>
    );
};

export default Body;
