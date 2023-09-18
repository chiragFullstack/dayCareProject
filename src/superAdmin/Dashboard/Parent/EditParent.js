import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink,useNavigate, Link,useParams } from 'react-router-dom';
import ContextData from '../../Context/ContextData';


function EditParent() {
    const history = useNavigate ();

    const urlSearchParams = new URLSearchParams(window.location.search);
    // Get the value of the "id" variable
    const id = urlSearchParams.get('id');
    console.log('Parent ID ',id);


    const {schoolId}=useContext(ContextData);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const[username,setUsername]=useState('');
    const[password,setPassword]=useState('');

    useEffect(() => {
        fetchData();  
      },[]);
    const fetchData = async () => {
        try {
            if(schoolId==""){
                history('/Schoollist');
            }else{
                try {
                    const response = await axios.get(`https://daycare-tas4.onrender.com/api/parent/ParentById?id=${id}`);
                    console.log(response?.data?.data);
                    setName(response?.data?.data[0].name);
                    setContact(response?.data?.data[0].contact);
                    setEmail(response?.data?.data[0].email);
                    setUsername(response?.data?.data[0].username);
                    setPassword(response?.data?.data[0].password);
                  } catch (error) {
                    console.error(error);
                  }

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
            formData.append('password', password);
            formData.append('schoolId',schoolId);

            try {
            const response = await axios.put(`https://daycare-tas4.onrender.com/api/parent/editParent?id=${id}`, formData, {
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
          <p className="logo pb-2">Daycare</p>
          <hr className="" />
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
                <input
                  type="email"
                  value={email}
                  onChange={(e)=>{
                    setEmail(e.target.value);
                  }}
                />
              </label>
              <br />
              
              <button type="submit" className='btn btn-primary'>Update Record</button>
            </form>
          </div>
        </div>
      </div>   
    </>
  )
}

export default EditParent