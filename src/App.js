import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import About from "./views/About";
import Home from "./views/Home";
import News from "./views/News";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div >
        <h1 >蒲晓雪是猪猪</h1>
        <BrowserRouter>
          <Switch>
            <Route exact component={Home} path="/" />
            <Route component={About} path="/about" />
            <Route component={News} path="/News" />
          </Switch>
        </BrowserRouter>
      </div>

      //   <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
    )
  }
}

export default App;
