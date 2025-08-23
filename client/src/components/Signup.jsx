import React, { useContext, useEffect, useState } from 'react'
import assets from '../chat-app-assets/assets'
import { AuthContext } from '../context/AuthContext';

export default function Signup({setshowSignup}) {


    const [isDataSubmitted,setIsDataSubmitted]= useState(false);
    const {handleAuthentication} = useContext(AuthContext);
    const [Userinfo,setUserinfo] = useState({
        fullName : '',
        email : '',
        password : '',
        bio : '',
      })
      useEffect(()=>{
        console.log(Userinfo)
      },[Userinfo]);

      const handleChange = (e) => {
        const {value,name} = e.target;

        setUserinfo({...Userinfo, [name]:value});
      }

     const handleSubmit = (e) => {
      e.preventDefault()
      const {fullName,email,password} = Userinfo;

      if (!isDataSubmitted) {
         if (!fullName && !email && !password) {
          alert('please fill the info first');
         }
         setIsDataSubmitted(true);
      } else {
        handleAuthentication('register', Userinfo);
      }
     }


  return (
        <form onSubmit={handleSubmit} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-5 rounded-lg shadow-lg'>
           <h2 className='font-medium text-2xl flex justify-between items-center '>Signup
            {isDataSubmitted && <img src={assets.arrow_icon} alt='arrow icon' onClick={(()=> setIsDataSubmitted(false))} className='w-5 cursor-pointer'/>} 
           </h2>
          {
            !isDataSubmitted && 
            <> 
           <input type='text' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'  placeholder='Full Name' required name='fullName'  onChange={handleChange}/>
           
           <input type='email' placeholder='email' required name='email' onChange={handleChange} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'  />

           <input type='password' placeholder='password' required name='password' onChange={handleChange} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>

           </>
          }


           { 
             isDataSubmitted &&
             <textarea rows="4" placeholder='text' required name='bio' onChange={handleChange} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'></textarea>
           }
           <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-poineter' >
            Create Account
           </button>

          <div className='flex gap-2 items-center text-sm text-gray-500'>
           <input type='checkbox' id='check'/>
           <label htmlFor='check' className='cursor-pointer'>Agree to the terms of use & privacy policy</label>
          </div>

          <div className='flex flex-col gap-2'>
           <p className='text-sm text-gray-500'>Already have an account? <span className='font-medium text-violet-500 cursor-pointer' onClick={(()=> setshowSignup(false))}>&nbsp;Login here</span></p>
          </div>
        </form>
  )
}
