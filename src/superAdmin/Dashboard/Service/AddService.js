import React, { useState,useEffect } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useNavigate  } from 'react-router-dom';

function AddService() {
    const history = useNavigate ();
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
          const response = await axios.post('http://54.172.2.94:5000/api/service/addService', form_Data, {
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
          <p className="logo pb-2">Daycare</p>
          <hr className="" />
          <Leftmenu/>
        </div>
        <div className="right-box">
          <div className="db-content-display">
            <form onSubmit={handleSubmit} encType='multiplart/form-data'>
              <label>
                Service Name:
                <input type="text" value={servicename} onChange={(e)=>{
                    setServiceName(e.target.value);
                }} />
              </label>
              <br />
              <label>
                description:
                <input type="text" value={description} onChange={(e)=>{
                    setDescription(e.target.value);
                }} />
              </label>
              
              
              <button type="submit" className='btn btn-primary'>Submit</button>
            </form>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default AddService