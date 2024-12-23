import mongoose from "mongoose";

const connectDB = async()=>{
   mongoose.connection.on('connected',()=>{
      console.log("DB ahi");
   })
   await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)
}
export default connectDB