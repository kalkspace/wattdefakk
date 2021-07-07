import React, { useContext, useCallback } from "react";

import { UserContext } from "../../contexts/user";
import { firestore } from "../../firebase/app";
import { useHistory } from "react-router-dom";

const Landing = ({ ...rest }) => {
  const userContext = useContext(UserContext);
  const history = useHistory();

  const newGameCallback = useCallback(async () => {
    const game = await firestore.collection("games").add({
      owner: userContext.user.uid,
    });
    await game.collection("players").doc(userContext.user.uid).set({});
    history.push(`/join/${game.id}`);
  }, [userContext, history]);

  return (
    <div {...rest}>
      <h2>Welcome to the landing page, {userContext.userInfo.get("name")}!</h2>
      <button onClick={newGameCallback}>New Game</button>
    </div>
  );
};

export default Landing;
