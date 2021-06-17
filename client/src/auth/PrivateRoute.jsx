import React from "react";
import { isAuthenticated } from "./userAuth";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuthenticated()) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/signup",
                                state: { from: props.location },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default PrivateRoute;
