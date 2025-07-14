import React from "react";
import DarkModeToggle from "./DarkModeToggle";

function NavBar(props) {
  return (
    <div className="flex justify-between bg-base-300 pt-4 px-3 py-2">
      <h1 className="text-primary tracking-tighter text-3xl font-mono">
        HuntBoard
      </h1>
      <div>
        <DarkModeToggle />
      </div>
    </div>
  );
}

export default NavBar;
