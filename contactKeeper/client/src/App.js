import React,{Fragment} from 'react';
import './App.css';
import Navbar from './components/layouts/Navbar';
import {Route,Switch} from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactState from './context/contact/contactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Alerts from './components/layouts/Alert';
import setAuthToken from './utility/setAuthHeader';
import PrivateRoute from './components/Routes/PrivateRoute';


if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = ()=> {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Fragment>
            <Navbar />
            <div className="container">
              <Alerts />
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </Fragment>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
