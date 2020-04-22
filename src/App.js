import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./auth";
import PrivateRoute from "./PrivateRoute";
import AppBar from "./components/AppBar";
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Profile from "./views/Profile";
import Console from "./views/Console";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppBar />
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />

            <PrivateRoute exact path="/console" component={Console} />
            <PrivateRoute exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
