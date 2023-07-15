import React, { useState,useEffect } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';


function Schoollist() {
    //get all entries so we can show the record 
    const [data, setData] = useState([]);
    
    //when the page or event is loaded then this method will automatically called 
    useEffect(() => {
      fetchData();  
    },[]);

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/allSchool');
        setData(response?.data?.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
  async function deleteSchool(id){
    console.log(id);
    await axios.delete(`http://localhost:5000/deleteSchool/${id}`);
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
          <Link to={`/AddSchool`} className="btn btn-primary"> Add School </Link>
          <br/><br/>
            <div className="allRecord">
                 <h1>View All School</h1> 
                 <table className="table table-border">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Delete </th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                    data.length>0 ? data.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>
                            <input type="button" className="btn btn-danger" 
                            onClick={(e)=> deleteSchool(item.id)} value="delete" />
                            
                            <Link to={`/Schooldetails/${item.id}`} className="btn btn-success"> Add Features </Link>
                            
                            <Link to={`/Editschool/${item.id}`} className="btn btn-success"> Edit </Link>
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

export default Schoollist