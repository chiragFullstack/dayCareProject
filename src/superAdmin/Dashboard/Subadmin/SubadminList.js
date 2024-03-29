import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import ContextData from '../../Context/ContextData';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import add from '../../../Assets/add.png';
import edit from '../../../Assets/edit.png';
import del from '../../../Assets/delete.png';

function SubadminList() {
    //get all entries so we can show the record 
    const [data, setData] = useState([]);
    const { schoolId,apiurl } = useContext(ContextData);
    //when the page or event is loaded then this method will automatically called 
    useEffect(() => {
    fetchData();  
    },[]);

    const fetchData = async () => {
    try {
        const response = await axios.get(`${apiurl}/api/subadmin/subadminlist`);
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
          await axios.delete(`${apiurl}/api/subadmin/deleteSubadmin?id=${id}`);
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
            <Link to={`/Subadmin`} className="icon"> <img src={add}/> </Link>
            </p>
            <div className="allRecord">
                 <h1>School Admin</h1> 
                 <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>contact</th>
                        <th>Address</th>
                        <th>School ID </th>
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
                            <Link to={`/EditSubadmin?id=${item.id}`} ><img src={edit}/> </Link>
                            <span onClick={(e)=> deleteService(item.id)}>
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

export default SubadminList