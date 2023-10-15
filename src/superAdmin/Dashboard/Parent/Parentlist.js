
import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import ContextData from "../../Context/ContextData";
import add from '../../../Assets/add.png';
import edit from '../../../Assets/edit.png';
import del from '../../../Assets/delete.png';
import more from '../../../Assets/more.png';

function Parentlist() {
  const {schoolId,apiurl}= useContext(ContextData);
    //get all entries so we can show the record 
    const [data, setData] = useState([]);
    
    //when the page or event is loaded then this method will automatically called 
    useEffect(() => {
      fetchData();  
    },[]);

    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiurl}/api/parent/allParent?id=${schoolId}`);
        setData(response?.data?.data?.parent);
        console.log(response?.data?.data.parent);
        console.log('---',data);
      } catch (error) {
        console.error(error);
      }
    };
    async function deleteParent(id){
      const confirmDelete = window.confirm('Are you sure you want to delete this record?');
      if(confirmDelete && id!=""){
        console.log(id);
        await axios.delete(`${apiurl}/api/Parent/deleteParent?id=${id}`);
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
            <p><Link to={`/AddParent`} > <img src={add}/></Link></p>
            <div className="allRecord">
                 <h1>Parents</h1> 
                 <table className="table table-striped table-hover">
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
                          <td>{schoolId}</td>
                          <td>
                            {/* <input type="button" className="btn btn-danger" 
                            onClick={(e)=> deleteParent(item.id)} value="delete" /> */}                           
                             <Link to={`/EditParent?id=${item.id}`}> <img src={edit}/> </Link>
                         
                         
                            <span onClick={(e)=> deleteParent(item.id)}>
                                <img src={del}/>
                            </span>
                            <Link to={`/ParentDetails?id=${item.id}`}><img src={more}/> </Link>
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