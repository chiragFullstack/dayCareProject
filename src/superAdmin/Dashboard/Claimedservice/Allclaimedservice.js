import React, { useState,useEffect } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

function Allclaimedservice() {
  const history = useNavigate ();
  //get all entries so we can show the record 
  const [data, setData] = useState([]);
  const [status,setStatus]=useState('');
  //when the page or event is loaded then this method will automatically called 
  useEffect(() => {
    fetchData();  
  },[]);
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/claimedService/claimedServiceList');
      setData(response?.data?.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
async function deleteService(id){
  console.log(id);
  await axios.delete(`http://localhost:5000/api/claimedService/deleteService/${id}`);
  fetchData();  
 }

 async function deactivateService(id,status){
 console.log(status);
  // //here we need to call the API to post the data to the backend server 
  const form_Data = new FormData();
  form_Data.append('status', status);
  try {
    const response = await axios.put(`http://localhost:5000/api/claimedService/deactivateService/${id}`, form_Data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
    fetchData();  
  } catch (error) {
    console.error(error);
  }
 }
 

 function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
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
          <Link to={`/Claimnewservice`} className="btn btn-primary"> Claim New Service  </Link>
          <br/><br/>
            <div className="allRecord">
                 <h1>View All Claimed Service</h1> 
                 <table className="table table-border">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>School Name</th>
                        <th>Service Name</th>
                        <th>Obtaining Date</th>
                        <th>Status</th>
                        <th>Modification</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                    data.length>0 ? data.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.servicename}</td>
                          <td>{
                            formatDate(item.obtainingdate)
                          }</td>
                          <td>{item.status}</td>
                          <td>
                            <input type="button" className="btn btn-danger" 
                            onClick={(e)=> deleteService(item.id)} value="delete" />

                            <input type="button" className="btn btn-danger" 
                            onClick={(e)=> deactivateService(item.id,(item.status=="Activate"?"Deactivate":"Activate"))} value={(item.status=="Activate"?"Deactivate":"Activate")} />
                            
                            <Link to={`/Editclaimservice/${item.id}`} className="btn btn-success"> Edit Details </Link>
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

export default Allclaimedservice