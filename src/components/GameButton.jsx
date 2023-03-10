import { forwardRef } from "react";
import React from "react";

const GameButton = forwardRef(({color,border,bg,onClick},ref) => (
    <button className={`${border} ${bg} btn `}
     onClick={onClick}
     ref={ref}  
     color = {color}
     ></button>
));
export default GameButton;

