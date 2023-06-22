import ProductSchema from '../model/products.js'
import personSchema from "../model/person.js";

import jwt from 'jsonwebtoken'

export const allTraverse = async (req, res) => {
  try {
    const products = await ProductSchema.find(); // Retrieve all products from the database
    
    // Send the products as the JSON response
    res.status(200).json({allinfo:products});

  } catch (error) {
    console.error(error);
    // Handle any errors that occurred during the database operations
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const cartTraverse = async(req,res)=>{
  const token = req.body.token;
  console.log(req.body);
  const decodedToken = jwt.decode(token);
  const id = decodedToken.id;

  try{
    const person = await personSchema.findById(id);
    const cart = person.cart;
    const productId = await ProductSchema.findById(cart.productId);
    res.status(200).json({allcart:productId});
  }catch(e){console.log(e)};

}


export const creatAProduct =async (req,res)=>{
  const token = req.body.token;
  console.log(req.body);
  const decodedToken = jwt.decode(token);
  const id = decodedToken.id

  const files = req.files;

  // Save the file information to your MongoDB Atlas database using Mongoose
  const images = files.map((file) => {
    const{name,description,price,quantity,category,isAvailable} = req.body;
    let { tag } = req.body;
    if (typeof tag === "string") {
      // Split the comma-separated tags into an array
      tag = tag.split(",").map((tag) => tag.trim());
    }
    return new ProductSchema({
      seller:id,
      name,
      image:{
          filename: file.filename,
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size},
      description,
      price,
      quantity,
      category,
      tag,
      isAvailable
    });
  });
  console.log("image uploaing")
  await ProductSchema.insertMany(images);

  console.log("image uploaded")
  res.json({message:"image uploaded"})

}
export const search = async (req,res)=>{
  const {value} = req.body;
  let byCategory,bytag;
  try{

    byCategory = await ProductSchema.find({category: value});
    bytag = await ProductSchema.find({tag:[value]});
    
    if (byCategory || bytag){
      res.json({byCategory:byCategory,bytag:bytag});
    }
    else{
      return res.status(404).json({ message: 'No products found' });
    }
    
    
  }catch(e){console.log(e)}
}