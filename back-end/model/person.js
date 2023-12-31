import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const personSchema = new Schema({
  // all
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: ['customer', 'admin', 'seller'],
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    dateOfBirth:  Date,
    phoneNumber: Number,
    
   },
   username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  paymentInformation: {
    enumBanks: ['Bank Of Abyssinia ', 'CBE', 'telebirr'],
    accountNumber:Number,

  },
  agreedToTerms: {
    type: Boolean,
    required: true,
  },
  
  //seller
  company: {
    type: String,
  },
  businessAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  
  
  //admin
  referralSource:{
    type:String,
  },
  perferences:{
    type:String,
  },
  communicationPreferences:{
    type:String
  },

  cart: [
    {
      productId: {
        type: Schema.Types.ObjectId, // Assuming you are using MongoDB's ObjectId for product references
        ref: 'ProductSchema',
      },
      quantity: {
        type: Number,
        default: 1,
      },
      // Additional cart item properties as needed
    }
  ],
});

export default mongoose.model('PersonSchema', personSchema);
