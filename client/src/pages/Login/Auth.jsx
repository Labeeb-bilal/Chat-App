import React, { useState } from 'react'
import assets from '../../chat-app-assets/assets'
import Signin from '../../components/Signup';
import Login from '../../components/Login';

export default function Auth() {
  const [showSignup,setshowSignup] = useState(false);

 
  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
         {/* left */}
        <img src={assets.logo} alt='' className='w-[min(30vw,250px)]'/>
      
        {/* rigth */}
        { 
         showSignup? <Signin setshowSignup={setshowSignup}/> : <Login setshowSignup={setshowSignup}/>
        }
    </div>
  )
}
