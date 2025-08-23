import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext, AuthProvider } from '../../context/AuthContext';
import Login from '../../components/Login';
import { ChatProvider } from '../../context/ChatContext';

export default function Layout() {
  //do this when you have AuthProvider in super Parent (App or main) cause usenavigate will only work with router as parent and nesterd below is navigate
  // const { AuthUser } = useContext(AuthContext);
  // const location = useLocation();

  //     const protectedPaths = ['/', '//','/Profile'];
  //     if (protectedPaths.includes(location.pathname) && AuthUser === undefined) {
  //       return window.location.href = '/login'
  //     }

  return (
    <div className="bg-[url('./src/chat-app-assets/bgImage.svg')] bg-cover bg-center h-screen w-full bg-white">
      <AuthProvider>
       <ChatProvider>
        <Outlet />
       </ChatProvider>
      </AuthProvider>
    </div>
  );
}
