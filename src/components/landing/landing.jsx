import React, { useContext, useCallback } from "react";

import { UserContext } from "../../contexts/user";
import { firestore } from "../../firebase/app";
import { useHistory } from "react-router-dom";

const Landing = ({ ...rest }) => {
  const user = useContext(UserContext);
  const history = useHistory();

  const newGameCallback = useCallback(async () => {
    const item = await firestore.collection("games").add({
      owner: user.uid,
    });
    history.push(`/join/${item.id}`);
  }, [history, user.uid]);

  return (
    <div {...rest}>
      <h2>Welcome to the landing page, {user.displayName}!</h2>
      <button onClick={newGameCallback}>New Game</button>
    </div>
  );
};

export default Landing;
