import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import ContextData from "../../Context/ContextData";
import add from '../../../Assets/add.png';
import chat from '../../../Assets/chat.png';
import video from '../../../Assets/video.png';


function ChatRoomid() {
    const {schoolId}= useContext(ContextData);

    //get all entries so we can show the record 
    const [data, setData] = useState([]);

    //when the page or event is loaded then this method will automatically called 
    useEffect(() => {
      fetchData();  
    },[]);

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://daycare-tas4.onrender.com/api/message/getChatRoomId?id=${schoolId}`);
        setData(response?.data?.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
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
          <Link to={`/Addroom`} ><img src={add}/> </Link>
          <br/><br/>
            <div className="allRecord">
                 <h1>View All Rooms</h1> 
                 <table className="table table-striped  table-hover">
                    <thead>
                      <tr>
                        <th style={{ width:"70%" }}>Name</th>
                        <th>Send Message</th>
                        <th>Send Video</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                    data.length>0 ? data.map((item,index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>                         
                            <Link to={`/message?id=${item.parentid}`} > <img src={chat} title="Edit Detail"/> </Link>
                          </td>
                          <td>                         
                            <Link to={`/Video?id=${item.parentid}`} > <img src={video} title="Edit Detail"/> </Link>
                          </td>
                        </tr>
                      )):(
                      <tr>
                        <td colSpan="3">No data available</td>
                      </tr>
                    )}
                    </tbody>
                  </table>
          </div>
          </div>
        </div>
      </div>   
    </>
  )
}

export default ChatRoomid