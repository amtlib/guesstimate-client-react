import React, { Component } from 'react';
import Login from './Login/Login'
import Categories from './Categories'
import Questions from './Questions'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class Main extends Component {
  render() {
    return (
        <Router>
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/categories" component={Categories} />
            <Route exact={true} path="/categories/:id/questions" component={Questions} />
        </Router>
    );
  }
}

export default Main;
