import mongoose from "mongoose";
import categoryModel from "./categoryModel";

const schema = new mongoose.Schema<any>({
  name: {
    fa: { type: String, trim: true },
    en: { type: String, trim: true },
    ar: { type: String, trim: true },
    fr: { type: String, trim: true },
  },
  itemDescription: {
    fa: { type: String, trim: true },
    en: { type: String, trim: true },
    ar: { type: String, trim: true },
    fr: { type: String, trim: true },
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: categoryModel,
 },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
    default: 0,
  },
  isAvailable: {
    type: Boolean,
    required: true,
    default: true,
  },
  isHidden: {
    type: Boolean,
    required: true,
    default: false,
  },
  subCategory: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
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
  order: {
    type: Number,
    required: true,
  },
  //   ratings: [
  //     {
  //       user: {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: User,
  //         required: true,
  //       },
  //       rating: {
  //         type: Number,
  //         min: 1,
  //         max: 5,
  //         required: true,
  //       },
  //     },
  //   ],
  tags: Array,
  extraItems: Array,
});

const itemModel = mongoose.models.items || mongoose.model("items", schema);
export default itemModel;
