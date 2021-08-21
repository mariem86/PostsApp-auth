import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAuthUser } from "./components/js/action/authAction";
import Spinner from "./components/layout/spinner/Spinner";
import AppNavbar from "./components/layout/AppNavbar";
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
import PrivateRoute from "./components/route/PrivateRoute";
import "./App.css";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = () => dispatch(getAuthUser());
    getUser();
  }, [dispatch]);

  const loading = useSelector((state) => state.authReducer.isLoading);

  if (loading) {
    return <Spinner />;
  } else
    return (
      <BrowserRouter>
        <AppNavbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    );
};

export default App;

