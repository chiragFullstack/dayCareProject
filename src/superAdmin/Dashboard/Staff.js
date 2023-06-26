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

function Staff() {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [designation, setDesignation] = useState('');
    const [principalId, setPrincipalId] = useState('');
    const [schoolId, setSchoolId] = useState('');
    const [classId, setClassId] = useState('');
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
          <p className="logo pb-2">BREES</p>
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
                Designation:
                <input type="text" value={designation} onChange={(e)=>{
                    setDesignation(e.target.value);
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
                Principal Name:
                <input type="text" value={principalId} onChange={(e)=>{
                    setPrincipalId(e.target.value);
                }} />
              </label>
              <br />
              <label>
                Class:
                <input type="text" value={classId} onChange={(e)=>{
                    setClassId(e.target.value);
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
  );
}

export default Staff;
