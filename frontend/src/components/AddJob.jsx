import React from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router";

function AddJob(props) {
  const handleClick = () => {};
  return (
    <div>
      <Link to={"/create"}>
        {" "}
        <button
          className="btn bg-neutral text-neutral-content fixed  bottom-5 left-0 right-0  flex justify-center items-center mx-auto w-16 h-16 rounded-full z-10"
          onClick={() => handleClick}
        >
          <Plus size={40} />
        </button>
      </Link>
    </div>
  );
}

export default AddJob;
