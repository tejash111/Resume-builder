require("dotenv").config();
const express = require("express")
const cors = require("cors")
const path = require("path");
const connectDB = require("./config/db");
const resume = require("./models/resume");

const authRoutes= require("./routes/authRoutes")

const app = express();

//middleware to handle cors
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type", "Authorization"],
    })
)

//connect database
connectDB();

//middleware
app.use(express.json());
//app.use("/api/resume",resumeRoutes)

//routes
app.use("/api/auth",authRoutes)
//app.use("/api/resume",)

//serve upload folder
app.use(
    "/uploads",
    express.static(path.join(__dirname,"uploads"),{
        setHeaders: (res,path) => {
            res.set("Acess-Control-Allow-Origin", "http://localhost:5173");
        },
    })
);

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`server is running on port ${PORT}`));
