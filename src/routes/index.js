import React, { useContext } from "react";
import { Switch, Route } from "react-router";

//user
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import Home from "./../pages/Home";

import Toast from './../components/Toast';

//admin
import LoginAdmin from "./../pages/Admin/Login";
import Categories from "./../pages/Admin/Categories";
import Users from "./../pages/Admin/Users";

import { PrivateRoutes, AdminRoutes } from './PrivateRoutes';

import { authContext } from './../context/Auth/authContext';
import { adminAuthContext } from './../context/AuthAdmin/adminAuthContext';

export default function AppRoutes() {
  const auth = useContext(authContext);
  const adminAuth = useContext(adminAuthContext);

  return (
    <Switch>
        <AdminRoutes component={Users}  adminAuth={adminAuth} exact path="/admin/users" />
        <AdminRoutes component={Categories}  adminAuth={adminAuth} exact path="/admin/categories" />
        <Route exact path="/admin/auth/login">
          <LoginAdmin adminAuth={adminAuth}  />
        </Route>        
        <PrivateRoutes component={Home} auth={auth} exact path="/" />   
        <Route exact path="/auth/login">
          <Login auth={auth}  />
        </Route>
        <Route exact path="/auth/register">
          <Register auth={auth} />
        </Route>
        <Route path="*">
          <div>
            <h2>Esta pagina no se encuentra</h2>
          </div>
        </Route>
    </Switch>
  );
}
