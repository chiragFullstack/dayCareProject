import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useParams,useNavigate } from 'react-router-dom';
import ContextData from '../../Context/ContextData';

function EditService() {
    const history = useNavigate ();
    const { apiurl } = useContext(ContextData);
    const urlSearchParams = new URLSearchParams(window.location.search);
    // Get the value of the "id" variable
    const Sid = urlSearchParams.get('id');
    const [id,setId]=useState(Sid);

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
         const response = await axios.get(`${apiurl}/api/service/ServiceById?id=${id}`);
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
          const response = await axios.put(`${apiurl}/api/service/editService?id=${id}`, formData, {
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
                            }} placeholder="Name" required />
                          
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Description:
                          <input type="text" value={description} onChange={(e)=>{
                              setDescription(e.target.value);
                          }} placeholder="Description" required />
                        </label>
                      </div>
                    </div>
                  </div>
              </div>
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