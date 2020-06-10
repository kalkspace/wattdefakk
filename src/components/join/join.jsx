import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { fireUsers, fireGames } from "../../firebase/app";

const Join = ({ ...rest }) => {
  const { id } = useParams();
  const [game, gameLoading, gameError] = useDocumentData(fireGames.doc(id));
  const [owner, ownerLoading, ownerError] = useDocumentData(
    game ? fireUsers.doc(game.owner) : undefined
  );

  return (
    <div {...rest}>
      <h2>
        Joining game {id} by {owner ? owner.name : "..."}
      </h2>
      <input
        type="text"
        value={window.origin + `/join/${id}`}
        readOnly={true}
      />
    </div>
  );
};

export default Join;
