import React from "react";
import Button from "./PaperButtonOverride";

function StandardButton({ children, ...rest }) {
  return (
    <Button {...rest} uppercase={false}>
      {children}
    </Button>
  );
}

export default StandardButton;
