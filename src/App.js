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
import { firebaseAuth, fireUsers } from './firebase/app';
import Canvas from "./components/canvas/canvas";
import Landing from "./components/landing/landing";
import Join from "./components/join/join";
import { useDocument } from 'react-firebase-hooks/firestore';

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
  const [userInfo, userInfoLoading, userInfoError] = useDocument(user && fireUsers.doc(user.uid));

  useEffect(() => {
    (async () => {
      if (userSetupDone || !user || !userInfo) return;

      if (!userInfo.get('name')) {
        console.log('Setting random name');
        console.log(userInfo);
        const randomName = generateRandomName();
        await userInfo.ref.set({ name: randomName }, { merge: true });
      }

      setUserSetupDone(true);
    })();
  }, [user, userInfo, userSetupDone]);

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Wattdefakk</h1>
        </header>
        {
          user && userInfo && userSetupDone &&
          <UserProvider value={{ user, userInfo }}>
            <Switch>
              <Route path="/game/:id">
                <Canvas />
              </Route>
              <Route path="/join/:id">
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
          userInfoLoading &&
          <div>Setting up user...</div>
        }
        {
          authError &&
          <div>Connecting to firebase auth failed :(</div>
        }
        {
          userInfoError &&
          <div>Connecting to user db failed :(</div>
        }
      </div>
    </Router>
  );
}

export default App;
