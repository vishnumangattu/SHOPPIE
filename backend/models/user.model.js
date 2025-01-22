import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    userId:{type:String},
    email:{type:String},
    fname:{type:String},
    lname:{type:String},
    gender:{type:String},
    phone:{type:Number}
})

export default mongoose.model.Users || mongoose.model("User",userSchema);