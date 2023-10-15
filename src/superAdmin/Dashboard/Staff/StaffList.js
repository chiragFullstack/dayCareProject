
import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import ContextData from '../../Context/ContextData';
import add from '../../../Assets/add.png';
import edit from '../../../Assets/edit.png';
import del from '../../../Assets/delete.png';


function StaffList() {
    //get all entries so we can show the record 
    const [data, setData] = useState([]);
    const { schoolId,apiurl } = useContext(ContextData);
    //when the page or event is loaded then this method will automatically called 
    useEffect(() => {
      fetchData();  
    },[]);

    const fetchData = async () => {
      try {
        console.log('staff list of school id==',schoolId);
        const response = await axios.get(`${apiurl}/api/staff/getSchoolStaff?id=${schoolId}`);
        setData(response?.data?.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    async function deleteStaff(id){
      const confirmDelete = window.confirm('Are you sure you want to delete this record?');
      if(confirmDelete && id!=""){
        await axios.delete(`${apiurl}/api/staff/deleteStaff?id=${id}`);
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
            <Link to={`/AddStaff`} className="icon"><img src={add}/></Link>
            </p>
            <div className="allRecord">
                 <h1>Staff</h1> 
                 <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Email </th>
                        <th>User Name </th>
                        <th> </th>
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
                          <td>
                            <Link to={`/EditStaff?id=${item.id}`}> <img src={edit}/> </Link>
                            <span onClick={(e)=> deleteStaff(item.id)}>
                                <img src={del}/>
                            </span>
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