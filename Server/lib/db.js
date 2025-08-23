const mongoose  = require("mongoose")

 const ConnectDb = async (url) => {
    try {
     await mongoose.connect(`${url}/chat-App`);
     console.log('MongoDb connected');
    } catch (error) {
        console.log(error);
    }
  }

  module.exports = ConnectDb;