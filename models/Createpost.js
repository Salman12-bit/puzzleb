import mongoose from "mongoose";

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    file:
    {
        type: String,
        // path: String

    },
    
    content: {
        type: String,
        required: true
    },

},
)
export default mongoose.model('usersarticle', articleSchema)

