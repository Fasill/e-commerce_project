import './assets/styles/signin.css'
import { useState } from 'react'
import {useForm} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';



import axios from 'axios'

import BackgroundSVG from './assets/images/signup_backround.svg'

import { Navbar } from './navbar'
export const CreateProduct = ()=>{
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const [category,setCategory] = useState("")
  const [tag, setTag] = useState("");


// =================================
const schema = yup.object().shape({
  name: yup.string().required('Product name is required'),
  description: yup
    .string()
    .required('Description is required')
    .test(
      'maxWords',
      'Description should not exceed 30 words',
      (value) => value.split(' ').length <= 30
    ),
  price: yup.number().required('Price is required'),
  quantity: yup.number().required('Quantity is required'),
  category: yup.string().required('Category is required'),
  tag: yup.string(),
  
});
// ===================================
const{register, handleSubmit, formState:{errors}} = useForm({
  resolver:yupResolver(schema)
});


const onSubmit = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    
    // Append form data fields to the FormData object
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('quantity', data.quantity);
    formData.append('category', data.category);
    formData.append('tag', data.tag);
    formData.append('images', imageFile); // Append image file

    // Append the token
    formData.append('token', token);

    const response = await axios.post('https://book-test-itcl.onrender.com/products/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Set appropriate content type for file upload
      }
    });

    // Clear form inputs and imageFile state after successful upload
    setImageFile(null);
    setName('');
    setDescription('');
    setQuantity(0);
    setPrice(0);
    setCategory('');
    setTag('');
  } catch (error) {
    console.error(error);
  }
};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  return(
    <div>

      <main>

        <div className='form-card'>
  
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Create Product</h1>
        <div className='allinputs'>

          {/* full Name */}
          <input 
                className="form-input" 
                type="text" 
                placeholder='Product Name...'
                {...register("name")}
                value = {name}
                onChange={(e) => setName(e.target.value)}

          />
              <p className='error-msg1'>{errors.name?.message}</p>

            {/*email*/}
          <input 
              className="form-input" 
              type="text" 
              placeholder='Description...'
              {...register("description")}
              value = {description}
              onChange={(e) => setDescription(e.target.value)}

          />
              <p className='error-msg1'>{errors.description?.message}</p>


              <input 
            className="form-input" 
            type="number" 
            placeholder='price...'
            {...register("price")}
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            />
              <p className='error-msg2'>{errors.price?.message}</p>


          <input 
            className="form-input" 
            type="number" 
            placeholder='Quantity...'
            {...register("quantity")}
            value={quantity}
            onChange={(e)=>setQuantity(e.target.value)}
            />
              <p className='error-msg2'>{errors.quantity?.message}</p>
             
              <input 
            className="form-input" 
            type="text" 
            placeholder='category...'
            {...register("category")}
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            />
              <p className='error-msg2'>{errors.category?.message}</p>
          
              <input 
            className="form-input" 
            type="text" 
            placeholder='tag...'
            {...register("tag")}
            value={tag}
            onChange={(e)=>setTag(e.target.value)}
            />
              <p className='error-msg2'>{errors.tag?.message}</p>
          
         
              <input
                className="form-input"
                type="file"
                accept="image/*"
                {...register("image")}
                onChange={handleImageChange}
              />
              <p className='error-msg2'>{errors.image?.message}</p>
         

            <input className="submit-btn" type="submit" value="UPLOAD"/>
            </div>
            
          </form>
        </div>
      </main>
    </div>
  )
}