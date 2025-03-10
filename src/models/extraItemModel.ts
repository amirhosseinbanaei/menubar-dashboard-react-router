import mongoose from "mongoose";

const schema = new mongoose.Schema<any>({
  name: {
    fa: { type: String, trim: true },
    en: { type: String, trim: true },
    ar: { type: String, trim: true },
    fr: { type: String, trim: true },
  },
  price: {
    type: Number,
    required: true,
  },
  project: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
});

const extraItmeModel =
  mongoose.models.extraitmes || mongoose.model("extraitmes", schema);
export default extraItmeModel;
