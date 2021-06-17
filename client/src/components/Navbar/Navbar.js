import React, { Component, Fragment } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import logo_agro from "../../resources/Logo/agro-logo-full.png";
import "./Navbar.css";
import Dropdown from "./Dropdown";
import { signout, isAuthenticated } from "../../auth/userAuth";
import { itemTotal } from "../Core/apiCore";

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked: false,
            dropdown: false,
            to: "",
        };
    }

    handleDropdown = () => {
        this.setState({ dropdown: !this.state.dropdown });
    };

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    };
    render() {
        return (
            <nav className="NavItems">
                <div className="navbar-logo">
                    <img src={logo_agro} alt="AgroHome Logo" />
                </div>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i
                        className={
                            this.state.clicked ? "fas fa-times" : "fas fa-bars"
                        }
                    ></i>
                </div>
                <ul
                    className={
                        this.state.clicked ? "nav-menu active" : "nav-menu"
                    }
                >
                    <li>
                        <NavLink
                            exact
                            to="/"
                            activeClassName="active-link"
                            className="nav-links"
                        >
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <div
                            onClick={this.handleDropdown}
                            className={
                                this.state.dropdown
                                    ? "nav-links active-link"
                                    : "nav-links"
                            }
                        >
                            Categories
                            <i
                                className="fa fa-caret-down"
                                aria-hidden="true"
                            ></i>
                        </div>
                        {this.state.dropdown && <Dropdown />}
                    </li>

                    <NavLink
                        exact
                        to="/contactus"
                        activeClassName="active-link"
                        className="nav-links"
                    >
                        Contact Us
                    </NavLink>

                    <NavLink
                        exact
                        to="/about"
                        activeClassName="active-link"
                        className="nav-links"
                    >
                        About
                    </NavLink>

                    <NavLink
                        exact
                        to="/cart"
                        activeClassName="active-link"
                        className="nav-links"
                    >
                        <i
                            className="fa fa-shopping-cart"
                            aria-hidden="true"
                        ></i>
                        <small className="cart-badge">{itemTotal()}</small>
                    </NavLink>

                    <NavLink
                        exact
                        to="/signup"
                        activeClassName="active-link"
                        className="nav-links-mobile"
                    >
                        Sign In
                    </NavLink>
                </ul>
                <div className="user-menu">
                    {isAuthenticated() &&
                        isAuthenticated().user.access_level === 0 && (
                            <NavLink
                                exact
                                to="/user/dashboard"
                                activeClassName="active-link"
                                className="nav-links"
                            >
                                <i
                                    class="fa fa-user-circle"
                                    aria-hidden="true"
                                ></i>
                                <h5>Dashboard</h5>
                            </NavLink>
                        )}

                    {isAuthenticated() &&
                        isAuthenticated().user.access_level === 1 && (
                            <NavLink
                                exact
                                to="/admin/dashboard"
                                activeClassName="active-link"
                                className="nav-links"
                            >
                                <i
                                    class="fa fa-user-circle"
                                    aria-hidden="true"
                                ></i>
                                <h5>Dashboard</h5>
                            </NavLink>
                        )}

                    {!isAuthenticated() && (
                        <Link to="/signup">
                            <button className="btn btn--primary btn--medium">
                                Sign In
                            </button>
                        </Link>
                    )}

                    {isAuthenticated() && (
                        <Fragment>
                            <button
                                onClick={() => {
                                    signout(() => {
                                        alert("You've been signed out.");
                                        this.props.history.push("/");
                                    });
                                }}
                                className="btn btn--primary btn--medium"
                            >
                                Sign Out
                            </button>
                        </Fragment>
                    )}
                </div>
            </nav>
        );
    }
}

export default withRouter(Navbar);
