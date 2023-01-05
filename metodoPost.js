import express from "express";
const app = express();
const server = app.listen(8080, () =>
  console.log("Server escuchando en el 8080")
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = [];

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

app.put("/api/user:name", (req, res) => {
  let user = req.body;
  let name = req.params.name;
  res.send({ name: name });
  //   name = name.slice(1);
  //   users = users.filter((user) => user.first_name);
  //   if (user.first_name === name) {
  //     return res
  //       .status(400)
  //       .send({ status: "error", error: "Información incompleta" });
  //   }
  //   users.push(user);
  //   res.send({ status: "success", message: "Usuario creado" });
});
