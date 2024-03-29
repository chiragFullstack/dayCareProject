import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useNavigate  } from 'react-router-dom';
import ContextData from '../../Context/ContextData';


function Claimnewservice() {
    const history = useNavigate ();

    const { schoolId,apiurl } = useContext(ContextData);

    const [service_id, setServiceId] = useState('');
    const [status, setStatus] = useState('Activate');
    const [schoolid, setSchoolId] = useState(schoolId);
    const [obtainingdate, setObtainingDate] = useState('');
   

    const [servicedata, setServiceData] = useState([]);
    const [schooldata, setSchoolData] = useState([]);
    useEffect(() => {
        fetchData();  
      },[]);

      const fetchData = async () => {
        try {
            //get all service and id
            const res = await axios.get(`${apiurl}/api/service/allService`);
            setServiceData(res?.data?.data);
            
        } catch (error) {
            console.error(error);
        }
    }

 //calling the method 
 const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(service_id);

    // //here we need to call the API to post the data to the backend server 
    const form_Data = new FormData();
    form_Data.append('serviceid', service_id);
    form_Data.append('status', status);
    form_Data.append('schoolid', schoolid);
    form_Data.append('obtainingdate', obtainingdate);
    
    try {
      const response = await axios.post(`${apiurl}/api/claimedService/claimedService`, form_Data, {
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
          <form onSubmit={handleSubmit} encType='multiplart/form-data'>
            <div className="container">
              <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                       <label>
                          Service Name:
                          <select value={service_id}  onChange={(e)=>{
                            setServiceId(e.target.value);
                          }}>
                            {servicedata.map((option, index) => (
                                <option key={index} value={option.id}>
                                  {option.servicename}
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
                            }} />
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

export default Claimnewservice