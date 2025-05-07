const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL,{});
        console.log("mongodb conncected");
    }catch (err) {
        console.error("error connecting to mongodb",err);
        process.exit(1);
    }
};

module.exports= connectDB