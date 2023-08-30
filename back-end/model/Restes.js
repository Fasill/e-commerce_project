import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const response = new Schema({
  response :{
    type:String
  }
})
export default mongoose.model('responce', response);
