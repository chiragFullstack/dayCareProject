
import React, { useState,useEffect } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';


function StaffList() {

    //get all entries so we can show the record 
    const [data, setData] = useState([]);
    
    //when the page or event is loaded then this method will automatically called 
    useEffect(() => {
      fetchData();  
    },[]);

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/staff/allStaff');
        setData(response?.data?.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    async function deleteStaff(id){
        console.log(id);
        await axios.delete(`http://localhost:5000/api/staff/deleteStaff/${id}`);
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
          <Link to={`/AddStaff`} className="btn btn-primary"> Add Staff</Link>
          <br/><br/>
            <div className="allRecord">
                 <h1>View All Staff Member</h1> 
                 <table className="table table-border">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Email </th>
                        <th>Designation </th>
                        <th>Class Id </th>
                        <th>User Name </th>
                        <th>Modifications </th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                    data.length>0 ? data.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.contact}</td>
                          <td>{item.email}</td>
                          <td>{item.designation}</td>
                          <td>{item.schoolid}</td>
                          <td>{item.classid}</td>
                          <td>{item.username}</td>
                          <td>
                            <input type="button" className="btn btn-danger" 
                            onClick={(e)=> deleteStaff(item.id)} value="delete" />
                            <Link to={`/EditStaff/${item.id}`} className="btn btn-success"> Edit Details </Link>
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

export default StaffList