import mongoose from "mongoose";

const schema = new mongoose.Schema<any>({
  name: {
    fa: { type: String, trim: true },
    en: { type: String, trim: true },
    ar: { type: String, trim: true },
    fr: { type: String, trim: true },
  },
  subCategory: {
    type: Array,
  },
  order: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  project: {
    type: String,
    required: true,
  },
});

const categoryModel =
  mongoose.models.categories || mongoose.model("categories", schema);
export default categoryModel;
