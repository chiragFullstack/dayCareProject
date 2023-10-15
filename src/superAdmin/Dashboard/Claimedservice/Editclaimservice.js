import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useParams,useNavigate } from 'react-router-dom';
import ContextData from '../../Context/ContextData';

function Editclaimservice() {
    const history = useNavigate ();
    const { schoolId,apiurl } = useContext(ContextData);
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
            const response = await axios.get(`${apiurl}/allSchool`);
            setSchoolData(response?.data?.data);
            
            //get all service and id
            const res = await axios.get(`${apiurl}/api/service/allService`);
            setServiceData(res?.data?.data);
            
            const resp = await axios.get(`${apiurl}/api/claimedService/ServiceById/${id}`);
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
          const response = await axios.put(`${apiurl}/api/claimedService/editClaimedService/${id}`, form_Data, {
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
          <Leftmenu/>
        </div>
        <div className="right-box">
          <div className="db-content-display">
            <h1>Claimed Service  </h1>
          <form onSubmit={handleSubmit} encType='multiplart/form-data'>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                          <label>
                              Service Name:
                              <select value={service_id}  onChange={(e)=>{
                                setServiceId(e.target.value);
                              }} placeholder="Service Name" required>
                                {servicedata.map((option, index) => (
                                    <option key={index} value={option.id}>
                                      {option.servicename}
                                    </option>
                                  ))}
                              </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                              School Name: <br/>
                              <select value={schoolid}  onChange={(e)=>{
                                setSchoolId(e.target.value);
                              }} placeholder="School Id" required>
                                {schooldata.map((option, index) => (
                                    <option key={index} value={option.id}>
                                      {option.name}
                                    </option>
                                  ))}
                              </select>
                            </label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>
                              Date:
                              <input type="date" value={obtainingdate} onChange={(e)=>{
                                  setObtainingDate(e.target.value);
                              }} placeholder="Date" required />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
              <br />
              <button type="submit" className='btn btn-primary'>Submit</button>
            </form>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Editclaimservice