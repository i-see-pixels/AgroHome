import React, { Component } from "react";
import "./SignUp.css";
import {
    signup,
    signin,
    authenticate,
    isAuthenticated,
} from "../../auth/userAuth";
import { Redirect } from "react-router-dom";

export class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            click: false,
            values_su: {
                name: "",
                email: "",
                mobile_no: "",
                password: "",
                error: "",
                success: false,
            },
            values_si: {
                email: "",
                password: "",
                error: "",
                loading: false,
                redirect: false,
            },
        };
    }

    handleClick = () => {
        this.setState({ click: !this.state.click });
    };

    handleChangeSU = (eventName) => (event) => {
        this.setState({
            values_su: {
                ...this.state.values_su,
                error: false,
                [eventName]: event.target.value,
            },
        });
    };

    handleChangeSI = (eventName) => (event) => {
        this.setState({
            values_si: {
                ...this.state.values_si,
                error: false,
                [eventName]: event.target.value,
            },
        });
    };

    clickSubmitSU = (e) => {
        e.preventDefault();
        const { name, email, mobile_no, password } = this.state.values_su;
        this.setState({ ...this.state.values_su, error: false });
        signup({ name, email, mobile_no, password }).then((data) => {
            if (data.error) {
                console.log(data);
                this.setState({
                    values_su: {
                        ...this.state.values_su,
                        error: data.error,
                        success: false,
                    },
                });
            } else {
                this.setState({
                    values_su: {
                        ...this.state.values_su,
                        name: "",
                        email: "",
                        mobile_no: "",
                        password: "",
                        success: true,
                    },
                });
            }
        });
    };

    clickSubmitSI = (e) => {
        e.preventDefault();
        const { email, password } = this.state.values_si;
        this.setState({
            ...this.state.values_si,
            error: false,
            loading: true,
        });
        signin({ email, password }).then((data) => {
            if (data.error) {
                console.log(data);
                this.setState({
                    values_si: {
                        ...this.state.values_si,
                        error: data.error,
                        loading: false,
                    },
                });
            } else {
                authenticate(data, () => {
                    this.setState({
                        values_si: {
                            ...this.state.values_si,
                            redirect: true,
                        },
                    });
                });
            }
        });
    };

    displayErrorSU = () => {
        return (
            <div
                className="alert alert-danger"
                style={{ display: this.state.values_su.error ? "" : "none" }}
            >
                {this.state.values_su.error}
            </div>
        );
    };

    displayErrorSI = () => {
        return (
            <div
                className="alert alert-danger"
                style={{ display: this.state.values_si.error ? "" : "none" }}
            >
                {this.state.values_si.error}
            </div>
        );
    };

    displaySuccessSU = () => {
        return (
            <div
                className="alert alert-info"
                style={{ display: this.state.values_su.success ? "" : "none" }}
            >
                New Account created. Please Sign In.
            </div>
        );
    };

    displayLoading = () => {
        return (
            this.state.values_si.loading && (
                <div className="alert alert-info">Loading...</div>
            )
        );
    };

    redirectUser = () => {
        const { user } = isAuthenticated();
        if (this.state.values_si.redirect) {
            if (user && user.access_level === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }

        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    render() {
        return (
            <div className="body">
                <div
                    className={
                        this.state.click
                            ? "container sign-up-active"
                            : "container"
                    }
                >
                    <div className="form-container SU sign-in-container">
                        <form action="/">
                            <h2>Sign in</h2>
                            {this.displayErrorSI()}
                            {this.displayLoading()}
                            {this.redirectUser()}
                            <input
                                onChange={this.handleChangeSI("email")}
                                type="email"
                                placeholder="Email"
                                value={this.state.values_si.email}
                            />
                            <input
                                onChange={this.handleChangeSI("password")}
                                type="password"
                                placeholder="Password"
                                value={this.state.values_si.password}
                            />
                            <a href="/">Forgot password?</a>
                            <button onClick={this.clickSubmitSI}>
                                Sign in
                            </button>

                            <span>or login using</span>

                            <div className="social-media-container">
                                <a href="/" className="social">
                                    <i className="fab fa-facebook"></i>
                                </a>
                                <a href="/" className="social">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="/" className="social">
                                    <i className="fab fa-google"></i>
                                </a>
                            </div>
                        </form>
                    </div>

                    <div className="form-container SU sign-up-container">
                        <form action="/">
                            <h2>Create Account</h2>
                            {this.displayErrorSU()}
                            {this.displaySuccessSU()}
                            <input
                                onChange={this.handleChangeSU("name")}
                                type="text"
                                placeholder="Name"
                                value={this.state.values_su.name}
                            />
                            <input
                                onChange={this.handleChangeSU("email")}
                                type="email"
                                placeholder="Email"
                                value={this.state.values_su.email}
                            />
                            <input
                                onChange={this.handleChangeSU("mobile_no")}
                                type="tel"
                                placeholder="Mobile Number"
                                value={this.state.values_su.mobile_no}
                            />
                            <input
                                onChange={this.handleChangeSU("password")}
                                type="password"
                                placeholder="Password"
                                value={this.state.values_su.password}
                            />
                            <button onClick={this.clickSubmitSU}>
                                Sign up
                            </button>

                            <span>or sign up using</span>

                            <div className="social-media-container">
                                <a href="/" className="social">
                                    <i className="fab fa-facebook"></i>
                                </a>
                                <a href="/" className="social">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="/" className="social">
                                    <i className="fab fa-google"></i>
                                </a>
                            </div>
                        </form>
                    </div>

                    <div className="side-container">
                        <div className="overlay">
                            <div className="side-panel left-panel">
                                <h1>Already a member?</h1>
                                <p>We have new buyers waiting for you</p>
                                <button
                                    className="side-btn"
                                    id="signIn"
                                    onClick={this.handleClick}
                                >
                                    Sign in
                                </button>
                            </div>
                            <div className="side-panel right-panel">
                                <h1>New here?</h1>
                                <p>
                                    Start selling your products to a large
                                    community of retailers
                                </p>
                                <button
                                    className="side-btn"
                                    id="signUp"
                                    onClick={this.handleClick}
                                >
                                    Sign up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;
