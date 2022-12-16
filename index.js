const bodyParser = require("body-parser");
const express = require("express");
const path = require('path');
 require('dotenv').config({path:path.join(__dirname,'.env')})
const main_routes = require('./routes/main_routes');
const fileUpload=require('express-fileupload')
const Session = require('express-session');
const cookieParser = require('cookie-parser');
const { Server } = require("socket.io");
const chatM = require('./models/chats')
const sectionRouter = require('./routes/sectoinR')
const chatRouter = require('./routes/chatRouter')
const app = express();

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'content-type,key');


    // // Set to true if you need the website to include cookies in the requests sent
    // // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(cookieParser())
app.use(Session({secret:'hehe'}))
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
const http = require("http");


app.use(express.static(path.join(__dirname,'static')))
app.use(bodyParser.json())
app.use(fileUpload())
app.use('/fetch' , chatRouter)

//app.use('/sections' ,sectionRouter )
app.use('/',main_routes)
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  
  io.on("connection", (socket) => {
        console.log(`User Connected: ${socket.id}`);
  
        socket.on("join_room", (data) => {
          socket.join(data);
          console.log(`User with ID: ${socket.id} joined room: ${data}`);
        });
  
        socket.on("send_message", (data) => {
          socket.to(data.room).emit("receive_message", data);
                 //chatM.insertOne({message:data.message , author:data.author , time:data.time , room:data.room})
          chatM.create({message:data.message , author:data.author , time:data.time , room:data.room})
          .then((msg)=>{
            console.log('msg created succesfully' , msg)
            }, (err)=>next(err))
          .catch((err)=> console.log(err))
            });
  
        socket.on("disconnect", () => {
          console.log("User Disconnected", socket.id);
        });
  });


const PORT=process.env.PORT || 2555
server.listen(PORT, () => {
    console.log("im working on 2555");
});
