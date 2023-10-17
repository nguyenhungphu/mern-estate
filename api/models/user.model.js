import mongoose from "mongoose";

// Create schema
const userSchema = new mongoose.Schema(
    {
    username: {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
    },
}, 
    { timestamps: true} 
);

const User = mongoose.model('User', userSchema);

// Export
export default User;