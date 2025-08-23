import React, { useContext, useState, useRef, useEffect } from 'react';
import assets from '../chat-app-assets/assets';
import { formatMessageTime } from '../lib/utils';
import { ChatContext } from '../context/ChatContext';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

export default function ChatComponent() {
  const scrollEnd = useRef();
  const {
    selectedUser,
    setselectedUser,
    sendMessgae,
    getMessagesOfUser,
    messages,
    loading,
  } = useContext(ChatContext);
  const { onlineUsers, AuthUser } = useContext(AuthContext);
  console.log('AuthUser',AuthUser)
  const [input, setinput] = useState('');
  const [uploadFile, setuploadFile] = useState(null);

  // Scroll to latest message
  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Fetch messages when selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      getMessagesOfUser(selectedUser._id);
    }
  }, [selectedUser]);

  const handleSendMessage = async () => {
    if (uploadFile) {
      handleSentImage();
      setuploadFile(null);
    } else {
      if (input.trim() === '') return;
      await sendMessgae(selectedUser._id, { text: input });
      setinput('');
    }
  };

  const handleSentImage = async () => {
    const formData = new FormData();
    formData.append('image', uploadFile);

    await sendMessgae(selectedUser._id, formData);
  };

  return selectedUser ? (
    <div className="h-full overflow-scroll relative background-blur-lg">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img
          src={`${selectedUser.profilePic.includes('/user.png')? `http://localhost:8000/${selectedUser.profilePic}` : `${selectedUser.profilePic}`}`}
          alt={selectedUser.profilePic}
          className="w-8 rounded-full"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
        </p>
        <img
          src={assets.arrow_icon}
          onClick={() => {
            setselectedUser(null);
          }}
          className="md:hidden max-w-7"
        />
        <img src={assets.help_icon} className="max-md:hidden max-w-5" />
      </div>

      {/* Chat area */}
      <div
        className={`flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6 ${
          !messages.length > 0 && 'flex justify-center items-center'
        }`}
      >
        {loading ? (
          <p className="text-center text-white">Loading</p>
        ) : messages && messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex items-end justify-end gap-1 ${
                msg.senderId !== AuthUser?._id && 'flex-row-reverse' //reverse the row if message is from sender
              }`}
            >
              {msg.image ? (
                <img
                  src={msg.image}
                  className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8"
                />
              ) : (
                <p
                  className={`p-2 max-w-[200px] md:text-sm font-loght rounded-lg mb-8 break-all bg-violet-500/30 text-white ${
                    msg.senderId === AuthUser._id
                      ? 'rounded-br-none'
                      : 'rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </p>
              )}
              <div
                className={`${
                  msg.senderId === AuthUser._id ? 'items-center' : 'items-center'
                } flex flex-col`}
              >
              <img
                src={
                  msg.senderId === AuthUser._id
                    ? AuthUser.profilePic.includes('/user.png')
                      ? `http://localhost:8000/${AuthUser.profilePic}`
                      : AuthUser.profilePic
                    : selectedUser.profilePic.includes('/user.png')
                      ? `http://localhost:8000/${selectedUser.profilePic}`
                      : selectedUser.profilePic
                }
                className="w-7 rounded-full"
              />

                <p className="text-gray-500 text-xs">
                  {formatMessageTime(msg.createdAt)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white">"Say hi 👋"</p>
        )}
        <div ref={scrollEnd}></div>
      </div>

      {/* Bottom area */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
        <div className="flex-1 flex items-center bg-gray-100/12 px-3 gap-3 rounded-full">
          <input
            type="text"
            placeholder="Send a message"
            value={
              input
                ? input
                : uploadFile
                ? uploadFile.name.split('').splice(0, 8).join('') + '...'
                : ''
            }
            onChange={(e) => setinput(e.target.value)}
            onKeyUp={(e) => (e.key === 'Enter' ? handleSendMessage() : null)}
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400"
          />
          {uploadFile && (
            <div
              className="p-2 rounded-full bg-white cursor-pointer h-5 w-5 flex justify-center items-center hover:bg-gray-200"
              onClick={() => setuploadFile('')}
            >
              <span className="text-black font-bold">×</span>
            </div>
          )}
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => {
              setuploadFile(e.target.files[0]);
            }}
          />
          <label htmlFor="image">
            <img src={assets.gallery_icon} className="w-5 mr-2 cursor-pointer" />
          </label>
        </div>
        <img
          src={assets.send_button}
          onClick={() => handleSendMessage()}
          className="cursor-pointer"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src={assets.logo_icon} className="max-w-16" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  );
}
