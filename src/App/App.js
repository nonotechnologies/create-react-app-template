import React from 'react';
// import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Router, Switch, Route, Link, Redirect } from "react-router-dom";

import { connect } from 'react-redux';

import { history } from '../helpers/history';
import { alertActions } from '../actions/alert.action';
import { PrivateRoute } from '../components/PrivateRoute';
import { LoginPage } from '../components/LoginPage';
import './App.css';
import { RegisterPage } from '../components/RegisterPage/RegisterPage';
import { HomePage } from '../components/HomePage';

class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      console.log('chage');
      console.log(location)
      // clear alert on location change
      this.props.clearAlerts();
    });
  }

  render() {
    const { alert } = this.props;
    return (

      <Router history={history}>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>MY brand</Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/login"}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/register"}>Sign up</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="auth-wrapper">
            <div className="col-sm-12">
              {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              }
            </div>
            <div className="auth-inner">
              <Switch>
                <PrivateRoute exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Redirect from="*" to="/" />
              </Switch>
            </div>
          </div>
        </div></Router>
      //   </div>
      // </div>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };