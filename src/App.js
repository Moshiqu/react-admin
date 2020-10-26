import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Login from "./views/Login/index";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div >
        <BrowserRouter>
          <Switch>
            <Route exact component={Login} path="/" />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
