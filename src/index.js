import express from "express";
import session from "express-session";

const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => console.log("Server up"));

app.use(
  session({
    secret: "secretClase",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/session", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`ha iniciado sesión ${req.session.counter} veces`);
  } else {
    req.session.counter = 1;
    res.send("Welcome!!!");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.send("Logout exitoso");
    } else {
      res.send({ status: "error", error: err });
    }
  });
});

app.get("/login", (req, res) => {
  const { username, password } = req.body;
  if (username !== "admin" || password !== "admin") {
    return res.send("Login failed");
  } else {
    req.session.user = username;
    req.session.admin = true;
    res.send("Login exitoso");
  }
});
