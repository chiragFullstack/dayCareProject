import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import add from '../../../Assets/add.png';
import edit from '../../../Assets/edit.png';
import del from '../../../Assets/delete.png';
import ContextData from '../../Context/ContextData';

function Servicelist() {
    //get all entries so we can show the record 
    const [data, setData] = useState([]);
    const { apiurl } = useContext(ContextData);
    //when the page or event is loaded then this method will automatically called 
    useEffect(() => {
      fetchData();  
    },[]);

    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiurl}/api/service/allService`);
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
      await axios.delete(`${apiurl}/api/service/deleteService?id=${id}`);
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
            <Link to={`/Addservice`} className="icon"><img src={add}/></Link>
            </p>
            <div className="allRecord">
                 <h1>Service</h1> 
                 <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>description</th>
                        <th>Modification</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                    data.length>0 ? data.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.servicename}</td>
                          <td>{item.description}</td>
                          <td>
                            <Link to={`/EditService?id=${item.id}`}> <img src={edit}/> </Link>
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

export default Servicelist