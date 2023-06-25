import './assets/styles/signin.css'
import { useState } from 'react'
import {useForm} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';



import axios from 'axios'

import BackgroundSVG from './assets/images/signup_backround.svg'

import { Navbar } from './navbar'
export const Customer = ()=>{
  const navigate = useNavigate();

  const [enumBanks,setEnumBanks ] = useState('Bank Of Abyssinia');

  const [accountNumber, setAccountNumber] = useState();


  const schema = yup.object().shape({
    accountNumber: yup
    .string()
    .length(16, 'Account number must be 16 digits')
    .matches(/^\d+$/, 'Account number must only contain digits')
    .required('Account number is required'),
    enumBanks: yup
    .string()
    .required('Bank is required'),
  })
  const{register, handleSubmit, formState:{errors}} = useForm({
    resolver:yupResolver(schema)
  });





  const onSubmit = (data) => {
    // data.agreedToTerms = true
    const token = localStorage.getItem('token');
    data.token = token
    console.log(data)
    axios
    .post('http://localhost:8080/signup/payment',data)
    .then((res)=>{
      console.log(res)

    })   

    setEnumBanks('')
    setAccountNumber('')

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
          <li><a href="/signin" >Last piece of the puzzle</a></li>          
        </ul>
        <div className='allinputs'>

          

          
          <input 
            className="form-input" 
            type="Number" 
            placeholder='Account Number'
            {...register("accountNumber")}
            value={accountNumber}
            onChange={(e)=>setAccountNumber(e.target.value)}
            />
              <p className='error-msg2'>{errors.accountNumber?.message}</p>
          
          {/*type oprtion*/}
            
              <select>
                <option
                value={enumBanks}
                {...register('enumBanks')}
                  onChange={(e) => setEnumBanks(e.target.value)}

                >
                  Bank Of Abyssinia</option>
                <option
                value={enumBanks}
                {...register('enumBanks')}
                  onChange={(e) => setEnumBanks(e.target.value)}

                >
                  CBE</option>
                <option
                  value={enumBanks}
                  {...register('enumBanks')}
                    onChange={(e) => setEnumBanks(e.target.value)}

                >
                  telebirr</option>
              </select>
              <p className='error-msg2'>{errors.enumBanks?.message}</p>




            <input className="submit-btn" type="submit" value="Finish"/>
            </div>
            
          </form>
        </div>
      </main>
    </div>
  )
}

export const Seller = ()=>{
  const navigate = useNavigate();

  const [enumBanks,setEnumBanks ] = useState('Bank Of Abyssinia');

  const [accountNumber, setAccountNumber] = useState();
  const [company,setCompany ] = useState();
  const [street,setStreet ] = useState();
  const [city,setCity ] = useState();
  const [state,setState ] = useState();
  const [postalCode,setPostalCode ] = useState();
  const [country,setCountry ] = useState();



  


  const schema = yup.object().shape({
    accountNumber: yup
    .string()
    .length(16, 'Account number must be 16 digits')
    .matches(/^\d+$/, 'Account number must only contain digits')
    .required('Account number is required'),
    enumBanks: yup
    .string()
    .required('Bank is required'),

    company: yup.string().required('Company name is required'),
    street: yup.string().required('Street address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    postalCode: yup.string().required('Postal code is required'),
    country: yup.string().required('Country is required'),
  })
  const{register, handleSubmit, formState:{errors}} = useForm({
    resolver:yupResolver(schema)
  });

  const onSubmit = (data) => {
    const businessAddress = {
      street,
      city,
      state,
      postalCode,
      country
    };
  
    const user = {
      accountNumber,
      company,
      businessAddress
    };
  
    const token = localStorage.getItem('token');
    user.token = token;
  
    console.log(user);
  
    axios
      .post('http://localhost:8080/signup/payment', user)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  
    setEnumBanks('');
    setAccountNumber('');
    setCompany('');
    setStreet('');
    setCity('');
    setState('');
    setPostalCode('');
    setCountry('');
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
          <li><a href="/signin" >Last piece of the puzzle</a></li>          
        </ul>
        <div className='allinputs'>

          
        <input 
            className="form-input" 
            type="text" 
            placeholder='company'
            {...register("company")}
            value={company}
            onChange={(e)=>setCompany(e.target.value)}
            />
              <p className='error-msg2'>{errors.company?.message}</p>
            {/* address             */}
          <input
            className="form-input"
            type="text"
            placeholder="Street"
            {...register("street")}

            value={street}
            onChange={(e)=>setStreet(e.target.value)}

          />
          <p className='error-msg2'>{errors.street?.message}</p>


          <input
            className="form-input"
            type="text"
            placeholder="City"
            {...register("city")}

            value={city}
            onChange={(e)=>setCity(e.target.value)}

          />
          <p className='error-msg2'>{errors.city?.message}</p>

          <input
            className="form-input"
            type="text"
            placeholder="State"
            {...register("state")}
            value={state}
            onChange={(e)=>setState(e.target.value)}

          />
          <p className='error-msg2'>{errors.state?.message}</p>

          <input
            className="form-input"
            type="text"
            placeholder="Postal Code"
            {...register("postalCode")}

            value={postalCode}
            onChange={(e)=>setPostalCode(e.target.value)}

          />
          <p className='error-msg2'>{errors.postalCode?.message}</p>

          <input
            className="form-input"
            type="text"
            placeholder="Country"
            {...register("country")}

            value={country}
            onChange={(e)=>setCountry(e.target.value)}

          />
          <p className='error-msg2'>{errors.country?.message}</p>

            
          
          {/* _-_-_-_-_-_-_-_-_-_-_-_- */}
              <p className='error-msg2'>{errors.company?.message}</p>
          
          <input 
            className="form-input" 
            type="Number" 
            placeholder='Account Number'
            {...register("accountNumber")}
            value={accountNumber}
            onChange={(e)=>setAccountNumber(e.target.value)}
            />
              <p className='error-msg2'>{errors.accountNumber?.message}</p>
          
          {/*type oprtion*/}
            
              <select>
                <option
                value={enumBanks}
                {...register('enumBanks')}
                  onChange={(e) => setEnumBanks(e.target.value)}

                >
                  Bank Of Abyssinia</option>
                <option
                value={enumBanks}
                {...register('enumBanks')}
                  onChange={(e) => setEnumBanks(e.target.value)}

                >
                  CBE</option>
                <option
                  value={enumBanks}
                  {...register('enumBanks')}
                    onChange={(e) => setEnumBanks(e.target.value)}

                >
                  telebirr</option>
              </select>
              <p className='error-msg2'>{errors.enumBanks?.message}</p>




            <input className="submit-btn" type="submit" value="Finish"/>
            </div>
            
          </form>
        </div>
      </main>
    </div>
  )
}

