import React from "react";
import "./canvas.scss";
import Draggable from "react-draggable";
import { useParams } from "react-router-dom";
import { useDocument } from "react-firebase-hooks/firestore";
import { fireGames } from "../../firebase/app";

const DragElement = ({ onStop, position, children }) => {
  const nodeRef = React.useRef(null);
  return (
    <Draggable nodeRef={nodeRef} handle=".handle" position={position} scale={1} onStop={onStop}>
      <g ref={nodeRef} className="handle">{children}</g>
    </Draggable>
  );
};

const Canvas = () => {
  const { id } = useParams();

  const [game, gameLoading, gameError] = useDocument(fireGames.doc(id));

  const moveCallback = React.useCallback(
    ({ x, y }) => {
      game.ref.update({ x, y });
    },
    [game],
  );

  const handleStop = (_event, position) => {
    const { x, y } = position;
    moveCallback({ x, y });
  };

  if (!game) {
    return "Loading game";
  }

  return (
    <>
      {/* {JSON.stringify(game.data())}<br/> */}
      <svg viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg">
        <DragElement
          position={{ x: game.get("x") ?? 0, y: game.get("y") ?? 0 }}
          onStop={handleStop}
        >
          <rect width="5" height="50" x={30} y={400} />
        </DragElement>

        {/* <DragElement>
          <rect width="2" height="10" x="35" y="200" />
        </DragElement>
        <DragElement>
          <rect width="2" height="10" x="40" y="200" />
        </DragElement>
        <DragElement>
          <rect width="2" height="10" x="45" y="200" />
        </DragElement>
        <DragElement>
          <rect width="2" height="10" x="50" y="200" />
        </DragElement> */}

        {/* <DragElement>
          <rect width="2" height="20" x="55" y="200" />
        </DragElement>
        <DragElement>
          <rect width="2" height="20" x="60" y="200" />
        </DragElement>
        <DragElement>
          <rect width="2" height="20" x="65" y="200" />
        </DragElement>
        <DragElement>
          <circle cx="75" cy="205" r="6" />
        </DragElement>
        <DragElement>
          <circle cx="90" cy="205" r="6" />
        </DragElement> */}
      </svg>
    </>
  );
};

export default Canvas;
