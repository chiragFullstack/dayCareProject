import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import ContextData from "../../Context/ContextData";
import add from '../../../Assets/add.png';
import edit from '../../../Assets/edit.png';
import del from '../../../Assets/delete.png';
import activityReport from '../../../Assets/report.png';
import viewReport from '../../../Assets/viewReport.png';
import attendence from '../../../Assets/attendence.png';

//this component work with the room module 
function Roomlist() {
        const {schoolId}= useContext(ContextData);

        //get all entries so we can show the record 
        const [data, setData] = useState([]);
    
        //when the page or event is loaded then this method will automatically called 
        useEffect(() => {
          fetchData();  
        },[]);
    
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://54.172.2.94:5000/api/room/roomBySchoolId?id=${schoolId}`);
            setData(response?.data?.data);
            console.log(response.data.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        async function deleteService(id){
            console.log(id);
            await axios.delete(`http://54.172.2.94:5000/api/room/deleteRoom?id=${id}`);
            fetchData();  
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
          <Link to={`/Addroom`} ><img src={add}/> </Link>
          <br/><br/>
            <div className="allRecord">
                 <h1>View All Rooms</h1> 
                 <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Room Name</th>
                        <th>School ID</th>
                        <th>description</th>
                       
                      </tr>
                    </thead>
                    <tbody>
                    {
                    data.length>0 ? data.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.schoolid}</td>
                          <td>{item.description}</td>
                          <td>                         
                            <Link to={`/EditRoom?id=${item.id}`} > <img src={edit} title="Edit Detail"/> </Link>
                            <span onClick={(e)=> deleteService(item.id)} >
                                <img src={del} title="Delete"/>
                            </span>
                            <Link to={`/selectChild?roomid=${item.id}`}> <img src={activityReport} title="Add Report"/> </Link>
                            <Link to={`/searchReport?roomid=${item.id}`}> <img src={viewReport} title="View Report"/> </Link>
                            <Link to={`/childAttendence?roomid=${item.id}`}> <img src={attendence} title="Attendence "/> </Link>
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

export default Roomlist