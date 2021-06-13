// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React from 'react';
import { withCookies } from 'react-cookie';
import './App.css';
import '@progress/kendo-theme-default/dist/all.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Privacy from "./tabs/Privacy";
import TermsOfUse from "./tabs/TermsOfUse";
import Login from './tabs/login';

class App extends React.Component {

  render() {

    // Display the app home page hosted in Teams
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/termsofuse" component={TermsOfUse} />
          <Route path="*" render={() => (<Login />)} />
        </Switch>
      </Router>
    );
  }
}

export default withCookies(App);
