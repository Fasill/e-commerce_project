import ProductSchema from '../model/products.js'
import jwt from 'jsonwebtoken'
export const traverse = (req,res)=>{

}
export const creatAProduct =async (req,res)=>{
  const token = req.body.token;
  console.log(req.body);
  const decodedToken = jwt.decode(token);
  const id = decodedToken.id

  const files = req.files;

  // Save the file information to your MongoDB Atlas database using Mongoose
  const images = files.map((file) => {
    const{name,description,price,quantity,isAvailable} = req.body;

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
      isAvailable
    });
  });
  console.log("image uploaing")
  await ProductSchema.insertMany(images);

  console.log("image uploaing")

}
