import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import ContextData from "../../Context/ContextData";
import add from '../../../Assets/add.png';
import chat from '../../../Assets/chat.png';
import sent from '../../../Assets/sent.png';
import io from 'socket.io-client';


function Message() {
    
    const socket = io('http://localhost:5000');

    const {schoolId, loginType}= useContext(ContextData);

    const urlSearchParams = new URLSearchParams(window.location.search);
    // Get the value of the "id" variable
    const parentId = urlSearchParams.get('id');
    
    //get all entries so we can show the record 
    const [data, setData] = useState([]);

    const [message, setMessage] = useState();
    const [messages, setMessages] = useState([]);

    let chatroomid=schoolId+"_"+parentId;
    //when the page or event is loaded then this method will automatically called 
    useEffect(() => {
        console.log('school Id ',schoolId,'---',parentId,'----',chatroomid);
        getMessage();
    },[]);

  const getMessage=()=>{
    console.log(';logon Type', loginType);
    if(loginType=='admin' || loginType=='staff'){
        const recordData={
            "senderid":schoolId,
            "recieverid":parentId,
            "roomid":chatroomid
        }
        socket.emit("join_room",recordData);
        socket.on('receive_message', (data) => {
            console.log('get all messages',data);
            setMessages([...messages, ...data]);
        });
    }
    if(loginType=='parent'){
        const recordData={
            "senderid":parentId,
            "recieverid":schoolId,
            "roomid":chatroomid
        }
        socket.emit("join_room",recordData);
        socket.on('receive_message', (data) => {
            console.log('get all messages',data);
            setMessages([...messages, ...data]);
        });
    }
  }

    const sendMessage = () => {
        // Send a message to the server
       
        const recordData={
            "senderid":schoolId,
            "recieverid":parentId,
            "sendertype":'admin',
            "message":message,
            "roomid":chatroomid
        }

        socket.emit('send_message',recordData);
        // Clear the input field
        setMessage('');
      };

  return (
   <>
    <div className="maiv-div-box">
        <div className="sidebar">
          <p className="logo pb-2">Daycare</p>
          <hr className="" />
          <Leftmenu/>
        </div>
        <div className="right-box">
          <div className="db-content-display">
                <div className="messagearea">
                <div className="allMessages">
                    {messages.map((msg, index) => (
                        loginType=='admin'||loginType=='staff'?
                            msg.sendertype==='admin'?
                            <div key={index} className="chat-message" style={{background:"yellow", float:"right" }}>
                                {msg.message}
                            </div>
                            :
                            <div key={index} className="chat-message" style={{background:"green", float:"left" }}>
                                {msg.message}
                            </div>
                        :
                        msg.sendertype==='parent'?
                        <div key={index} className="chat-message" style={{background:"yellow", float:"right" }}>
                            {msg.message}
                        </div>
                        :
                        <div key={index} className="chat-message" style={{background:"green", float:"left" }}>
                            {msg.message}
                        </div>   
                    ))}
                </div>
             <div className="inputArea">
                <label>
                    Message:
                <input type="text" value={message} onChange={(e)=>{
                    setMessage(e.target.value);
                }} />
              </label>
              <br />
              <img src={sent} onClick={(e)=>{
                sendMessage();
              }}/>
             </div>
                </div>
          </div>      
        </div>
      </div>
    
   </>
  )
}

export default Message