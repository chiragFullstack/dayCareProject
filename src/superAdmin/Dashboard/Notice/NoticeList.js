
import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import ContextData from '../../Context/ContextData';
import add from '../../../Assets/add.png';

import profile from '../../../Assets/schoolnotes.png';
import message from '../../../Assets/message.png';
import date from '../../../Assets/date.png';


function NoticeList() {
     //get all entries so we can show the record 
     const [data, setData] = useState([]);
     const { schoolId,parentId,loginType } = useContext(ContextData);
     //when the page or event is loaded then this method will automatically called 
     useEffect(() => {
       fetchData();  
     },[]);
 
     const fetchData = async () => {
       try {
         console.log('notes list of school id==',loginType);
         const response = await axios.get(`http://54.172.2.94:5000/api/Notice/allNoticeBySchoolId?id=${schoolId}`);
         setData(response?.data?.data);
         console.log(response.data.data);
       } catch (error) {
         console.error(error);
       }
     };
     function convertDate(_date){
        const date = new Date(_date);
        const formattedDate = date.toISOString().split('T')[0];
        return formattedDate;
     }
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
          <Link to={`/addNotes`} className="icon" style={{ display:loginType=='admin' ||loginType=='staff'?"block":'none' }}><img src={add}/></Link>
          <br/><br/>
            <div className="allRecord">
                 <h1>View All Notes</h1>  
                    {
                    data.length>0 ? data.map((item) => (
                        <div class="card" key={item.id} style={{width:"18rem",padding:"5px", margin:"5px",float:"left"}}>
                        <img src={profile} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <p className="card-text"><img src={message} />{item.message}</p>
                            <p className="card-text"><img src={date} /> {convertDate(item.noticedate.toString())}</p>                           
                        </div>
                    </div>     
                      )):(
                        "No Record Found"
                    )}
                    
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NoticeList