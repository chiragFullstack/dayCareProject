import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
  Outlet,
  Link,
} from "react-router-dom";
import Leftmenu from "./Leftmenu";


function Subadmin() {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [schoolId, setSchoolId] = useState('');

    const [image, setImage] = useState(null);
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // Perform form submission logic here, e.g., send data to the server
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Image:', image);
        // Reset form fields
        setName('');
        setEmail('');
        setImage(null);
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
            <form onSubmit={handleSubmit}>
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
                Password:
                <input type="password" value={password} onChange={(e)=>{
                    setPassword(e.target.value);
                }} />
              </label>
              <br />
              <label>
                School Name:
                <input type="text" value={schoolId} onChange={(e)=>{
                    setSchoolId(e.target.value);
                }} />
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
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Subadmin