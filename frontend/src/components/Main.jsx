import React, { useState } from "react";
import AddJob from "./AddJob";
import { useJobStore } from "../stores/jobStore";
import { ChevronDown, X } from "lucide-react";
import { Link } from "react-router";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

function Main(props) {
  const [catogHide, setCatogHide] = useState({
    saved: false,
    applied: false,
    interview: false,
    offer: false,
    rejected: false,
  });
  const jobinfo = useJobStore((state) => state.jobinfo);
  const movejob = useJobStore((state) => state.moveJob);
  const deleteJob = useJobStore((state) => state.deleteJob);
  // useJobStore(())

  const groupJobByStatus = () => {
    if (!jobinfo) {
      return;
    }
    let groupJob = {
      saved: [],
      applied: [],
      interview: [],
      offer: [],
      rejected: [],
    };
    const filterdjob = jobinfo.reduce((accu, current) => {
      if (current.status === "applied") {
        accu.applied.push(current);
      } else if (current.status === "saved") {
        accu.saved.push(current);
      } else if (current.status === "interview") {
        accu.interview.push(current);
      } else if (current.status === "offer") {
        accu.offer.push(current);
      } else {
        accu.rejected.push(current);
      }
      return accu;
    }, groupJob);
    return filterdjob;
  };
  const onDragEnd = (result) => {
    console.log(result);
    if (!result) return;
    movejob(result);
  };
  const deletJob = (id) => {
    if (!id) return;
    deleteJob(id);
  };

  return (
    <div className="mt-5">
      <AddJob />
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <div>
          {Object.entries(groupJobByStatus()) &&
            Object.entries(groupJobByStatus()).map((catogories, indx) => (
              <Droppable droppableId={catogories[0]} key={catogories[0]}>
                {(provider) => (
                  <div key={indx} className="mb-2">
                    <div className="flex px-3 justify-between border border-spacing-5  py-2 ">
                      <h2 className=" ">{catogories[0]}</h2>
                      <ChevronDown
                        onClick={() =>
                          setCatogHide({
                            ...catogHide,
                            [catogories[0]]: !catogHide[catogories[0]],
                          })
                        }
                      />
                    </div>

                    <div ref={provider.innerRef} {...provider.droppableProps}>
                      {catogories[1] && catogories[1].length == 0 ? (
                        <p
                          className={`${
                            catogHide[catogories[0]] ? "hidden" : "block"
                          }  card font-mono bg-base-300 m-3 self-center flex  max-w-full  card-xs shadow-sm py-2 px-2`}
                        >
                          No jobs here yet
                        </p>
                      ) : (
                        catogories[1].map((job, id) => (
                          <Draggable
                            key={job.id}
                            draggableId={job.id}
                            index={id}
                          >
                            {(provided) => (
                              <div
                                className={`${
                                  catogHide[catogories[0]] ? "hidden" : "block"
                                }  card bg-base-300 m-3  max-w-full  card-xs shadow-sm`}
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                              >
                                <div className="card-body grid grid-cols-6 p-0">
                                  <div className="p-4 pt-2 col-span-5 ">
                                    <h2 className="card-title  ">
                                      {job.position}
                                    </h2>

                                    <div className="flex my-2">
                                      <h3 className="font-medium bg-neutral text-neutral-content p-2  text-sm py-1 mr-2 rounded-md">
                                        {job.platform}
                                      </h3>
                                      <h3 className="font-medium  p-2 text-sm bg-neutral text-neutral-content py-1 rounded-md">
                                        {job.company}
                                      </h3>
                                    </div>

                                    <p className="text-sm mt-1 text-pretty">
                                      {job.note}
                                    </p>
                                  </div>
                                  <div className=" flex flex-col  justify-between">
                                    <div className="flex flex-row justify-end m-1">
                                      <X
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          deletJob(job.id);
                                        }}
                                        className="m-1"
                                      />
                                    </div>

                                    <div className="justify-end card-actions m-2">
                                      <Link to={`/edit/${job.id}`}>
                                        <button className="btn bg-neutral text-neutral-content  min-h-6 h-8 p-2 ">
                                          Edit
                                        </button>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provider.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Main;
