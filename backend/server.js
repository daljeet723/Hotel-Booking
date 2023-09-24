import {app} from "./app.js";
import dotenv from "dotenv";
import {connectDatabase} from "./config/database.js";

//connect to congif files to get Environment variables
dotenv.config({path: "./backend/config/config.env"});

//calling connect databse function ..use after config..otherwise will not get process.env value
connectDatabase();


app.listen(process.env.PORT,()=> {
    console.log("Server is running at port " + process.env.PORT);
})