import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from "dotenv";

import auth_routes from "./src/routes/auth_routes.js";
import todo_routes from "./src/routes/todo_routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

const connectdb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
    
        console.log("mongo connected");
    }
    catch (err){
        console.log("databse err at server.js" , err.message);
    }
}
 
const PORT = process.env.PORT;
app.listen(PORT, () =>{

        console.log("server running on port 5000");
    }

);

connectdb();

app.use("/api/todo", todo_routes);
app.use("/api/auth", auth_routes);

