import dotenv from "dotenv";

import { default as MessageManagerMongo } from "./mongo/MessageManager-mongo.js";

dotenv.config();

const DB_TYPE = process.env.DB_TYPE;

let MessageManager;
switch (DB_TYPE) {
  case "DUMMY":
    MessageManager = MessageManagerMongo;
    break;
  case "FS":
    MessageManager = MessageManagerMongo;
    break;
  case "MONGO":
    MessageManager = MessageManagerMongo;
    break;
  default:
    MessageManager = MessageManagerMongo;
    break;
}

export default MessageManager;
