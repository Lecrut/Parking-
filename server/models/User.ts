import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    surname: {type: String, required: true, trim: true},
})

const UserModel = mongoose.model('user', userSchema)

export default UserModel