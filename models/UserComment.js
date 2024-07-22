import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
});

export default mongoose.model('usercomment', commentSchema)