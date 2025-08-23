
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName : {
    type : String,
    required : true,
    unique : true
  },
  email : {
    type : String,
    required : true,
    unique : true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"]
  },
  profilePic : {
    type : String,
    default : '/user.png', 
  },
  bio : {
    type : String,
    required : true,
  },
},{timestamps : true});

const UserModel = mongoose.model('user',userSchema);

module.exports = UserModel;