import React, { useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { useJobStore } from "../stores/jobStore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function EditPage(props) {
  let { id } = useParams();
  const jobinfo = useJobStore((state) => state.jobinfo);
  const editJob = useJobStore((state) => state.editJob);

  const [platformInput, setPlatformInput] = useState("");
  const job = jobinfo.filter((job) => job.id == id);
  const [formInput, setFormInput] = useState({
    id: job[0].id,
    position: job[0].position,
    company: job[0].company,
    platform: job[0].platform,
    status: job[0].status,
    note: job[0].note,
  });

  const navigate = useNavigate();

  const userSchema = z
    .object({
      position: z.string().nonempty("position can not be blank"),
      company: z.string().nonempty("company name should not be blank"),
      platform: z.string().nonempty("hello"),

      platformInput: z.string().optional("hello"),
    })
    .superRefine((data, ctx) => {
      if (data.platform === "other" && !platformInput) {
        ctx.addIssue({
          code: "custom",
          message: "other platform is required when platform is other",
          path: ["platformInput"],
        });
      }
    });
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userSchema) });

  const handleInput = (input) => {
    if (!input) return;

    setFormInput({ ...formInput, [input.name]: input.value });
  };
  const onsubmit = async () => {
    const isvalid = await trigger(
      "position",
      "company",
      "platformInput",
      "platform"
    );
    if (!isvalid) {
      return;
    }
    const updatedFormInput = formInput;
    if (updatedFormInput.platform == "other" && platformInput.trim()) {
      updatedFormInput.platform = platformInput.trim();
    }

    editJob(updatedFormInput);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8 pt-6 pb-2">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-2">
            <ArrowLeftIcon className="size-5" />
            Back to job
          </Link>

          <div className="card base-100">
            <div className="card-body pt-3">
              <h2 className="card-title text-2xl mb-2">Edit job</h2>
              <form onSubmit={handleSubmit(onsubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Position</span>
                  </label>
                  <input
                    type="text"
                    name="position"
                    {...register("position")}
                    value={formInput.position}
                    onChange={(e) => handleInput(e.target)}
                    className="input input-bordered h-9"
                  />
                  {errors.position && (
                    <div
                      role="alert"
                      className="alert p-1 mt-1 text-warning bg-transparent alert-warning alert-outline"
                    >
                      <span>Warning: {errors.position.message}</span>
                    </div>
                  )}
                </div>
                <div className="form-control mb-2">
                  <label className="label">
                    <span className="label-text">Company</span>
                  </label>
                  <input
                    type="text"
                    value={formInput.company}
                    {...register("company")}
                    name="company"
                    onChange={(e) => handleInput(e.target)}
                    className="input input-bordered h-9"
                  />
                  {errors.company && (
                    <div
                      role="alert"
                      className="alert p-1 mt-1 text-warning bg-transparent alert-warning alert-outline"
                    >
                      <span>Warning: Invalid email address!</span>
                    </div>
                  )}
                </div>
                <div className="form-control mb-2">
                  <label className="label">
                    <span className="label-text">Platform</span>
                  </label>
                  <select
                    name="platform"
                    className="input input-bordered h-9"
                    value={formInput.platform}
                    {...register("platform")}
                    onChange={(e) => handleInput(e.target)}
                    id=""
                  >
                    <option value="linkedin">LinkedIn</option>
                    <option value="indeed">Indeed</option>
                    <option value="naukri">Naukri</option>
                    <option value="glassdoor">Glassdoor</option>
                    <option value="other">Other</option>
                  </select>
                  {formInput?.platform === "other" && (
                    <input
                      type="text"
                      value={platformInput}
                      {...register("platformInput")}
                      onChange={(e) => setPlatformInput(e.target.value)}
                      className="input mt-2 input-bordered h-9"
                    />
                  )}
                  {errors.platformInput && (
                    <div
                      role="alert"
                      className="alert p-1 mt-1 text-warning bg-transparent alert-warning alert-outline"
                    >
                      <span>Warning: {errors.platformInput.message}</span>
                    </div>
                  )}
                </div>
                <div className="form-control mb-2">
                  <label className="label">
                    <span className="label-text">Status</span>
                  </label>

                  <select
                    name="status"
                    value={formInput.status}
                    onChange={(e) => handleInput(e.target)}
                    className="input input-bordered h-9"
                    id=""
                  >
                    <option value="saved">Saved</option>
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Note</span>
                  </label>
                  <textarea
                    name="note"
                    value={formInput.note}
                    onChange={(e) => handleInput(e.target)}
                    id=""
                    className="textarea textarea-bordered h-30"
                  />
                </div>
                <div className="card-actions justify-center">
                  <button type="submit" className="btn btn-primary ">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPage;
