import React, { useContext, useState } from 'react'
import assets from '../chat-app-assets/assets'
import { useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ChatContext } from '../context/ChatContext'


export default function SideBar() {
  const {handleGetAllUsersForSidebar,AllUsers,selectedUser,setSelectedUser,unSeenMessages,setunSeenMessages} = useContext(ChatContext);
  const {handleLogout,onlineUsers,AuthUser} = useContext(AuthContext);
  const [input, setinput] = useState(null);
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    console.log('getOnlineUsers',onlineUsers);
      handleGetAllUsersForSidebar();
  }, []);

let filteredUser;
if (AllUsers) {
  
  filteredUser = input
    ? AllUsers.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : AllUsers;
}
    const profilePicUrl = AuthUser?.profilePic?.includes('/user.png')
    ? `${backendURL}${AuthUser?.profilePic}`
    : AuthUser?.profilePic || "/user.png"; 


  return (
    <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser? ' max-md:hidden':''}`}>
      <div className='flex justify-between items-center '>
        <img src={assets.logo} className='max-w-40 '/>
        <div className='relative group py-2'>
            <img src={assets.menu_icon} className='max-h-5 cursor-pointer'/>
            <div className='absolute w-32 top-full z-20 right-0 p-2 bg-[#282142] rounded-md group-hover:block text-white hidden'>
                <p className='cursor-pointer text-sm  hover:text-gray-500' onClick={() => { navigate('/profile')}}>Edit Profile</p>
                <hr className='my-2 border-t border-gray-500'></hr>
                <p className='cursor-pointer text-sm  hover:text-gray-500' onClick={handleLogout}>Logout</p>
            </div>
        </div>
      </div>

      <div className=' bg-[#282142] rounded-full flex item-center gap-2 py-3 px-4 mt-5'>
        <img src={assets.search_icon} className='w-4'/>
        <input onChange={(e)=> setinput(e.target.value)} type='text' className=' bg-transparent order-none outline-none 
        text-white text-sm placeholder-[#c8c8c8] flex-1 bg-gray-300 ' placeholder='Search user'/>
      </div>

      <div className='flex flex-col mt-5'>
        {
          filteredUser && filteredUser.map((user,index) => (
            <div key={index} className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer
             max-sm:text-sm ${selectedUser?._id === user._id && 'bg-[#282142]/50'}`} onClick={(()=> {
              setSelectedUser(user);
              setunSeenMessages((prev) => ({
                ...prev,
                [user._id] : 0,
              }));
              console.log(user);
             })}>
              <img
                src={
                  user?.profilePic
                    ? user.profilePic.includes('/user.png')
                      ? `${backendURL}${user.profilePic}`
                      : user.profilePic
                    : `${backendURL}/user.png`
                } 
                alt={user?.fullName || "User"} 
                className='w-[35px] aspect-[1/1] rounded-full'
              />
                <div className='flex flex-col leading-5'>
                   <p>{user.fullName}</p>
                   {
                     onlineUsers && onlineUsers.includes(user._id)? 
                    <span className='text-green-400 text-xs'>online</span> : 
                    <span className='text-neutral-400 text-xs'>offline</span>
                   }
                </div>
                {unSeenMessages[user._id]>0 && <p className='absolute top-4 right-4 text-xs h-5 w-5 
                flex justify-center items-center rounded-full bg-violet-500/50'>{unSeenMessages[user._id]}</p>}
            </div>
          ))
        }
      </div>

    </div>
  )
}
