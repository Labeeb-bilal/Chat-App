const { generateToken } = require("../Service/Auth");
const UserModel = require("../models/UserSchema");
const bcrypt = require('bcrypt');
const cloudinary = require("../lib/cloudinary"); 
const fs = require('fs')

    const handleUserSignup = async (req, res) => {
        try {
            console.log('req.body', req.body);
            const { fullName, email, password, profilePic, bio } = req.body;
    
            if (!fullName || !email || !password || !bio) {
                return res.json({ success: false, message: 'Missing Details' });
            }

            const existingUsername = await UserModel.findOne({ fullName });
            const existingemail = await UserModel.findOne({ email });

            if (existingemail) {
                return res.status(409).json({ success: false, message: 'User already Logged with this email' });
            }
            if (existingUsername) {
                return res.status(409).json({ success: false, message: 'Username already taken' });
            }
    
            const salt = await bcrypt.genSalt(10);
            console.log('Salt:', salt);
            
            const hashedPassword = await bcrypt.hash(password, salt); // ✅ correct order
    
            const user = await UserModel.create({
                fullName,
                email,
                password: hashedPassword,
                // profilePic,
                bio,
            });
    
            console.log('created', user);
            return res.json({ success: true, message: 'User created successfully' });
        } catch (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
    };
    

    const handleUserSignin = async (req,res) => {
     try {
        const {email,password} = req.body;

        const user = await UserModel.findOne({email});
  
        if (!user) {
          return res.status(400).json({success : false , message : 'user not found with this email'});
        }
        const isMatch =  await bcrypt.compare(password, user.password) //plain text then pass
        
        if (!isMatch) return res.status(401).json({ success : false,  message: 'Invalid credentials' });
  
        const token = generateToken(user._id);
        
        return res.json({success : true , token : token, message : 'login successful', user});

     } catch (error) {
        console.log(error);
        res.json({ success : false , message : error.message})
     }
    }

    const handleCheckAuth = (req,res,next) => {
        return res.json({ success : true , user : req.user});
    }
    
    

    const handleUpdateProfile = async (req, res) => {
      try {
        const { fullName, bio } = req.body;
        const profilePic = req.file?.path;
        console.log('profilePic,fullName,bio',profilePic,fullName,bio);
        const userId = req.user?._id;
        let updatedUser;
    
        if (!profilePic) {
          updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { fullName, bio },
            { new: true, runValidators: true }
          );
        } else {
          const upload = await cloudinary.uploader.upload(profilePic, {
            folder: "profile_pics",
            resource_type: "auto",
          });
    
    
          updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {
              fullName,
              profilePic: upload.secure_url, // store cloud URL
              bio,
            },
            { new: true, runValidators: true }
          );
          fs.unlinkSync(profilePic);

        }
    
        if (!updatedUser) {
          return res
            .status(404)
            .json({ success: false, message: "User not found" });
        }
    
        return res.status(200).json({ success: true, user: updatedUser });
      } catch (error) {
        if (error.code === 11000 && error.keyValue?.fullName) {
          return res.status(400).json({
            success: false,
            message: `The full name "${error.keyValue.fullName}" is already taken. Please choose another.`,
          });
        }
        console.error("Error updating profile:", error);
        return res.status(500).json({
          success: false,
          message: "Something went wrong while updating your profile.",
          error: error.message,
        });
      }
    };
    
    
    


module.exports = {
   handleUserSignup,
   handleUserSignin,
   handleCheckAuth,
   handleUpdateProfile,
}
