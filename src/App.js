import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./firebase/auth";
import PrivateRoute from "./PrivateRoute";
import AppBar from "./components/AppBar";
import Home from "./views/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Console from "./views/Console";

import Workplace from "./components/WorkplaceDetail";

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
