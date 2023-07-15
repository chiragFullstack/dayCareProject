import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import ContextData from "../../Context/ContextData";

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
            const response = await axios.get('http://localhost:5000/api/room/allRoom');
            setData(response?.data?.data);
            console.log(response.data.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        async function deleteService(id){
            console.log(id);
            await axios.delete(`http://localhost:5000/api/room/deleteRoom/${id}`);
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
          <Link to={`/Addroom`} className="btn btn-primary m-3"> Add New Room </Link>

          <Link to={`/Schooldetails/${schoolId}`} className="btn btn-primary"> Back to Details </Link>
          
          <br/><br/>
            <div className="allRecord">
                 <h1>View All Rooms</h1> 
                 <table className="table table-border">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Room Name</th>
                        <th>School ID</th>
                        <th>description</th>
                        <th>Modification</th>
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
                            <input type="button" className="btn btn-danger" 
                            onClick={(e)=> deleteService(item.id)} value="delete" />
                            <Link to={`/EditRoom/${item.id}`} className="btn btn-success"> Edit </Link>
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