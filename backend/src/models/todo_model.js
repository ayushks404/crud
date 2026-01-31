import mongoose from "mongoose";

const todo_schema = new mongoose.Schema(
    {
        text : {
            type:String,
            required: true,
        },
        completed : {
            type:Boolean,
            default : false
        },
        user : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
    },
    {
        timestamps : true
    }

);


const todo = mongoose.model("Todo", todo_schema);
export default todo;