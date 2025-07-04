require("dotenv").config();
const express = require("express")
const cors = require("cors")
const path = require("path");
const connectDB = require("./config/db");
const resume = require("./models/Resume");
const cookieParser = require("cookie-parser");

const authRoutes= require("./routes/authRoutes")
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

//middleware to handle cors
app.use(cors({
  origin: "https://pitchperfect-weld.vercel.app",
  credentials: true
}));


//connect database
connectDB();

//middleware
app.use(express.json());
app.use(cookieParser())

//app.use("/api/resume",resumeRoutes)

//routes
app.use("/api/auth",authRoutes)
app.use("/api/resume",resumeRoutes)

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
