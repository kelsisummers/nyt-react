import React from "react";

export const FormBtn = props => (
  <button {...props} className="btn" id="search-button">
    {props.children}
  </button>
);
