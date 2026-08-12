import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            default: process.env.NAME
        },
        email: {
            type: String,
            default: process.env.EMAIL,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            default:process.env.PASSWORD,
            type: String,
            default: null
        },
        phone_number: {
            type: String,
            default: process.env.PHONE_NUMBER
        },
       
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", UserSchema);