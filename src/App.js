import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';

import "./App.css";

import { UserProvider } from './contexts/user';
import { firebaseAuth } from './firebase/app';
import Canvas from "./components/canvas/canvas";
import Landing from "./components/landing/landing";
import Join from "./components/join/join";

const generateRandomName = () => uniqueNamesGenerator({
  dictionaries: [adjectives, animals], // colors can be omitted here as not used
  length: 2,
  style: 'capital',
  separator: ' ',
});

function App() {
  const [userSetupDone, setUserSetupDone] = useState(false);

  useEffect(() => {
    firebaseAuth.signInAnonymously();
  }, []);

  const [user, authLoading, authError] = useAuthState(firebaseAuth);

  useEffect(() => {
    if (userSetupDone || !user) return;

    if (!user.displayName) {
      console.log('Setting random name');
      const randomName = generateRandomName();
      user.updateProfile({ 'displayName': randomName });

      // TODO: Figure out why this is needed
      Object.defineProperty(user, 'displayName', {
        value: randomName,
        configurable: true,
        enumerable: true,
      });
    }

    setUserSetupDone(true);
  }, [user, userSetupDone]);

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Wattdefakk</h1>
        </header>
        {
          user && userSetupDone &&
          <UserProvider value={user}>
            <Switch>
              <Route path="/game/:uuid">
                <Canvas />
              </Route>
              <Route path="/join/:uuid">
                <Join />
              </Route>
              <Route path="/">
                <Landing />
              </Route>
            </Switch>
          </UserProvider>
        }
        {
          authLoading &&
          <div>Logging you in...</div>
        }
        {
          !authLoading && !userSetupDone &&
          <div>Setting up user...</div>
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
