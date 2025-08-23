import React, { useContext, useState } from 'react'
import SideBar from '../../components/SideBar'
import ChatComponent from '../../components/ChatComponent'
import RightSideBar from '../../components/rightSideBar'
import { ChatContext } from '../../context/ChatContext';

export default function Home() {
  const {selectedUser} = useContext(ChatContext);
  return (
    <div className='sm:px-[15%] sm:py-[5%] h-full w-screen '>
    <div
      className={`backdrop-blur-xl border-2 h-full border-gray-500 rounded-2xl overflow-hidden grid 
                  grid-cols-1  relative 
                  ${selectedUser
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' 
                    : 'grid-cols-1 md:grid-cols-2'
                  }`}
    >
        <SideBar/>
        <ChatComponent/>
        <RightSideBar/>
      </div>
    </div>
  )
}
