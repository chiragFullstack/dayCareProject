import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useNavigate  } from 'react-router-dom';
import ContextData from '../../Context/ContextData';

function AddService() {

    const history = useNavigate ();
    const { apiurl } = useContext(ContextData);
    const [servicename, setServiceName] = useState('');
    const [description, setDescription] = useState('');

       //calling the method 
       const handleSubmit = async (event) => {
        event.preventDefault();
        //here we need to call the API to post the data to the backend server 
        const form_Data = new FormData();
        form_Data.append('servicename', servicename);
        form_Data.append('description', description);
        console.log(form_Data);
        try {
          const response = await axios.post(`${apiurl}/api/service/addService`, form_Data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(response.data);
          history('/Servicelist');
        } catch (error) {
          console.error(error);
        }
        // Reset form fields
        setServiceName('');
        setDescription('');

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
                        <input type="text" value={servicename} onChange={(e)=>{
                            setServiceName(e.target.value);
                        }} placeholder="Name"  required />
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-group">
                        <label>
                          description:
                          <input type="text" value={description} onChange={(e)=>{
                              setDescription(e.target.value);
                          }} placeholder="Description" required/>
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

export default AddService