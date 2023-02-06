import mongoose from "mongoose";

const messagesCollection = "messages";

const messagesSchema = new mongoose.Schema({
  user: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  color: {
    type: String,
    default: "black",
  },
});

const messagesModel = mongoose.model(messagesCollection, messagesSchema);
export default messagesModel;
