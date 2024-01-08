import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatarurl: {
        type: String
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: {
        type: Number,
        required: true
    }
},
{timestamps: true}
)

export default mongoose.models.User || mongoose.model("User", userSchema);