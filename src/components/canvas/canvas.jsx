import React from "react";
import "./canvas.scss";
import Draggable from "react-draggable";

const DragElement = ({ onStop, position, children }) => {
  return (
    <Draggable
      handle=".handle"
      position={position}
      scale={1}
      onStop={onStop}
    >
      <g className="handle">{children}</g>
    </Draggable>
  );
};

const Canvas = () => {
  const [piece, setPiece] = React.useState({ x: 0, y: 0 });

  const handleStop = (_event, position) => {
    const { x, y } = position;
    setPiece({ x, y });
  };

  return (
    <>
      <svg viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg">
        <DragElement position={{ x: piece.x, y: piece.y}} onStop={handleStop}>
          <rect
            width="5"
            height="50"
            x={30}
            y={400}
          />
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
