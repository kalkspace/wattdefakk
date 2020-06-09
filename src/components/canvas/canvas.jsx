import React from "react";
import "./canvas.scss";
import Draggable from "react-draggable";

const DragElement = ({ children }) => {
  return (
    <Draggable
      // axis="x"
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      //   grid={[25, 25]}
      scale={1}
      // onStart={this.handleStart}
      // onDrag={this.handleDrag}
      // onStop={this.handleStop}
    >
      <g className="handle">{children}</g>
    </Draggable>
  );
};

const Canvas = () => {
  return (
    <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
      <DragElement>
        <rect width="2" height="10" x="30" y="200" />
      </DragElement>
      <DragElement>
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
      </DragElement>

      <DragElement>
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
      </DragElement>
    </svg>
  );
};

export default Canvas;
