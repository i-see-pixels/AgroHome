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
            <div>
                <Body>
                    <div className="container">
                        <div className="heading">
                            <h2>DASHBOARD</h2>
                        </div>
                        <div className="details-container">
                            <div className="profile-pic">
                                <i
                                    class="fa fa-user-circle"
                                    aria-hidden="true"
                                ></i>
                                <Link to="/profile/update">
                                    <button className="btn btn--primary btn--medium">
                                        Update info
                                    </button>
                                </Link>
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
                                            {access_level === 1
                                                ? "Admin"
                                                : "User"}
                                        </li>
                                    </ul>
                                </div>
                                <div className="card mb-5">
                                    <h3 className="card-header">
                                        Purchase History
                                    </h3>
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            history
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Body>
            </div>
        );
    }
}

export default Dashboard;
