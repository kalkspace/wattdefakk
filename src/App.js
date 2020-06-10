import * as firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import "./App.css";

import './firebase/app';
import Canvas from "./components/canvas/canvas";

function App() {
  useEffect(() => {
    firebase.auth().signInAnonymously();
  });

  const [user, authLoading, authError] = useAuthState(firebase.auth());

  useEffect(() => {
    if (user && !user.displayName) {
      user.updateProfile({ 'displayName': 'Gamer' })
    }
  }, [user]);

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Wattdefakk</h1>
        </header>
        {
          user &&
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
                Welcome to the landing page, {user.displayName}!
            </div>
            </Route>
          </Switch>
        }
        {
          authLoading &&
          <div>Logging you in...</div>
        }
        {
          authError &&
          <div>Connecting to firebase auth failed :(</div>
        }
      </div>
    </Router>
  );
}

export default App;
