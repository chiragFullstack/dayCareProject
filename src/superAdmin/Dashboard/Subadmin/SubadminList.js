import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import ContextData from '../../Context/ContextData';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';


function SubadminList() {
    //get all entries so we can show the record 
    const [data, setData] = useState([]);
    const { schoolId } = useContext(ContextData);
    //when the page or event is loaded then this method will automatically called 
    useEffect(() => {
    fetchData();  
    },[]);

    const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/subadmin/subadminlist');
        setData(response?.data?.data);
        console.log(response.data.data);
    } catch (error) {
        console.error(error);
    }
    };
    async function deleteService(id){
    console.log(id);
    await axios.delete(`http://localhost:5000/api/subadmin/deleteSubadmin/${id}`);
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
          <Link to={`/Subadmin`} className="btn btn-primary m-3"> Add SubAdmin </Link>
          <Link to={`/Schooldetails/${schoolId}`} className="btn btn-primary"> Back to Details </Link>
          <br/><br/>
            <div className="allRecord">
                 <h1>View All Sub Admin</h1> 
                 <table className="table table-border">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>contact</th>
                        <th>Address</th>
                        <th>School ID </th>
                        <th>Modification</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                    data.length>0 ? data.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.contact}</td>
                          <td>{item.address}</td>
                          <td>{item.schoolid}</td>
                          
                          <td>
                            <input type="button" className="btn btn-danger" 
                            onClick={(e)=> deleteService(item.id)} value="delete" />
                            <Link to={`/EditSubadmin/${item.id}`} className="btn btn-success"> Edit </Link>
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

export default SubadminList