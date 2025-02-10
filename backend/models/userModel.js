// import mongoose from "mongoose";

// const userSchema= new mongoose.Schema({
//     name:{type:String, required:true},
//     email:{type:String, required:true,unique:true},
//     password:{type:String, required:true},
//     cartData :{type:Object, default:{}}
// },{minimize:false})

// const userModel = mongoose.models.user || mongoose.model('user',userSchema);

// export default userModel

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    otp: { type: String, default: null }, // Field to store OTP
    otpExpires: { type: Date, default: null } // Field to store OTP expiration time
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
