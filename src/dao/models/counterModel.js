import mongoose from "mongoose";

const counterCollection = "counter";

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

counterSchema.index({ _id: 1, seq: 1 }, { unique: true });

const counterModel = mongoose.model(counterCollection, counterSchema);

const autoIncrementModelID = function (modelName, doc, next) {
  counterModel.findByIdAndUpdate(
    modelName,
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
    function (error, counter) {
      if (error) return next(error);
      doc.id = counter.seq;
      next();
    }
  );
};

export default autoIncrementModelID;
