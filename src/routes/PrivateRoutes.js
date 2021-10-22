import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoutes = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={(params) =>
            auth?.isAuthenticated && auth?.user?.token ? (
                <Component {...params} />
            ) : (
                <Redirect to="/auth/login" />
            )
        }
    />
);


export const AdminRoutes = ({ component: Component, adminAuth, ...rest }) => (
    <Route
        {...rest}
        render={(params) =>
            adminAuth?.isAuthenticated && adminAuth?.user?.token ? (
                <Component {...params} />
            ) : (
                <Redirect to="/admin/auth/login" />
            )
        }
    />
);

