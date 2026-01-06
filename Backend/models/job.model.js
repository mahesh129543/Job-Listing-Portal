import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },
    requirments:{
      type: String,
      required: true
    },
    salary: {
      type: Number,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship", "Contract"],
      required: true
    },
    position: {
      type: String,
      required: true
    },
    company: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company",
        required:true
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      }
    ],
    
 },
  {
    timestamps: true
  }
);

export const job= mongoose.model("Job", jobSchema);
