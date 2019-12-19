import React from "react";
import { Switch, Route } from "react-router-dom";

import Card from "./components/Card";
import Profile from './components/Profile'

// javascript reserved keyword
function Main() {
  return (
    <Switch>
      <Route exact path="/" component={Card} />
      <Route path="/profile/:id" component={Profile} />
    </Switch>
  );
}

export default Main;
