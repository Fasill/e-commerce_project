import ProductSchema from '../model/products.js'
import personSchema from "../model/person.js";
import axios from 'axios'
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

// cart prosess

export const cartTraverse = async (req, res) => {
  console.log("reading the token")
  const token = req.body.token;
  console.log(token)
  
  const decodedToken = jwt.decode(token);
  const id = decodedToken.id;
  try {
    const activeUser = await personSchema.findById(id)
    const person = await personSchema.findById(id).populate('cart.productId');
    const cartProducts = person.cart.map((cartItem) => cartItem.productId);

    res.status(200).json({ cart: cartProducts,bankInfo:activeUser.paymentInformation });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred while fetching the cart.' });
  }
};


export const addToCart = async (req, res) => {
  const token = req.body.token;
  console.log("decodding token")
  const decodedToken = jwt.decode(token);
  console.log("token decoded")
  const id = decodedToken.id;
  console.log(id);

  const { productId, quantity } = req.body;

  try {
    const person = await personSchema.findById(id);
    const cartItem = { productId, quantity }; // Create the cart item object

    person.cart.push(cartItem); // Add the cart item to the person's cart array
    await person.save(); // Save the updated person document

    res.status(200).json({ message: 'Item added to cart successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred while adding item to cart.' });
  }
};


export const removeFromCart = async(req,res)=>{
  //pass the id in the router
  const {productId,token} = req.params; 

  console.log(req.params);
  // const token = req.body.token;
  console.log("decodding token")
  const decodedToken = jwt.decode(token);
  console.log("token decoded")
  const id = decodedToken.id;
  console.log(id);
  
    try {
      const user = await personSchema.findById(id);
  
      const cartIndex = user.cart.findIndex(item => item.productId.toString() === productId);
  
      if (cartIndex === -1) {
        console.log('Cart item not found.')

        return res.status(200).json({ message: 'Cart item not found.' });
      }
  
      user.cart.splice(cartIndex, 1);
  
      await user.save();
  
      res.status(200).json({ message: 'Cart item deleted successfully.' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'An error occurred while deleting the cart item.' });
    }
  };
  


  

export const updateCart = async(req,res)=>{


}
export const payment = async(req,res)=>{
  const {amount,token} = req.body; 

  console.log(token);
  // const token = req.body.token;
  console.log("decodding token")
  const decodedToken = jwt.decode(token);
  console.log("token decoded")
  const id = decodedToken.id;
  console.log(id);
  
  try{
    const user = await personSchema.findById(id)
    const name = user.name
    console.log(name)
    const first_name = name.split(" ")

    const infos = {
      amount : amount,
      currency: "ETB",
      email:user.email,
      first_name: first_name[0],
      last_name: first_name[0],
      phone_number: "0940798785",
      tx_ref: "chewatatest-6669",
      callback_url: "http://localhost:8080/products/webhook",
      return_url: "http://localhost:3000/",
      title: "Payment for my favourite merchant",
      description: "I love online payments."

    }
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    axios.post('https://api.chapa.co/v1/transaction/initialize',infos,{headers})
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });

  }catch(e){
    console.log(e)
  }

}
export const webhook = (req,res) =>{
  console.log(res.body)
}

