import mongoose from "mongoose";

const soldproductSchema=new mongoose.Schema({
    buyerId:{type:String},
    sellerId:{type:String},
    address:{type:String},
    product:{type:Object},
    status: {
        type: String,
        enum: ['approved', 'rejected', 'pending'],
        default: 'pending',
      },
      size:{type:String}
}) 

export default mongoose.model.Soldproducts || mongoose.model("Soldproduct",soldproductSchema);