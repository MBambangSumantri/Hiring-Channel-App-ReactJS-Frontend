import React from "react";
import { Switch, Route } from "react-router-dom";

import Card from "./components/Card";
import Profile from './components/Profile'
import Login from "./components/Login";
import EngineerProfile from "./components/EngineerProfile";
import CompanyProfile from "./components/company/CompanyProfile";
import Register from "./components/Register";
import EditProfile from "./components/EditProfile";
import Companies from "./components/company/Card";

// javascript reserved keyword
function Main() {
  return (
    <Switch>
      <Route exact path="/" component={Card} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/engineerprofile/:id" component={EngineerProfile} />
      <Route path="/companyprofile/:id" component={CompanyProfile} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/edit/:id" component={EditProfile} />
      <Route path="/companies" component={Companies} />
    </Switch>
  );
}

export default Main;
