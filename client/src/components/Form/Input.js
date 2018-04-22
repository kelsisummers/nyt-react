import React from "react";

export const Input = props => (
  <div className="form-group" style={{ width: "250px"}}>
    <input className="form-control" {...props} />
  </div>
);
