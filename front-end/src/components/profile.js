import style from './assets/styles/profile.module.css'
import axios from 'axios';
import { Navbar } from './navbar';
import { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import ProfileImg from './assets/images/profileModel.svg'
import penSvg from './assets/images/pen.svg'
import { Link, animateScroll as scroll } from 'react-scroll';

export const Profile = () => {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [type,setType] = useState("")


  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      console.log(token)
      console.log("rendering");
      if (!token) {
        navigate('/signup');
      } else {
        try {
          const response1 = axios.post('http://localhost:8080/verify', { token });
          const response2 = axios.post('http://localhost:8080/profile', { token});
          const [result1, result2] = await Promise.all([response1, response2]);
          console.log(result1.data); // Response from the first endpoint
          console.log(result2.data); // Response from the second endpoint

          setName(result2.data.name)
          setEmail(result2.data.email)
          setType(result2.data.type)

        } catch (error) {
          // Handle errors
          console.error(error);
          navigate('/signup');
        }
      }
    };
  
    fetchData();
  }, [navigate]);


  return (
    <div>
      <div className='background'></div>
      <Navbar className='navbar' />
      <main className={style.mainProfile}>
        <div className={style.top}>
          <div>
            <h1>{name}</h1>
            <p>{email} | {type}</p>
            <Link to="section2" smooth={true} duration={500}>
            <img src={penSvg} className={style.pen} href='/' alt='/edit'/>
            </Link>
          </div>
        </div>
        <div className={style.fill} id='section2'>
        <div className={style.left}>
             
        <div className={style.allinputs}>
          <h1 className={style.titile}>PROFILE</h1>
          <li>
            <p>Name</p>
            <input 
              className={`${style.input1} ${style.form_input}`} 
              
              // className={style.form_input} 
              type="text" 
              placeholder='Name..'
              // {...register("email")}
              // value = {email}
              // onChange={(e) => setEmail(e.target.value)}

              />
              {/* <p className='error-msg1'>{errors.email?.message}</p> */}
          </li>
          <li>  
          <p>Email</p>

            <input 
            
            className={`${style.input2} ${style.form_input}`}
            type="email" 
            placeholder='Email...'
            // {...register("password")}
            // value={password}
            // onChange={(e)=>setPassword(e.target.value)}
            />
            </li>
            <li>
            <p>Password</p>

            <input 
            className={`${style.input3} ${style.form_input}`}
            type="Password" 
            placeholder='Password...'
            // {...register("password")}
            // value={password}
            // onChange={(e)=>setPassword(e.target.value)}
            />
            </li>

            <input className={`submit-btn ${style.btn1}`} type="submit" value="SAVE PROFILE"/>
            <button className={`submit-btn ${style.btn2}`} 
            onClick={()=>{
              localStorage.removeItem('token');
              navigate('/signin')
            }
            } >LOGOUT</button>
           
            </div>
         
        </div>
        <div className={style.right}>
             
          <img src={ProfileImg} alt='profile'/>
            
        </div>
        </div>
      </main>
      <div>
        {/* Additional content */}
      </div>
    </div>
  );
};
