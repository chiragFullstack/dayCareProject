import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useNavigate  } from 'react-router-dom';
import ContextData from "../../Context/ContextData";

function Addroom() {

    const {schoolId}=useContext(ContextData);
    const history = useNavigate ();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
    useEffect(() => {
      fetchData();  
    },[]);

      const fetchData = async () => {
          try {
              
          } catch (error) {
              console.error(error);
          }
      }

       //calling the method 
       const handleSubmit = async (event) => {
        event.preventDefault();
        //here we need to call the API to post the data to the backend server 
        const form_Data = new FormData();
        form_Data.append('name', name);
        form_Data.append('schoolId', schoolId);
        form_Data.append('description', description);
        console.log(form_Data);
        try {
          const response = await axios.post('http://localhost:5000/api/room/addRoom', form_Data);
          console.log(response.data);
          history('/AllRoom');
        } catch (error) {
          console.error(error);
        }
        // Reset form fields
        setName('');
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
            <form onSubmit={handleSubmit} >
              <label>
                Room Name:
                <input type="text" value={name} onChange={(e)=>{
                    setName(e.target.value);
                }} />
              </label>
              <br />
              <label>
                description:
                <input type="text" value={description} onChange={(e)=>{
                    setDescription(e.target.value);
                }} />
              </label>
               <br />
              <button type="submit" className='btn btn-primary'>Submit</button>
            </form>
          </div>
          
        </div>
      </div>
    
    </>
  )
}

export default Addroom