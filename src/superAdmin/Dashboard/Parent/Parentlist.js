
import React, { useState,useEffect } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';

function Parentlist() {
    
    //get all entries so we can show the record 
    const [data, setData] = useState([]);
    
    //when the page or event is loaded then this method will automatically called 
    useEffect(() => {
      fetchData();  
    },[]);

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/Parent/allParent');
        setData(response?.data?.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    async function deleteParent(id){
        console.log(id);
        await axios.delete(`http://localhost:5000/api/Parent/deleteParent/${id}`);
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
          <Link to={`/AddParent`} className="btn btn-primary"> Add Parent </Link>
          <br/><br/>
            <div className="allRecord">
                 <h1>View All Parents</h1> 
                 <table className="table table-border">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Email </th>
                        <th>Username </th>
                        <th>School-Id </th>
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
                          <td>{item.username}</td>
                          <td>{item.schoolid}</td>
                          <td>
                            <input type="button" className="btn btn-danger" 
                            onClick={(e)=> deleteParent(item.id)} value="delete" />
                            
                            <Link to={`/ParentDetails/${item.id}`} className="btn btn-success"> View All Details </Link>
                            
                            <Link to={`/EditParent/${item.id}`} className="btn btn-success"> Edit </Link>
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

export default Parentlist