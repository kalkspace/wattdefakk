import React, { useContext, useCallback } from "react";
import { UserContext } from "../../contexts/user";

const Landing = ({ ...rest }) => {
  const user = useContext(UserContext);

  const newGameCallback = useCallback(() => {}, []);

  return (
    <div {...rest}>
      <h2>Welcome to the landing page, {user.displayName}!</h2>
      <button onClick={newGameCallback}>New Game</button>
    </div>
  );
};

export default Landing;
