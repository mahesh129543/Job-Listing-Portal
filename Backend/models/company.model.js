import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    description: {
      type: String,
      required: true
    },

    website: {
      type: String,
      trim: true
    },

    location: {
      type: String,
      required: true
    },

    

    logo: {
      type: String // Cloudinary URL or image path
    },

   

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

   
  },
  {
    timestamps: true
  }
);
export const Company = mongoose.model("Company", companySchema);
