import React,{useEffect, useRef, useState} from 'react';
import Client from "./client";
import Editor from './Editor';
import { initSocket } from '../socket';
import {useLocation , useParams} from 'react-router-dom';



function EditorPage() {
    const socketRef=useRef(null);
    const location=useLocation();
    const roomid=useParams();
    useEffect(()=>{
          const init=async()=>{
             socketRef.current=await initSocket();
            //  socketref.current.emit('join',{
            //     roomid,
            //     username:location.state?.username
            //  })
          };
          init();
    },[])
    const [clients,setClient]=useState([
        {socketId:"1", username:"bhanu"},
        {socketId:"2", username:"prakash"},
    ]);

  return (
    <div className='container-fluid vh=100'>
    <div className='row h-100'>
        <div className='col-md-2 text-light bg-dark  d-flex flex-column vh-100 ' style={{boxShadow: "2px 0px 4px rgba(0 0 0 0.1)" }}>
               <img src='/CollabCO.png' alt='codecollab' height="200"    style={{marginTop:"-40px"}}/> 
               <hr style={{marginTop:"-40px"}}/> 
        

        {/* client details*/}
        <div className='d-flex flex-column overflow-auto '>
            {clients.map((client)=>(
                  <Client key={client.socketId} username={client.username}/>
            ))}
        </div>
        
       
       {/*buttons*/}
       <div className='mt-auto'>
       <hr/>
        <button className='btn btn-success '>Copy Room Id</button>
        <button className='btn btn-danger mt-2 mb-2 px-3 d-flex'>Leave</button>
       </div>

       
       </div>


        {/* editor*/}
        <div className='col-md-10 text-light d-flex flex-column vh-100'>
            <Editor />
        </div>
    </div>

   </div>
  )
  
}

export default EditorPage;
