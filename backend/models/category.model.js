import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
    categories:{type:Array}
})

export default mongoose.model.Categories || mongoose.model("Category",categorySchema); 