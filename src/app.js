
import express from 'express';
import userRouter from './routes/users.router.js';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

const server = app.listen(8080, () => console.log("Server arriba"));
const strMongoConnection = 'mongodb+srv://CoderUser:A123456*@pruebacoder.rpvqwdz.mongodb.net/?retryWrites=true&w=majority';
mongoose.set('strictQuery', false);
mongoose.connect(strMongoConnection, (error) => {
    if (error) {
        console.log("No hubo conexion " + error);
        process.exit();
    }
})

app.use('/api/users',userRouter);