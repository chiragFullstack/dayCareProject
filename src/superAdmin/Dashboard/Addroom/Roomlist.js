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
        const {schoolId,apiurl}= useContext(ContextData);

        //get all entries so we can show the record 
        const [data, setData] = useState([]);
    
        //when the page or event is loaded then this method will automatically called 
        useEffect(() => {
          fetchData();  
        },[]);
    
        const fetchData = async () => {
          try {
            const response = await axios.get(`${apiurl}/api/room/roomBySchoolId?id=${schoolId}`);
            setData(response?.data?.data);
            console.log(response.data.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        async function deleteService(id){
          const confirmDelete = window.confirm('Are you sure you want to delete this record?');
          if(confirmDelete){
            console.log(id);
            await axios.delete(`${apiurl}/api/room/deleteRoom?id=${id}`);
            fetchData();  
          }
        }
  return (
    <>
        <div className="maiv-div-box">
        <div className="sidebar">
          <Leftmenu/>
        </div>
        <div className="right-box">
          <div className="db-content-display">
            <p>
              <Link to={`/Addroom`} ><img src={add}/> </Link>
            </p>
            <div className="allRecord">
                 <h1>Rooms</h1> 
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
                            <Link to={`/selectChild?roomid=${item.id}`}> <img src={activityReport} title="Activity Report"/> </Link>
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