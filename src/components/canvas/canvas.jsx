import React, { useEffect } from "react";
import "./canvas.scss";
import Draggable from "react-draggable";
import { useParams } from "react-router-dom";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import { fireGames } from "../../firebase/app";

const maximumNumberOfRounds = 6;

const DragElement = ({ onStop, position, children }) => {
  const nodeRef = React.useRef(null);
  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".handle"
      position={position}
      scale={1}
      onStop={onStop}
    >
      <g ref={nodeRef} className="handle">
        {children}
      </g>
    </Draggable>
  );
};

const initialXPosition = (i) => {
  return i * 10 + 5;
};

const initialYPosition = 10;

const Canvas = () => {
  const { id } = useParams();

  const [game, gameLoading, gameError] = useDocument(fireGames.doc(id));
  const roundsRef = game?.ref.collection("rounds");
  const [rounds, roundsLoading, roundsError] = useCollection(
    roundsRef?.orderBy("num", "desc")
  );

  const currentRound = rounds?.docs?.[0];

  useEffect(() => {
    if (roundsRef && rounds?.empty) {
      roundsRef.add({
        num: 1,
        x: initialXPosition(0),
        y: initialYPosition,
      });
    }
  }, [roundsRef, rounds]);

  const handleStop = (_event, position) => {
    const { x, y } = position;
    currentRound.ref.update({ x, y });
  };

  const nextRound = () => {
    if (currentRound?.get("num") >= maximumNumberOfRounds) {
      game.ref.update({
        finished: true,
      });
      return;
    }
    roundsRef.add({
      num: currentRound.get("num") + 1,
      x: initialXPosition(currentRound.get("num")),
      y: initialYPosition,
    });
  };

  if (!game) {
    return "Loading game";
  }
  const remainingRounds = Array(
    maximumNumberOfRounds - (currentRound?.get("num") ?? 0)
  ).fill(1);
  console.log(remainingRounds);
  return (
    <>
      {/* {JSON.stringify(game.data())}<br/> */}
      <svg viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg">
        {remainingRounds.map((_, i) => (
          <rect
            width="5"
            height="50"
            x={initialXPosition(i + currentRound?.get("num"))}
            y={initialYPosition}
          />
        ))}
        {rounds?.docs.reverse().map((snap) =>
          snap.id === currentRound.id && !game.get("finished") ? (
            <DragElement
              position={{ x: snap.get("x") ?? 0, y: snap.get("y") ?? 0 }}
              onStop={handleStop}
            >
              <rect width="5" height="50" x={0} y={0} className="active-rect" />
            </DragElement>
          ) : (
            <rect width="5" height="50" x={snap.get("x")} y={snap.get("y")} />
          )
        )}
      </svg>
      {!game.get("finished") && <button onClick={nextRound}>Weiter</button>}
    </>
  );
};

export default Canvas;
