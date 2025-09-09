import mongoose, { Types } from "mongoose";

const jobSchema = mongoose.Schema(
  {
    position: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: [saved, applied, interview, offer, rejected],
      default: "saved",
    },
    followup: {
      type: Date,
      validate: {
        validator: (value) => value > new Date(),
        message: "followup date must be in future",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
