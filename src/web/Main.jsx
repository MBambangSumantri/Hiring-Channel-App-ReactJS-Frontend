import React from "react";
import { Switch, Route } from "react-router-dom";

import Card from "./components/Card";
import Profile from './components/Profile'
import Login from "./components/Login";
import Register from "./components/Register";
import EditProfile from "./components/EditProfile";

// javascript reserved keyword
function Main() {
  return (
    <Switch>
      <Route exact path="/" component={Card} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/edit/:id" component={EditProfile} />
    </Switch>
  );
}

export default Main;
