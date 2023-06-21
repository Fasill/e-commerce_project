import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "personSchema",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image:{
    filename:{
      type: String,
      required:true,},
    originalname:{
      type: String,
      required:true,},
    mimetype: {
      type: String,
      required:true,},
    size: {
      type: Number,
      required:true,},
    
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tag:[
    {
      type: String,
    }
  ],
  isAvailable: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },

});

export default mongoose.model("Product", ProductSchema);
