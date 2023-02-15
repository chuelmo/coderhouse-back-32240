
import express from 'express';
import userRouter from './routes/users.router.js';
import mongoose from 'mongoose';
import handlebars from "express-handlebars";
import { userModel } from './models/user.model.js';

const app = express();

app.engine(
  ".hbs",
  handlebars.engine({ extname: ".hbs", defaultLayout: "index.hbs" })
);
app.set("views", "./src/views");
app.set("view engine", ".hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(8080, () => console.log("Server arriba"));
const strMongoConnection = 'mongodb+srv://CoderUser:A123456*@pruebacoder.rpvqwdz.mongodb.net/?retryWrites=true&w=majority';
mongoose.set('strictQuery', false);
mongoose.connect(strMongoConnection, (error) => {
    if (error) {
        console.log("No hubo conexion " + error);
        process.exit();
    }
})

app.use('/api/users', userRouter);

app.get ('/', async (req, res) => {
    try {
        let users = await userModel.find();
        console.log(users);
        let usuarios = users.map(u => u.toObject());
        res.render("listarUsers", { users: usuarios });
    } catch(error) {
        console.log("No pude traer usuarios " + error)
        res.render("listarUsers", { users: [] });
    }
})

