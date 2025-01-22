import mongoose from "mongoose";

const addressSchema=new mongoose.Schema({
    userId:{type:String},
    addresses:{type:Array}
})
 
export default mongoose.model.Addresses || mongoose.model("Address",addressSchema);