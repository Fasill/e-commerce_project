import personSchema from "../model/person.js";
import jwt, { verify } from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import ProductSchema from '../model/products.js'

//generating token
const maxAge = 3*24*60*60;
const createToken = (id)=>{
  return jwt.sign({ id },'fasil',{
    expiresIn:maxAge,})
}

export const signup = async (req, res) => {
  const { name, email, type, username, password, agreedToTerms } = req.body;
  let user;
  try {
    console.log("Signup request received:", req.body);

  const t = ["customer","admin","seller"]
  
  for (const userType of t) {
    if (type === userType) {
      console.log("Checking if user already exists...");
      user = await personSchema.findOne({ email });

      if (!user) {
        console.log("Creating a new customer...");
        const hashedPassword = await bcrypt.hash(password, 10);

        const customer = new personSchema({
          name,
          email,
          type,
          username,
          password:hashedPassword,
          agreedToTerms,
        });

        await customer.save();
        console.log("Customer created:", customer);
        const token = createToken(customer._id);

        res.json({ type: type, id: customer._id, token: token });
        return; // Exit the function after sending the response
      } else {
        console.log("User already exists.");
        res.json({ message: "User already exists" });
        return; // Exit the function after sending the response
      }
    }
  }

  console.log("Invalid user type:", type);
  res.json({ message: "Invalid user type" });
    
  } catch (e) {
    console.log("Error:", e);
    res.json({ message: "Error occurred" });
  }
};

export const additionalForms = async (req, res) => {
  
  const token = req.body.token;

  const decodedToken = jwt.decode(token);
  const id = decodedToken.id
  try{
    const user  = await personSchema.findById(id);

    if (user){
      if (user.type === 'customer'){
        const{enumBanks,accountNumber} = req.body;
        user.paymentInformation = {
        enumBanks : enumBanks,
        accountNumber : accountNumber
      }
      await user.save();
      res.json({message:"customer accountNumber information submitted"})
    
    }else if(user.type === 'seller'){

      const{enumBanks,accountNumber,company,businessAddress} = req.body;

      user.paymentInformation = {
      enumBanks : enumBanks,
      accountNumber : accountNumber
      }
    
      user.company = company;

      user.businessAddress = {
        street:businessAddress.street,
        city:businessAddress.city,
        state:businessAddress.state,
        postalCode:businessAddress.postalCode,
        country:businessAddress.country
      }
      await user.save();
      res.json({message:"seller registered"})
    
    }else if(user.type == "admin"){
        const{paymentInformation,referralSource,  perferences,communicationPreferences} = req.body;
      
        user.paymentInformation = {
        enumBanks : paymentInformation.enumBanks,
        accountNumber : paymentInformation.accountNumber
      }
      user.referralSource = referralSource;
      user.perferences = perferences;
      user.communicationPreferences = communicationPreferences
      await user.save();

      res.json({message:"admin registered"})

    }
    }
  // Function implementation for customer form (if any)
  }catch(e){console.log(e)}
};

export const signin =async(req,res)=>{
  console.log("gootit")
  const {email,password} = req.body;
  let user;
  try{
    user = await personSchema.findOne({email})
    if (!user){
      res.json({message:"user notfound"})
    }
    console.log(user.password)
    const isPasswordCorrect = bcrypt.compareSync(password,user.password);
    if (!isPasswordCorrect){
      return res.json({message:"Incorrect password"})
    }
    const token = createToken(user._id);
    res.json({message:"loggedIn", token:token,type:user.type})
  }catch(e){console.log(e)}
}
export const verifyToken = (req,res)=>{
  req.message("all good")
}


export const Profile = async(req,res)=>{
  const {token} = req.body
  const decodedToken = jwt.decode(token);
  const id = decodedToken.id

  let user;
  try{
    user = await personSchema.findById(id)
    
    if (user.type === 'customer'){
      res.json({name:user.name,type:user.type ,email:user.email})

    }
    else if(user.type === 'seller'){

      res.json({name:user.name,type:user.type ,email:user.email})

    }
  
  }catch(e){
    console.log(e)
  }
}