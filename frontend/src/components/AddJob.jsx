import React from "react";

function AddJob(props) {
  const handleClick = () => {};
  return (
    <div>
      <button
        className="btn btn-secondary w-full text-xl"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Add Job
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box h-fit">
          <div className="card bg-base-100 ">
            <h2 className="card-title mb-3">Add New Job</h2>
            <div className="card-body ">
              <form onSubmit={handleClick}>
                <label>Title</label>
                <input type="text" />
              </form>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default AddJob;
