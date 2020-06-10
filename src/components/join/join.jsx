import * as firebase from "firebase";
import React, { useCallback, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  useDocument,
  useDocumentData,
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";

import { fireUsers, fireGames } from "../../firebase/app";
import { UserContext } from "../../contexts/user";

const Join = ({ ...rest }) => {
  const userContext = useContext(UserContext);
  const { id } = useParams();

  const [game, gameLoading, gameError] = useDocument(fireGames.doc(id));
  const [owner, ownerLoading, ownerError] = useDocumentData(
    game && fireUsers.doc(game.get("owner"))
  );
  const [players, playersLoading, playersError] = useCollection(
    game && game.ref.collection("players")
  );

  const playerIds = useMemo(
    () => players && players.docs.map((player) => player.ref.id),
    [players]
  );

  const [playerInfos, playerInfosLoading, playerInfosError] = useCollectionData(
    playerIds &&
      playerIds.length &&
      fireUsers.where(
        firebase.firestore.FieldPath.documentId(),
        "in",
        playerIds
      )
  );

  const joinCallback = useCallback(() => {
    game.ref.collection("players").doc(userContext.user.uid).set({});
  }, [game, userContext]);
  const leaveCallback = useCallback(() => {
    game.ref.collection("players").doc(userContext.user.uid).delete();
  }, [game, userContext]);

  return (
    <div {...rest}>
      <h2>
        Joining game {id} by {owner ? owner.name : "..."}
      </h2>
      Players:
      <ul>{playerInfos && playerInfos.map((info) => <li>{info.name}</li>)}</ul>
      <input
        type="text"
        value={window.origin + `/join/${id}`}
        readOnly={true}
      />
      <button onClick={joinCallback}>Join game</button>
      <button onClick={leaveCallback}>Leave game</button>
    </div>
  );
};

export default Join;
