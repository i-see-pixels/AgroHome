import React from "react";
import { isAuthenticated } from "./userAuth";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (
                    isAuthenticated() &&
                    isAuthenticated().user.access_level === 1
                ) {
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

export default AdminRoute;
