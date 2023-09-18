import React, { useState,useEffect,useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
  Outlet,
  Link,useNavigate
} from "react-router-dom";
import Leftmenu from "../Leftmenu";
import axios from 'axios';
import ContextData from '../../Context/ContextData';

function Subadmin() {

  const history = useNavigate ();
  const { schoolId } = useContext(ContextData);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [schoolid, setSchoolId] = useState('');
    const [image, setImage] = useState(null);

    //this method can be used to generate random password 
    function generateRandomPassword(length) {
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
      let password = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
      }
      return password;
    }
    useEffect(() => {
      fetchData();  
    },[]);
      const fetchData = async () => {
          try {
              console.log('sub Admin School Id ',schoolId);
          } catch (error) {
              console.error(error);
          }
      }

      const handleSubmit =async (event) => {
        event.preventDefault();

        //here we need to call the API to post the data to the backend server 
        const formData = new FormData();
        formData.append('name', name);
        formData.append('contact', contact);
        formData.append('address', address);
        formData.append('email', email);
        formData.append('username', username);
        formData.append('schoolid',schoolId);
        formData.append('picurl', image);

        try {
          const response = await axios.post('https://daycare-tas4.onrender.com/api/subadmin/addSubadmin', formData, {
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

export default Subadmin