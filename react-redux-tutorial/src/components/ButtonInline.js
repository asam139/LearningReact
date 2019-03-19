import Button from "./Story";
import React from "react";

const ButtonInline = ({
                        type = 'button',
                        onClick,
                        children
                      }) =>
  <Button
    type={type}
    className="button-inline"
    onClick={onClick}
  >
    {children}
  </Button>;

export default ButtonInline;