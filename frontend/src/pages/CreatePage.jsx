import React from "react";
import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";

function CreatePage(props) {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8 pt-6 pb-2">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-2">
            <ArrowLeftIcon className="size-5" />
            Back to job
          </Link>
          <form action="">
            <div className="card base-100">
              <div className="card-body pt-3">
                <h2 className="card-title text-2xl mb-2">Create New job</h2>
                <form action="submit">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Position</span>
                    </label>
                    <input type="text" className="input input-bordered h-9" />
                  </div>
                  <div className="form-control mb-2">
                    <label className="label">
                      <span className="label-text">Company</span>
                    </label>
                    <input type="text" className="input input-bordered h-9" />
                  </div>
                  <div className="form-control mb-2">
                    <label className="label">
                      <span className="label-text">Platform</span>
                    </label>
                    <input type="text" className="input input-bordered h-9" />
                  </div>
                  <div className="form-control mb-2">
                    <label className="label">
                      <span className="label-text">Status</span>
                    </label>
                    <input type="text" className="input input-bordered h-9" />
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Note</span>
                    </label>
                    <textarea
                      name=""
                      id=""
                      className="textarea textarea-bordered h-30"
                    />
                  </div>
                  <div className="card-actions justify-center">
                    <button className="btn btn-primary ">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
{
}
