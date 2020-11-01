import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import './Styles/App.css';

import ChooseCourse from "./components/ChooseCourse";
import Statistics from "./components/Statistics";

function App() {
  return (
    <Router>
      <div id="body" className="App">
        <div className="topnav">
            <Link to={"/"}>Home</Link>
            <Link to={"/Statistics"}>Statistics</Link>
        </div>
        <Switch>
          <Route path="/" exact component={ChooseCourse} />
          <Route path="/statistics" component={Statistics} />
        </Switch>
        </div>
    </Router>
  );
}

export default App;
