import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink,useNavigate, Link } from 'react-router-dom';
import ContextData from '../../Context/ContextData';

function AddParent() {

    const {schoolId}=useContext(ContextData);

    const history = useNavigate ();

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    
    useEffect(() => {
        fetchData();  
      },[]);
    const fetchData = async () => {
        try {
            if(schoolId==""){
                history('/AllParent');
            }
            console.log('sub Admin School Id ',schoolId);
        } catch (error) {
            console.error(error);
        }
    }
  
    const handleSubmit =async (event) => {
        event.preventDefault();
        if(schoolId!=""){
            //here we need to call the API to post the data to the backend server 
            const formData = new FormData();
            formData.append('name', name);
            formData.append('contact', contact);
            formData.append('email', email);
            formData.append('username', username);
            formData.append('schoolId',schoolId);

            try {
            const response = await axios.post('http://localhost:5000/api/Parent/addParent', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            history('/AllParent');
            } catch (error) {
            console.error(error);
            }
        }else{
            history('/Schoollist');
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
              <label>
                Name:
                <input type="text" value={name} onChange={(e)=>{
                    setName(e.target.value);
                }} />
              </label>
              <br />
              <label>
                Contact:
                <input type="text" value={contact} onChange={(e)=>{
                    setContact(e.target.value);
                }} />
              </label>
              <br />
              <label>
                Email:
                <input type="text" value={email} onChange={(e)=>{
                    setEmail(e.target.value);
                }} />
              </label>
              <br />
              <label>
                Username:
                <input type="text" value={username} onChange={(e)=>{
                    setUsername(e.target.value);
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

export default AddParent