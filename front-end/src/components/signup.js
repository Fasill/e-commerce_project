import './assets/styles/signin.css'
import { useState } from 'react'
import {useForm} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';


import axios from 'axios'

import BackgroundSVG from './assets/images/signup_backround.svg'

import { Navbar } from './navbar'
export const Signup = ()=>{
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('customer');

  const [username,setUsername] = useState("")
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);


  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    type: yup.string().oneOf(['customer', 'seller', 'buyer']).required('Type is required'),
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    // agreedToTerms: yup.boolean().oneOf([true], 'You must agree to the terms and conditions').required('You must agree to the terms and conditionss'),

  })
  const{register, handleSubmit, formState:{errors}} = useForm({
    resolver:yupResolver(schema)
  });





  const onSubmit = (data) => {
    data.agreedToTerms = true
    console.log(data)
    axios
    .post('http://localhost:8080/signup',data)
    .then((res)=>{
      if (data.type ==="customer"){
        
      }

    })   
    setEmail('')
    setPassword('')

  };


  return(
    <div>
            <div className="background-container">
        <img src={BackgroundSVG} alt='background_img' className='background_img' />
      </div> 
      <Navbar/>

      <main>

        <div className='form-card'>
  
          <form onSubmit={handleSubmit(onSubmit)}>
          <ul className='LS'>
          <li><a href="/signin" >Login</a></li>          
        <li><a href="/signin">signup</a></li>   
        </ul>
        <div className='allinputs'>

          {/* full Name */}
          <input 
                className="form-input" 
                type="text" 
                placeholder='Full Name...'
                {...register("name")}
                value = {name}
                onChange={(e) => setName(e.target.value)}

          />
              <p className='error-msg1'>{errors.emai?.message}</p>

            {/*email*/}
          <input 
              className="form-input" 
              type="text" 
              placeholder='Email...'
              {...register("email")}
              value = {email}
              onChange={(e) => setEmail(e.target.value)}

          />
              <p className='error-msg1'>{errors.email?.message}</p>


              <input 
            className="form-input" 
            type="username" 
            placeholder='username...'
            {...register("username")}
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            />
              <p className='error-msg2'>{errors.username?.message}</p>


          <input 
            className="form-input" 
            type="password" 
            placeholder='Password...'
            {...register("password")}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
              <p className='error-msg2'>{errors.password?.message}</p>
          
          {/*type oprtion*/}
            
              <select>
                <option
                value={type}
                {...register('type')}
                  onChange={(e) => setType(e.target.value)}

                >
                  customer</option>
                <option
                value={type}
                {...register('type')}
                onChange={(e) => setType(e.target.value)}

                >
                  admin</option>
                <option
                value={type}
                {...register('type')}
                onChange={(e) => setType(e.target.value)}

                >
                  seller</option>
              </select>
              <p className='error-msg2'>{errors.type?.message}</p>




            <label>
                  <input 
                  className='checkbox'
                  type="checkbox" 
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                {...register('agreedToTerms')}

 />
        I agree to the terms and conditions
            </label>
            <p className='error-msg2'>{errors.agreedToTerms?.message}</p>

            <input className="submit-btn" type="submit" value="LOGIN"/>
            </div>
            
          </form>
        </div>
      </main>
    </div>
  )
}