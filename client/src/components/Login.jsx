import React, { useContext, useEffect, useState } from 'react'
import assets from '../chat-app-assets/assets'
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login({setshowSignup}) {
    const {handleAuthentication} = useContext(AuthContext)

    const [Userinfo,setUserinfo] = useState({
        email : '',
        password : '',
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
      try {
        handleAuthentication('login', Userinfo);
      } catch (error) {
        toast.error(error.message);
      }
      
     }

  return (
        <form onSubmit={handleSubmit} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-5 rounded-lg shadow-lg'>
           <h2 className='font-medium text-2xl flex justify-between items-center '>Login
            <img src={assets.arrow_icon} alt='arrow icon' className='w-5 cursor-pointer'/>
           </h2>
           
           <input type='email' placeholder='email' required name='email' onChange={handleChange} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'  />

           <input type='password' placeholder='password' required name='password' onChange={handleChange} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>

           <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-poineter'>
            Login
           </button>

          <div className='flex gap-2 items-center text-sm text-gray-500'>
           <input type='checkbox' id='check'/>
           <label htmlFor='check' className='cursor-pointer'>Agree to the terms of use & privacy policy</label>
          </div>

          <div className='flex flex-col gap-2'>
           <p className='text-sm text-gray-500'>Don't have an account<span className='font-medium text-violet-500 cursor-pointer' onClick={(()=> setshowSignup(true))} >&nbsp;Signup here</span></p>
          </div>
        </form>
  )
}
