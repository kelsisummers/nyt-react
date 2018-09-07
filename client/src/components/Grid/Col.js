import React from "react";

export const Col = ({ size, children, id }) => (
  <div id={id} className={size.split(" ").map(size => "col-" + size).join(" ")}>
    {children}
  </div>
);
