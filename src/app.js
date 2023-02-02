import express from "express";
import __dirname from './utils.js';
import userRouter from './routes/users.router.js';
import coursesRouter from './routes/courses.router.js';
import viewsRouter from './routes/views.router.js';
import handlebars from 'express-handlebars';
import mongoose from "mongoose";

const app = express();
const PORT = 8080;
const USER = 'chuelmo';
const PASSWORD = 'wq98g8M6LqePqfph';

const conn = mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0.wofkhlp.mongodb.net/?retryWrites=true&w=majority`);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use('/', viewsRouter);
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRouter);
app.use('/api/courses', coursesRouter);

const server = app.listen(PORT, () => console.log('Server up'));