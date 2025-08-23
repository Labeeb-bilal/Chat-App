const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true,
    },
    recieverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true,
    },
    text : {
        type : String,
    },
    image : {
        type : String,
    },
    seen : {
        type : Boolean,
        default : false,
    }
}, {timesamps : true});

const MessageModel = mongoose.model('messages',messageSchema);

module.exports = MessageModel;