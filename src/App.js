import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserList from './components/user/index';
import UserDetails from "./components/user/userDetails";
import './css/user.css';


class App extends Component {
  render() {
    return (
      <div>
          <header>
              <h1>
                User Management
              </h1>
          </header>
          <BrowserRouter>
          <Switch>
              <Route exact path="/"  component={UserList} />
              <Route exact path="/users/:id" component={UserDetails} />
          </Switch>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
