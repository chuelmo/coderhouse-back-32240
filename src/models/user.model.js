import mongoose from 'mongoose';

const userColletion = 'usuarios';
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    }
})

export const userModel = mongoose.model(userColletion, userSchema);