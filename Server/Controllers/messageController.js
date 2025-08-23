const MessageModel = require("../models/MessageSchema");
const UserModel = require("../models/UserSchema");
const cloudinary = require('../lib/cloudinary')
const { getIO, userSocketMap } = require("../Socket");
const fs = require('fs');






    const getUsersForSideBar = async (req,res) => {
      // console.log('getUsersForSideBar')

        try {
            const MyId = req.user._id; //my id
            const AllUsers = await UserModel.find({ _id : {$ne : MyId} }).select('-password');

            const unseenMessages = {};
            const promises = AllUsers.map( async (user) => { // user = sender id
            const messages = await MessageModel.find({ senderId : user._id, recieverId : MyId, seen : false });

            if (messages.length>0) {
                unseenMessages[user._id] = messages.length;
            }

            })

            await Promise.all(promises);

            return res.json({ success : true, AllUsers, unseenMessages });
        } catch (error) {
            console.log(error.messages);
            return res.json({success : false , message : error.message});
        }
    }

    const getAllMessagesOfUser = async (req,res) => {
      console.log('getAllMessagesOfUser')

        try {
            const myId = req.user._id;
            const {id : seletedUserId } = req.params;

            const AllMessages = await MessageModel.find({ $or : [
                    {senderId : myId, recieverId : seletedUserId},
                    {senderId : seletedUserId, recieverId : myId},
            ]});

            await MessageModel.updateMany({senderId : seletedUserId ,  recieverId : myId}, 
                {seen : true}
            );

            return res.json({ success : true, AllMessages });
        } catch (error) {
            console.log(error.messages);
            return res.json({success : false , message : error.message});
        }
    }

    const markMessageAsTrue = async (req,res) => {
      console.log('markMessageAsTrue')

     try {
        const {id} = req.params;
        await MessageModel.findByIdAndUpdate(id, {seen : true});

        return res.json({ success : true })
     } catch (error) {
        console.log(error.message);
        res.json({success : false , message : 'internal Error'})
     }

    }

    const createMessage = async (req, res) => {

        try {
          const { text } = req.body;
          const { id } = req.params; //reciever id
          const senderId = req.user._id; //my id (token decode)
      
          let imgUrl = null;
      
          if (req.file) {
            try {

              const uploadResponse = await cloudinary.uploader.upload(req.file.path,{
                resource_type: 'auto',
              });
              imgUrl = uploadResponse.secure_url;
              console.log(req.file.path)
              fs.unlinkSync(`${req.file.path}`); //removing from localdisk;

                var newMessage = await MessageModel.create({
                senderId,
                recieverId : id, // using your existing spelling
                // text,
                image: imgUrl,
              });
            } catch (cloudError) {
              console.error('Cloudinary upload failed:', cloudError.message);
              return res.status(500).json({ success: false, message: 'Image upload failed' });
            }
          } else {
              newMessage = await MessageModel.create({
              senderId,
              recieverId : id, // using your existing spelling
              text,
            });
          }
      
          const receiverSocketId = userSocketMap[id];
          getIO().to(receiverSocketId).emit('newMessage', newMessage); //first storing and then sending to particular receiverSocketId user

          return res.status(201).json({ success: true, message: newMessage });
        } catch (error) {
          console.error('Error creating message:', error.message);
          return res.status(500).json({ success: false, message: 'Failed to send message' });
        }
      };
      


module.exports = {
    getUsersForSideBar,
    getAllMessagesOfUser,
    markMessageAsTrue,
    createMessage,
}