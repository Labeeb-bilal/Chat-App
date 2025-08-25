import { Children, createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({children}) => {
  const [messages, setMessages] = useState([]);
  const [AllUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unSeenMessages, setunSeenMessages] = useState({});
  const [loading,setloading] = useState(false);


  const {socket,axios} = useContext(AuthContext);

  useEffect(() => {
   SubscribeToMessages();
   return () => unSubscribeToMessages();
  },[socket,selectedUser])

  const handleGetAllUsersForSidebar = async () => {
      try {
        setloading(true);
        if (axios.defaults.headers.common['token']) {
          //
        }
        const res = await axios.get('/messages/users');
        if (res.data.success) {
            setAllUsers(res.data.AllUsers);
            setunSeenMessages(res.data.unseenMessages); 
        }

     } catch (error) {
        toast.error(error.message);
        setloading(false);
     }
     finally{
      setloading(false)
     }
  }

  const getMessagesOfUser = async (userId) => {
   try {
    setloading(true);
    const res = await axios.get(`/messages/${userId}`);
    if (res.data.success) {
        setMessages(res.data.AllMessages);
    }
   } catch (error) {
    toast.error(error.message);
    setloading(false);
   } finally{
     setloading(false);
   }
  }

  const sendMessgae = async (userId,data) => {
    try {
        const res = await axios.post(`/messages/send/${userId}`,data);
        if (res.data.success) {
         setMessages((prev) => [...prev, res.data.message]);
        } else{
          toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
  }
   
  const SubscribeToMessages = () => { // connected from backend io.emit('newMessage',newMessage) send to this function
    if (!socket) return;
    
    //listnes newMessage here (eventlistener)
    socket.on("newMessage",  (newMessage) => {
     if (selectedUser && newMessage.senderId === selectedUser._id) { //checking message sender id (i.e not always me the sender can be other as well)
      //and my selected user id (opened chat) is same, so it  only selects the messages which is sended by others not you obv. you cant'
      //select your own user (your won chat)
  
        newMessage.seen = true; 
        setMessages((prev) => [...prev, newMessage]);
        axios.put(`/messages/mark/${newMessage.senderId}`) //mark message as seen
     } else{
        setunSeenMessages((prevUnseenMessage) => ({ // storing who has sent message by {senderId : 2} if senderid is there then increment 1 if not then be it 1 (first unseen message)
            ...prevUnseenMessage, [newMessage.senderId] : prevUnseenMessage[newMessage.senderId]? 
            prevUnseenMessage[newMessage.senderId] + 1 : 1
        }))  
     }
    })
  }

  const unSubscribeToMessages = () => {
   if (socket) socket.off('newMessage');
  }
    const value = {
        socket,
        axios,
        selectedUser,
        messages,
        AllUsers,
        unSeenMessages, 
        loading,
        setSelectedUser,
        setMessages,
        setunSeenMessages,
        handleGetAllUsersForSidebar,
        getMessagesOfUser,
        sendMessgae,
        SubscribeToMessages,
        unSubscribeToMessages, 
    }

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}

