import mongoose from "mongoose";
import autoIncrementModelID from "./counterModel.js";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    min: 1,
  },
  products: {
    type: Array,
    default: [],
  },
});

cartsSchema.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID("carts", this, next);
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);
export default cartsModel;
