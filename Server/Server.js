const { Socket } = require('dgram');
require('dotenv').config();
const express = require('express');
const app = express(); //creating instance of express
const PORT = process.env.PORT;
const cors = require('cors')
const http = require('http');
const ConnectDb = require('./lib/db');
const UserRoute = require('./routes/userRoutes');
const MessRoute = require('./routes/messageRoute')
const path = require('path');
const {initSocket} = require('./Socket');



app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({extended : true}));
// app.use(express.static(path.resolve('./public/pages')));

app.use(cors());

const server = http.createServer(app); 
initSocket(server);


app.use(express.static(path.resolve('./public/images')));


app.use('/user',UserRoute);
app.use('/messages',MessRoute);

app.get('/', (req,res) => {
//  res.sendFile('/public/index.html')
 res.send('Server Started')
})

ConnectDb(process.env.MONGO_URI);

server.listen(PORT,() => console.log(`Server started at port ${PORT}`));