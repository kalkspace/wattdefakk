import React from "react";
import { useParams } from "react-router-dom";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { firestore } from "../../firebase/app";

const Join = ({ ...rest }) => {
  const { id } = useParams();
  const [game, gameLoading, gameError] = useDocumentData(
    firestore.doc(`games/${id}`)
  );

  return (
    <div {...rest}>
      <h2>
        Joining game {id} by {game && game.owner}
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
