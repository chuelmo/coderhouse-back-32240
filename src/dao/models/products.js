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
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    require: true,
    unique: true,
  },
  price: {
    type: Number,
    require: true,
  },
  status: {
    type: Boolean,
    require: true,
    default: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
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
