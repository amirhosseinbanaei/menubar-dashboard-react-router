import mongoose from "mongoose";

const schema = new mongoose.Schema<any>({
  name: {
    type: String,
    required: true,
  },
  about: {
    fa: { type: String, trim: true, default: "متن پیشفرض" },
    en: { type: String, trim: true, default: "default text" },
    ar: { type: String, trim: true, default: "default text" },
    fr: { type: String, trim: true, default: "default text" },
  },
  headerText: {
    fa: { type: String, trim: true, default: "متن پیشفرض" },
    en: { type: String, trim: true, default: "default text" },
    ar: { type: String, trim: true, default: "default text" },
    fr: { type: String, trim: true, default: "default text" },
  },
  logo: {
    type: String,
    trim: true,
  },
  socials: {
    instagram: {
      type: String,
      trim: true,
    },
    waze: {
      type: String,
      trim: true,
    },
    googlemap: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    neshan: {
      type: String,
      trim: true,
    },
    balad: {
      type: String,
      trim: true,
    },
  },
  workingHours: {
    weekDays: {
      "WeekDays O": {
        type: String,
      },
      "WeekDays C": {
        type: String,
      },
    },
    friday: {
      "Friday O": {
        type: String,
      },
      "Friday C": {
        type: String,
      },
    },
  },
});

const projectModel =
  mongoose.models.projects || mongoose.model("projects", schema);
export default projectModel;