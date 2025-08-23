import React, { useContext, useEffect, useState } from 'react'
import assets from '../../chat-app-assets/assets'
import { AuthContext } from '../../context/AuthContext';
import { Await, useNavigate } from 'react-router-dom';
const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function Profile() {



  const {handleUpdateUserProfile,AuthUser} = useContext(AuthContext);
  const profilePicUrl = AuthUser?.profilePic?.includes('/user.png')
  ? `${backendURL}${AuthUser?.profilePic}`
  : AuthUser?.profilePic || "/user.png"; 


  const [forminfo, setforminfo] = useState({
    file: null,
    name: AuthUser?.fullName || "",
    bio: AuthUser?.bio || "",
  });

  useEffect(() => {
    if (AuthUser) {
      setforminfo({
        file: null,
        name: AuthUser.fullName || "",
        bio: AuthUser.bio || "",
      });
    }
  }, [AuthUser]);


  useEffect(()=>{
    console.log(forminfo)
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setforminfo((prev) => ({
        ...prev, [name]: files[0]   // store actual file object in state
      }));
    } else {
      setforminfo((prev) => ({
        ...prev,[name]: value
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", forminfo.name);
    formData.append("bio", forminfo.bio);

    if (forminfo.file) {
      formData.append("profilePic", forminfo.file);
    }
    console.log('this is formdata',forminfo);

    await handleUpdateUserProfile( AuthUser._id,formData);
  }
  
    



  return ( 
      <div className='min-h-screen bg-cover bg-no-repeate flex items-center justify-center'>
         <div className=' w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600  flex items-center justify-between max-sm:flex-col-reverse rounded-lg '>

          <form className='flex flex-col gap-3 p-10 flex-1' onSubmit={handleSubmit}>

            <h1>Profile Details</h1>
            <label htmlFor='file' className='flex items-center gap-3 max-sm:text-sm'>
              <input id='file' type='file' name='file'  onChange={handleChange} hidden/>
              <img src={forminfo.file ? URL.createObjectURL(forminfo.file)  : profilePicUrl } className={`w-12 -12 ${profilePicUrl && 'rounded-full'}`}/>
               upload profile image
            </label>

            <input type='text' placeholder='name' className=' border border-gray-500 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' onChange={handleChange} value={forminfo.name} name='name'/>

            <textarea placeholder='write profile bio' rows={4} onChange={handleChange} name='bio' value={forminfo.bio} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'></textarea>
            <button type='submit' className='bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer'>Save</button>
          </form>

          <img src={assets.logo_icon} className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 max-sm:w-30 ${forminfo.file && 'rounded-full'}`} alt='' /> 
         </div> 
      </div>
  )
}
