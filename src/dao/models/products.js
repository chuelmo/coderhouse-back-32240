import mongoose from "mongoose";
import autoIncrementModelID from "./counterModel.js";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    min: 1,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnails: {
    type: Array,
    default: [],
  },
});

productsSchema.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID("productos", this, next);
});

const productsModel = mongoose.model(productsCollection, productsSchema);
export default productsModel;
