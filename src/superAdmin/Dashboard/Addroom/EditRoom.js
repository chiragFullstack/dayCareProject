import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink,useParams, Link,useNavigate  } from 'react-router-dom';
import ContextData from "../../Context/ContextData";

function EditRoom() {
  
    const {schoolId}=useContext(ContextData);

    const {id}=useParams("");
    const [_id, setId] = useState('');

    const history = useNavigate ();
    const [name, setName] = useState('');
    const [schoolid, setSchoolId] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
      fetchData();  
    },[]);

      const fetchData = async () => {
          try {
              const Roomresponse = await axios.get(`http://localhost:5000/api/room/roomById/${id}`);
              console.log(Roomresponse);
              setName(Roomresponse?.data?.data[0].name);
              setDescription(Roomresponse?.data?.data[0].description);     
          } catch (error) {
              console.error(error);
          }
      }

       //calling the method 
       const handleSubmit = async (event) => {
        event.preventDefault();

        //here we need to call the API to post the data to the backend server 
        const formData = new FormData();
        formData.append('name', name);
        formData.append('schoolId', schoolId);
        formData.append('description', description);
        try {
          const response = await axios.put(`http://localhost:5000/api/room/editroom/${id}`,formData);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
        // Reset form fields
        setName('');
        setDescription('');
        setSchoolId('');
        history('/Allroom');
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

export default EditRoom