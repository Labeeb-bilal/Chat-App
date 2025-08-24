import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {Socket, io} from 'socket.io-client'
import { ChatContext } from "./ChatContext";

export const AuthContext = createContext();



export const AuthProvider = ({children}) => {

   const Backend_URL = import.meta.env.VITE_BACKEND_URL;
   axios.defaults.baseURL = Backend_URL;

   const [AuthUser,setAuthUser] = useState();
   const [token,setToken] = useState(localStorage.getItem('token'))
   const [socket,setsocket] = useState();
   const [onlineUsers,setOnlineUsers] = useState([]);

   const navigate = useNavigate()
;
   useEffect(() => {
      if (token) {
         axios.defaults.headers.common["token"] = token;
        }
        handleCheckAuth();
   },[]);
      

    const handleCheckAuth = async () => {
       try {
         const res = await axios.get(`/user/checkAuth`);
         if (res.data.success) {
            setAuthUser(res.data.user)
            handleConnectScoket(res.data.user)

            // navigate('/'); //navigate to home page
         } 
        } catch (error) {
            if (error.response?.data?.message === 'No token provided') {
               toast.error('Login Again')
            } else{
                toast.error(error?.response?.data?.message || error.message);
            }
            navigate('/login')
        }
    }

    const handleConnectScoket = (userData) => {
      if (!userData || Socket?.connected) return;
        const newSocket = io(Backend_URL, { query : {userId : userData._id}});
        newSocket.connect();
        setsocket(newSocket); 

        //get users
        newSocket.on('getOnlineUsers', (userId) => {
           setOnlineUsers(userId);
           console.log(userId)
        }) 
    }    

    const handleAuthentication = async (state, credentials) => {

        try {
            const res = await axios.post(`/user/${state}`,credentials);
            if (res.data.success) {
                if (state === 'login') {
                    axios.defaults.headers.common['token'] = res.data.token;
                    handleConnectScoket(res.data.user);
                    setToken(res.data.token)
                    setAuthUser(res.data.user);
                    localStorage.setItem('token',res.data.token);
                    navigate('/'); //navigate to home page
                }
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || error.message);
        }
    }

    const handleLogout = () => {   
      localStorage.removeItem('token');
      setToken(null);
      setAuthUser(null);
      setOnlineUsers([]);
      axios.defaults.headers.common['token'] = null;
      toast.success('Logout Successfully');
      socket.disconnect();
      navigate('/login')
    } 

    const handleUpdateUserProfile = async (id,data) => {
       try {
         const res = await axios.put(`/user/update/${id}`,data)
         if (res.data.success) {
             toast.success('Profile Updated Successfully');
             setAuthUser(res.data.user);
         }
       } catch (error) {
        toast.error(error.response.data.message || error.message);
       }
    }
    const value = {
        handleCheckAuth,
        handleConnectScoket,
        handleAuthentication,
        handleLogout,
        handleUpdateUserProfile,
        socket,
        onlineUsers,
        AuthUser,
        axios,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}