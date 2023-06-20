import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  seller:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Person',
    required:true
  },
  name:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  quantity:{
    type:Number,
    required:true
  },
  category:{
    type:Number,
    required:true
  },
  isAvailable:{
    type:Boolean,
    default:true
  },
  createdAt:{
    type:Date,
    default:Date.now()
  }
})

export default mongoose.model('ProductSchema ',ProductSchema )
