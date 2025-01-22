import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    buyerId:{type:String},
    size:{type:String},
    product:{type:Object}
}) 

export default mongoose.model.Orders || mongoose.model("Order",orderSchema);