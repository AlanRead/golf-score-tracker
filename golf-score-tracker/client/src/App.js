import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import './Styles/App.css';

import ChooseCourse from "./components/ChooseCourse";
import Statistics from "./components/Statistics";
import GameScores from "./components/GameScores"

function App() {
  return (
    <Router>
      <div id="body" className="App">
        <div className="topnav">
            <Link to={"/"}>Home</Link>
            <Link to={"/Statistics"}>Statistics</Link>
            <Link to={"/GameScores"}>Score Cards</Link>
        </div>
        <Switch>
          <Route path="/" exact component={ChooseCourse} />
          <Route path="/Statistics" component={Statistics} />
          <Route path="/GameScores" component={GameScores} />
        </Switch>
        </div>
    </Router>
  );
}

export default App;
