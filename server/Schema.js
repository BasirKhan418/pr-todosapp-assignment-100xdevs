import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/Todo");
const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: Boolean,
        default: false
    }
})
export default mongoose.model("Todo", TodoSchema);
