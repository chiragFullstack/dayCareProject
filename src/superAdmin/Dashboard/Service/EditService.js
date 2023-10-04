import React, { useState,useEffect } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useParams,useNavigate } from 'react-router-dom';

function EditService() {
    const history = useNavigate ();

    const {id}=useParams("");
    const [_id, setId] = useState('');
    
    const [servicename, setServiceName] = useState('');
    const [description, setDescription] = useState('');

     //get all entries so we can show the record 
     const [data, setData] = useState([]);
    
     //when the page or event is loaded then this method will automatically called 
     useEffect(() => {
       fetchData();  
     },[]);
 
     const fetchData = async () => {
       try {
         const response = await axios.get(`http://54.172.2.94:5000/api/service/ServiceById/${id}`);
         setData(response?.data?.data);
         console.log(response?.data?.data);
         setServiceName(response?.data?.data[0].servicename);
         setDescription(response?.data?.data[0].description);
       } catch (error) {
         console.error(error);
       }
     };
 

      //calling the method 
      const handleSubmit = async (event) => {
        event.preventDefault();

        //here we need to call the API to post the data to the backend server 
        const formData = new FormData();
        formData.append('servicename', servicename);
        formData.append('description', description);
        try {
          const response = await axios.put(`http://54.172.2.94:5000/api/service/editService/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
        // Reset form fields
        setServiceName('');
        setDescription('');
        history('/Servicelist');
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
                Description:
                <input type="text" value={description} onChange={(e)=>{
                    setDescription(e.target.value);
                }} />
              </label>
              <br />
              
              <button type="submit" className='btn btn-primary'>Update Service</button>
            </form>
          </div>
          
        </div>
      </div>   
    </>
  )
}

export default EditService