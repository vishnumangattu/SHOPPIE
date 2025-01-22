import mongoose from 'mongoose';

const loginSchema=new mongoose.Schema({
    email:{type:String},
    username:{type:String},
    password:{type:String},
    role:{type:String}
})

export default mongoose.model.LoginDetails || mongoose.model("LoginDetail",loginSchema);