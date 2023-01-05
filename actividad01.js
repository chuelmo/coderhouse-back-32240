import express from "express";
const app = express();
const server = app.listen(8080, () =>
  console.log("Server escuchando en el 8080")
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let frase = "Frase inicial";

app.get("/api/frase", (req, res) => {
  res.send({ frase: frase });
});

app.get("/api/palabras:pos", (res, req) => {
  let palabras = frase.split(" ");
  let pos = req.params.pos;
  let response = typeof pos;
  res.send({ res: response });
});

app.post("/api/user", (req, res) => {
  let user = req.body;
  if (!user.first_name || !user.last_name) {
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete values" });
  }
  users.push(user);
  res.send({ status: "success", message: "User created" });
});
