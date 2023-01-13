import express from "express";
import { default as usersRouter } from "./routes/users.js";
import { default as petsRouter } from "./routes/pets.js";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);

app.use(express.static("./public"));

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});