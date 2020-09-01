import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import AboutUe from './pages/about-us';
import Info from './pages/info';
import Profile from './pages/profile';
import NotFound from './pages/404';
import Registration from './pages/registration';
import Login from './pages/login';


class App extends Component {  
  render () {
    return (
    <Router>
      <Switch>
        <Route exact path="/" component = {Profile}/>
        <Route exact path="/info" component = {Info}/>
        <Route exact path="/about-me" component = {AboutUe}/>
        <Route exact path="/login" component = {Login}/>
        <Route exact path="/registeration" component = {Registration}/>

        <Route exact path ="/404" component = {NotFound}/>
        <Redirect to="/404" />
      </Switch>
    </Router>
    );
  }
}

export default App;