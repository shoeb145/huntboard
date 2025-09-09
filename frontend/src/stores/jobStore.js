import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Navigate } from "react-router";

export const useJobStore = create(
  persist(
    (set) => ({
      jobinfo: [],
      addJobinfo: (value) =>
        set((state) => ({
          jobinfo: [...state.jobinfo, value],
        })),
      editJob: (updatedJob) =>
        set((state) => {
          state.jobinfo = state.jobinfo.map((job) =>
            job.id == updatedJob.id ? { ...job, ...updatedJob } : job
          );
          return state.jobinfo;
        }),
      deleteJob: (id) =>
        set((state) => {
          const newJob = state.jobinfo.filter((job) => job.id !== id);
          return {
            jobinfo: [...newJob],
          };
        }),
      moveJob: (value) =>
        set((state) => {
          const narr = state.jobinfo.filter(
            (job) => job.id !== value.draggableId
          );
          const newspot = state.jobinfo.filter(
            (job) => job.id == value.draggableId
          );
          newspot[0].status = value?.destination?.droppableId;

          // {  }
          return {
            jobinfo: [
              ...narr.slice(0, value?.destination?.index),
              ...newspot,
              ...narr.slice(value?.destination?.index),
            ],
            //  state.jobinfo.map((job) =>
            //   job.id == value.draggableId
            //     ? { ...job, status: value?.destination?.droppableId }
            //     : job
            // ),
          };
        }),
      resetJobinfo: () => set((state) => ({ jobinfo: [] })),
    }),

    {
      name: "job-Storage",
    }
  )
);
