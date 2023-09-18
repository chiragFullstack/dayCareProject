import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import ContextData from '../../Context/ContextData';

import { BrowserRouter as Router, Routes, Route, NavLink, Link,useParams,useNavigate } from 'react-router-dom';

function EditSubadmin() {
  
  const { schoolId } = useContext(ContextData);
  
    const history = useNavigate ();
    const urlSearchParams = new URLSearchParams(window.location.search);
    // Get the value of the "id" variable
    const Sid = urlSearchParams.get('id');
    const [id,setId]=useState(Sid);

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [schoolid, setSchoolId] = useState('');
    const [image, setImage] = useState(null);
    const [username, setUsername] = useState('');
    const [data, setData] = useState([]);
    const [schooldata, setSchoolData] = useState([]);
    useEffect(() => {
      fetchData();  
    },[]);

    const fetchData = async () => {
          try {
              console.log('edit sub admin',schoolId);
              const response = await axios.get(`https://daycare-tas4.onrender.com/api/subadmin/getSubadminById?id=${id}`);
              console.log(response?.data?.data);
              setData(response?.data?.data);
              setName(response?.data?.data[0].name);
              setContact(response?.data?.data[0].contact);
              setAddress(response?.data?.data[0].address);
              setUsername(response?.data?.data[0].username);
              setEmail(response?.data?.data[0].email);
              setPassword(response?.data?.data[0].password);
              setSchoolId(schoolId);
              setImage(response?.data?.data[0].picurl);
          } catch (error) {
              console.error(error);
          }
      }

      const handleSubmit =async (event) => {
        event.preventDefault();
        console.log('edit sub admin----',schoolId);
        //here we need to call the API to post the data to the backend server 
        const formData = new FormData();
        formData.append('name', name);
        formData.append('contact', contact);
        formData.append('address', address);
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('schoolId',schoolId);
        formData.append('picurl', image);  
        try {
          const response = await axios.put(`https://daycare-tas4.onrender.com/api/subadmin/editSubadmin?id=${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(response.data);
          history('/SubadminList');
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
                Address:
                <input type="text" value={address} onChange={(e)=>{
                    setAddress(e.target.value);
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
              <label>
                Image:
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e)=>{
                    const selectedImage = e.target.files[0];
                    setImage(selectedImage);
                  }}
                />
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

export default EditSubadmin