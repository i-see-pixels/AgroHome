import React, { Component } from "react";
import { isAuthenticated } from "../../auth/userAuth";
import { Link } from "react-router-dom";
import Body from "../Body";
import "./Dashboard.css";

export class Dashboard extends Component {
    render() {
        const {
            user: { name, email, mobile_no, access_level },
        } = isAuthenticated();
        return (
            <Body>
                <div className="container">
                    <div className="heading">
                        <h2>DASHBOARD</h2>
                    </div>
                    <div className="details-container">
                        <div className="admin-links">
                            <div className="card">
                                <h3 className="card-header">Admin Links</h3>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <Link
                                            to="/create/category"
                                            className="link"
                                        >
                                            Create Category
                                        </Link>
                                    </li>
                                    <li className="list-group-item">
                                        <Link
                                            to="/create/product"
                                            className="link"
                                        >
                                            Create Product
                                        </Link>
                                    </li>
                                    {/* <li className="list-group-item"></li> */}
                                </ul>
                            </div>
                        </div>
                        <div className="details">
                            <div className="card mb-5">
                                <h3 className="card-header">
                                    User Information
                                </h3>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <span>Name</span>
                                        {name}
                                    </li>
                                    <li className="list-group-item">
                                        <span>Email</span>
                                        {email}
                                    </li>
                                    <li className="list-group-item">
                                        <span>Mobile No.</span>
                                        {mobile_no}
                                    </li>
                                    <li className="list-group-item">
                                        <span>Access</span>
                                        {access_level === 1 ? "Admin" : "User"}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Body>
        );
    }
}

export default Dashboard;
