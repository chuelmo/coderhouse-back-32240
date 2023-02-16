import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { default as viewsRouter } from "./routes/views.js";
import { default as messagesRouter } from "./routes/messages.js";
import { default as productsRouter } from "./routes/products.js";
import MessageManager from "./dao/dbManagers/MessageManager.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const CLUSTER = process.env.CLUSTER;
const DB_NAME = process.env.DATABASE_NAME;
const DB_OPTIONS = process.env.DATABASE_OPTIONS;
const strMongoConnection = `mongodb+srv://${USER}:${PASSWORD}@${CLUSTER}${DB_NAME}${DB_OPTIONS}`;
mongoose.set("strictQuery", false);
mongoose.connect(strMongoConnection, () => {
  console.log("Connected to MongoDB");
});

const app = express();

app.engine(
  ".hbs",
  handlebars.engine({ extname: ".hbs", defaultLayout: "index.hbs" })
);
app.set("views", "./src/views");
app.set("view engine", ".hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use("/", viewsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/products", productsRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado!");

  socket.on("new-message", async () => {
    const mm = new MessageManager();
    let mensajes = [];
    try {
      mensajes = await mm.getMessages();
    } catch (e) {
      mensajes = [];
    }
    socketServer.sockets.emit("all_mensajes", mensajes);
  });
});
