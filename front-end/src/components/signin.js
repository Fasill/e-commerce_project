import './assets/styles/signin.css'
import { useState } from 'react'
import {useForm} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';


import axios from 'axios'

import BackgroundSVG from './assets/images/signup_backround.svg'

import { Navbar } from './navbar'
export const Signin = ()=>{
  const [password,setPassword] = useState("")
  const [email, setEmail] = useState('');


  const schema = yup.object().shape({

    email: yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),

  })
  const{register, handleSubmit, formState:{errors}} = useForm({
    resolver:yupResolver(schema)
  });





  const onSubmit = (data) => {

    axios
    .post('http://localhost:8080/signin',data)
    .then((res)=>{
      console.log(res.data)
      console.log("logged in")
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
        <li><a href="/signup">signup</a></li>   
        </ul>
        <div className='allinputs'>
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
            type="password" 
            placeholder='Password...'
            {...register("password")}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
              <p className='error-msg2'>{errors.password?.message}</p>

            <input className="submit-btn" type="submit" value="LOGIN"/>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}