import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import "./App.css";

import { firebaseApp } from './firebase/app';
import { useAnonymousAuth } from './firebase/hooks';
import Canvas from "./components/canvas/canvas";

function App() {

  const authState = useAnonymousAuth();

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Wattdefakk</h1>
        </header>
        {
          authState.state === "success" ?
            <Switch>
              <Route path="/game/:uuid">
                <Canvas />
              </Route>
              <Route path="/create">
                <div>
                  Create Game
            </div>
              </Route>
              <Route path="/">
                <div>
                  Landing Page
            </div>
              </Route>
            </Switch>
            :
            <div>Logging you in!</div>
        }
      </div>
    </Router>
  );
}

export default App;
