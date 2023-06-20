import personSchema from "../model/person.js";
import jwt from 'jsonwebtoken'

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
        const customer = new personSchema({
          name,
          email,
          type,
          username,
          password,
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
        const{paymentInformation} = req.body;
        user.paymentInformation = {
        enum : paymentInformation.enum,
        accountNumber : paymentInformation.accountNumber
      }
      await user.save();
      res.json({message:"customer accountNumber information submitted"})
    
    }else if(user.type === 'seller'){

      const{paymentInformation,company,businessAddress} = req.body;

      user.paymentInformation = {
      enum : paymentInformation.enum,
      accountNumber : paymentInformation.accountNumber
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
        enum : paymentInformation.enum,
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

const seller = async (req, res) => {
  // Function implementation for seller (if any)
};
