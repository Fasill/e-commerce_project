import { Chapa } from 'chapa-nodejs';
import ProductSchema from '../model/products.js'
import personSchema from "../model/person.js";
import jwt from 'jsonwebtoken'
const chapa = new Chapa({ secretKey: 'CHASECK_TEST-ToQwoI5kwZPCuNowm7E1sBLZvLBzoCR5' });

export const payHandler = async (req ,res) => {
  const { amount, token, phoneNumber } = req.body;
  const decodedToken = jwt.decode(token);
  const id = decodedToken.id;

  try {
    const person = await personSchema.findById(id);
    
    console.log(person.name); 

    
    const name = person.name.split(' ')
    const first_name = name[0];
    console.log(first_name)
    const last_name = name[1];
    console.log(last_name)

    const email = person.email;
    console.log(email)

    const tx_ref = await chapa.generateTransactionReference();

    const response = await chapa.initialize({
      first_name: first_name,
      last_name: last_name,
      currency: 'ETB',
      amount: amount,
      tx_ref: tx_ref,
      callback_url: 'https://example.com/',
      return_url: 'https://example.com/',
      // customization: {
      //   title: 'Test Title',
      //   description: 'Test Description',
      // },
    },{ autoTx_ref: true },);

    res.status(200).json({ PaymentURL: response.data.checkout_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const veridypayment  = async(req,res)=>{

  try{
    const response = await chapa.verify({
      tx_ref: 'TX-JHBUVLM7HYMSWDA',
    });
    res.status(200).json({ PaymentURL: response.data.checkout_url });
  }catch(error){
    res.status(500).json({ error: error.message });

    console.log( "Error", error.message)
  }

}