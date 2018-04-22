import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Articles from "./pages/Articles";
import NoMatch from "./pages/NoMatch";
import Hero from "./components/Hero";

const App = () => (
  <Router>
    <div>
      <Hero />
      <Switch>
        <Route exact path="/" component={Articles} />
        <Route exact path="/articles" component={Articles} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
