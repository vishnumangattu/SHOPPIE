import mongoose from "mongoose";

const wishlistSchema=new mongoose.Schema({
    buyerId:{type:String},
    productId:{type:String}
}) 

export default mongoose.model.Wishlists || mongoose.model("Wishlist",wishlistSchema);