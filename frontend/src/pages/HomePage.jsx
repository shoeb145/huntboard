import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";

function HomePage(props) {
  return (
    <div className="">
      <div className="sticky w-full top-0 z-20 border-b-2 border-white">
        <Header />
      </div>

      <Main />
    </div>
  );
}

export default HomePage;
