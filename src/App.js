import React from "react";
import "./reset.css";
import "./styles.scss";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/board/:id" exact>
            <Dashboard />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}
