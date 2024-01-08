import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    authorName: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    media: {
        type: String
    },
    mediaType: {
        type: String
    },
    likes: {
        type: Number,
        required: true
    }
},
{timestamps: true}
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);