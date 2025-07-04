const express=require("express");
const app=express();
const http=require("http");
const server=http.createServer(app);//creates an http server for our app 
//intilaise socket.io server through http server

const {Server}=require("socket.io");
const io=new Server(server);


io.on('connection',(Socket)=>{
    console.log("user ");
})
const PORT =process.env.PORT||3000;
server.listen(PORT,()=>{
    console.log(`server is runnning${PORT}`);
})
