import React from "react";
import DarkModeToggle from "./DarkModeToggle";

function NavBar(props) {
  return (
    <div className="flex justify-between pt-2">
      <h1 className="text-primary tracking-tighter text-2xl font-mono">
        HuntBoard
      </h1>
      <div>
        <DarkModeToggle />
      </div>
    </div>
  );
}

export default NavBar;
