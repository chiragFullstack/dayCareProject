import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import add from '../../../Assets/add.png';
import edit from '../../../Assets/edit.png';
import del from '../../../Assets/delete.png';
import more from '../../../Assets/more.png';
import ContextData from '../../Context/ContextData';

function Schoollist() {
    //get all entries so we can show the record 
    const [data, setData] = useState([]);
    const { apiurl } = useContext(ContextData);
    //when the page or event is loaded then this method will automatically called 
    useEffect(() => {
      fetchData();  
    },[]);

    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiurl}/api/School/allSchool`);
        setData(response?.data?.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
  async function deleteSchool(id){
    
    const confirmDelete = window.confirm('Are you sure you want to delete this record?');
    if(confirmDelete){
      const res=await axios.delete(`${apiurl}/api/School/deleteSchool?id=${id}`);
      //const res=await axios.delete(`http://localhost:5000/api/School/deleteSchool?id=${id}`);
      console.log(res);
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
            <Link to={`/AddSchool`} className="icon"> <img src={add}/> </Link>
          </p>
            <div className="allRecord">
                 <h1>Organization</h1> 
                 <table className="table table-striped table-hover">
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
                            {/* <input type="button" className="btn btn-danger" 
                             value="delete" /> */}
                            <Link to={`/Editschool?id=${item.id}`} > <img src={edit}/> </Link>
                            <span onClick={(e)=> deleteSchool(item.id)}><img src={del}/> </span>
                            <Link to={`/Schooldetails?id=${item.id}`} > <img src={more}/> </Link>
                            
                            
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