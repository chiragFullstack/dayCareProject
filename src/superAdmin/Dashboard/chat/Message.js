import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import ContextData from "../../Context/ContextData";
import add from '../../../Assets/add.png';
import chat from '../../../Assets/chat.png';
import sent from '../../../Assets/sent.png';
import io from 'socket.io-client';
import { logDOM } from "@testing-library/react";



function Message() {
    
    const {schoolId, loginType,apiurl}= useContext(ContextData);
    
    const socket = io(`${apiurl}/`);

    const urlSearchParams = new URLSearchParams(window.location.search);
    // Get the value of the "id" variable
    const parentId = urlSearchParams.get('id');
    
    //get all entries so we can show the record 
    

    const [message, setMessage] = useState();
    const [allmessages, setAllMessages] = useState([]);

    let chatroomid=schoolId+"_"+parentId;
    //when the page or event is loaded then this method will automatically called 
    useEffect(() => {
        getMessage();
    },[]);

  const getMessage= async()=>{
    console.log('---logon Type', loginType);
     // Use a flag to track if the event handler is already set
     
    if(loginType=='admin' || loginType=='staff'){
        const recordData={
            "senderid":schoolId,
            "recieverid":parentId,
            "roomid":chatroomid
        }
        await socket.emit("join_room",recordData);
        await socket.on('receive_message', (data) => {
            setAllMessages([...allmessages, ...data]);
            console.log(allmessages);
            //setAllMessages(data);
        });
    }
    if(loginType=='parent'){
        const recordData={
            "senderid":parentId,
            "recieverid":schoolId,
            "roomid":chatroomid
        }
        await socket.emit("join_room",recordData);
        await socket.on('receive_message', (data) => {
             setAllMessages([...allmessages, ...data]);
           // setAllMessages(data);
        });
    }
    console.log('--all messages---',allmessages);
  }

    const sendMessage = async() => {
        console.log('clicked---');
        // Send a message to the server
        if(loginType==='parent'){
            const recordData={
                "senderid":parentId,
                "recieverid":schoolId,
                "sendertype":'parent',
                "message":message,
                "roomid":chatroomid
            }
            await socket.emit('send_message',recordData);
            // Clear the input field
            setAllMessages([...allmessages, recordData]);
        }

        if(loginType==='admin' || loginType==='staff'){
            const recordData={
                "senderid":schoolId,
                "recieverid":parentId,
                "sendertype":'admin',
                "message":message,
                "roomid":chatroomid
            }
            await socket.emit('send_message',recordData);
            // Clear the input field
            setAllMessages([...allmessages, recordData]);
        }
        
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
                    {allmessages.map((msg, index) => (
                        loginType=='admin'||loginType=='staff'?
                            msg.sendertype==='admin' && msg.message!==''?
                            <div key={index} className="chat-message" style={{background:"#d9fdd3", float:"right", boxShadow: "0 0 10px #00000015", borderRadius:"6px" }}>
                                {msg.message}
                                <span className="msg_time">11:00 pm</span>
                            </div>
                            :
                            <div key={index} className="chat-message" style={{background:"#8080801c", float:"left", boxShadow: "0 0 10px #00000015", borderRadius:"6px" }}>
                                {msg.message}
                                <span className="msg_time">12:00 pm</span>
                            </div>
                        :
                        msg.sendertype==='parent' && msg.message!==''?
                        <div key={index} className="chat-message" style={{background:"#d9fdd3", float:"right" }}>
                            {msg.message}
                            <span className="msg_time">12:00 pm</span>
                        </div>
                        :
                        <div key={index} className="chat-message" style={{background:"#8080801c", float:"left" }}>
                            {msg.message}
                            <span className="msg_time">12:00 pm</span>
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