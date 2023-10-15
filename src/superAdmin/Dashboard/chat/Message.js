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
    
    const {schoolId, loginType,apiurl}= useContext(ContextData);
    
    const socket = io(`${apiurl}/`);

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
    console.log('logon Type', loginType);
    if(loginType=='admin' || loginType=='staff'){
        const recordData={
            "senderid":schoolId,
            "recieverid":parentId,
            "roomid":chatroomid
        }
        socket.emit("join_room",recordData);
        socket.on('receive_message', (data) => {
            setMessages([...messages, ...data]);
            console.log('get all messages',messages);
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
          <Leftmenu/>
        </div>
        <div className="right-box">
          <div className="db-content-display">
                <div className="messagearea">
                <div className="allMessages">
                    {messages.map((msg, index) => (
                        loginType=='admin'||loginType=='staff'?
                            msg.sendertype==='admin'?
                            <div key={index} className="chat-message" style={{background:"#d9fdd3", float:"right", boxShadow: "0 0 10px #00000015", borderRadius:"6px" }}>
                                {msg.message}
                                <span className="msg_time">11:00 pm</span>
                            </div>
                            :
                            <div key={index} className="chat-message" style={{background:"#8080801c", float:"left", boxShadow: "0 0 10px #00000015", borderRadius:"6px" }}>
                                {msg.message}
                                <span className="msg_time">11:00 pm</span>
                            </div>
                        :
                        msg.sendertype==='parent'?
                        <div key={index} className="chat-message" style={{background:"#d9fdd3", float:"right" }}>
                            {msg.message}
                        </div>
                        :
                        <div key={index} className="chat-message" style={{background:"#8080801c", float:"left" }}>
                            {msg.message}
                        </div>   
                    ))}
                </div>
             <div className="inputArea_chatbox">
                <label>
                    Message:
                <input type="text" value={message} onChange={(e)=>{
                    setMessage(e.target.value);
                }} />
              </label>
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