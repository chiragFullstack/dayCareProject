import React, { useState,useEffect } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useParams,useNavigate } from 'react-router-dom';


function Editclaimservice() {
    const history = useNavigate ();

    const {id}=useParams("");

    const [service_id, setServiceId] = useState('');
    const [status, setStatus] = useState('Deactivate');
    const [schoolid, setSchoolId] = useState('');
    const [obtainingdate, setObtainingDate] = useState('');

    const [servicedata, setServiceData] = useState([]);
    const [schooldata, setSchoolData] = useState([]);
    const [claimservicedata, setclaimserviceData] = useState([]);
    function formatDate(date) {
        const formattedDate = new Date(date).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('/').reverse().join('-');
        return formattedDate;
    }
    
    useEffect(() => {
        fetchData();  
      },[]);

      const fetchData = async () => {
        try {
            //get all school name and id
            const response = await axios.get('https://daycare-tas4.onrender.com/allSchool');
            setSchoolData(response?.data?.data);
            
            //get all service and id
            const res = await axios.get('https://daycare-tas4.onrender.com/api/service/allService');
            setServiceData(res?.data?.data);
            
            const resp = await axios.get(`https://daycare-tas4.onrender.com/api/claimedService/ServiceById/${id}`);
            console.log(resp?.data?.data);

            setObtainingDate( formatDate(resp?.data?.data[0].obtainingdate));
            setStatus(resp?.data?.data[0].status);
        } catch (error) {
            console.error(error);
        }
    }
   
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(service_id);
    
        // //here we need to call the API to post the data to the backend server 
        const form_Data = new FormData();
        form_Data.append('serviceid', parseInt(service_id));
        form_Data.append('status', status);
        form_Data.append('schoolid', parseInt(schoolid));
        form_Data.append('obtainingdate', obtainingdate);
        
        try {
          const response = await axios.put(`https://daycare-tas4.onrender.com/api/claimedService/editClaimedService/${id}`, form_Data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(response.data);
          history('/Allclaimedservice');
        } catch (error) {
          console.error(error);
        }
      };
    
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
            <h1>Edit Claimed Service Details </h1>
          <form onSubmit={handleSubmit} encType='multiplart/form-data'>
              <label>
                Service Name:
                <select value={service_id}  className="form-control" onChange={(e)=>{
                  setServiceId(e.target.value);
                }}>
                   {servicedata.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.servicename}
                      </option>
                    ))}
                </select>
              </label>
              <br />
              <label>
                Date:
                <input type="date" value={obtainingdate} onChange={(e)=>{
                    setObtainingDate(e.target.value);
                }} />
              </label>
              <br />
              <label>
                School Name: <br/>
                <select value={schoolid}  className="form-control" onChange={(e)=>{
                  setSchoolId(e.target.value);
                }}>
                   {schooldata.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                </select>
              </label>
              <br /><br />
              <button type="submit" className='btn btn-primary'>Submit</button>
            </form>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Editclaimservice