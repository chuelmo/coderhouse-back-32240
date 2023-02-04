import dotenv from "dotenv";

import { default as CartManagerFS } from "./fs/CartManager-fs.js";
import { default as CartManagerDummy } from "./dummy/CartManager-dummy.js";

dotenv.config();

const DB_TYPE = process.env.DB_TYPE;

let CartManager;
switch (DB_TYPE) {
  case "DUMMY":
    CartManager = CartManagerDummy;
    break;
  case "FS":
    CartManager = CartManagerFS;
    break;
  default:
    CartManager = CartManagerDummy;
    break;
}

export default CartManager;
