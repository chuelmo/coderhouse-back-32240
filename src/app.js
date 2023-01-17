import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import usersRouter from "./routes/users.js";
import viewsRouter from "./routes/views.js";

const app = express();

app.engine(
  ".hbs",
  handlebars.engine({ extname: ".hbs", defaultLayout: "index.hbs" })
);
app.set("views", "./src/views");
app.set("view engine", ".hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/handlebar", viewsRouter);
app.use("/api/users", usersRouter);
app.use(express.static("./public"));

const httpServer = app.listen(8080, () => console.log("Server arriba"));
const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("message", (data) => {
    console.log(data);
  });
});
