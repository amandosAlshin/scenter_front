import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { Router,Route,Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import configureStore from './store'
import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'

// Containers
import { LayoutCont } from './containers';
// Pages
import {  Page404, Page500, Register,PageNotTicket } from './views/Pages';
import {LoginCont} from './containers/Login';
// import { renderRoutes } from 'react-router-config';
const customHistory = createBrowserHistory();
const store = configureStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={customHistory}>
          <Switch>
            <Route exact path="/login" name="Вход" component={LoginCont} />
            <Route exact path="/notticket" name="Уведомление" component={PageNotTicket} />
            <Route exact path="/register" name="Register Page" component={Register} />
            <Route exact path="/404" name="Page 404" component={Page404} />
            <Route exact path="/500" name="Page 500" component={Page500} />
            <Route path="/" name="Home" component={LayoutCont} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
