import React from "react";
import { useParams } from "react-router-dom";

const Join = ({ ...rest }) => {
  const { uuid } = useParams();
  return (
    <div {...rest}>
      <h2>Joining game {uuid}</h2>
    </div>
  );
};

export default Join;
