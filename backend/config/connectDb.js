const mongoose= require("mongoose");
const connectDb = async()=>{
 try {
     await  mongoose.connect(process.env.MONGODB_URL);
     console.log(`MongoDB is connected at ${mongoose.connection.host}`);
 } catch (error) {
     console.log(`MongoDB Error ${error}`);
 }
}
module.exports= connectDb;