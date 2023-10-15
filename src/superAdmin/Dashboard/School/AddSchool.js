import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useNavigate  } from 'react-router-dom';
import ContextData from '../../Context/ContextData';

function AddSchool() {
    
    const history = useNavigate ();
    const { apiurl } = useContext(ContextData);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [bgcolor, setBgColorCode] = useState('');
    const [forecolor, setForeColorCode] = useState('');
    const [websiteUrl, setWebsiteURL] = useState('');
    const [image, setImage] = useState(null);
   
    //calling the method 
      const handleSubmit = async (event) => {
        event.preventDefault();

        //here we need to call the API to post the data to the backend server 
        const formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        formData.append('contact', contact);
        formData.append('email', email);
        formData.append('bgcolor', bgcolor);
        formData.append('forecolor',forecolor);
        formData.append('logo', image);
        formData.append('websiteurl', websiteUrl);
        try {
          const response = await axios.post(`${apiurl}/api/School/addSchool`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(response.data);
          history('/Schoollist');
        } catch (error) {
          console.error(error);
        }
        // Reset form fields
        setName('');
        setEmail('');
        setImage(null);
        setAddress('');
        setContact('');
        setBgColorCode('');
        setForeColorCode('');
        setWebsiteURL('');
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
                            Name:
                            <input type="text" value={name} onChange={(e)=>{
                                setName(e.target.value);
                            }} placeholder="Name" required />
                          </label>
                      </div>
                      <div className="form-group">
                            <label>
                              Address:
                              <input type="text" value={address} onChange={(e)=>{
                                  setAddress(e.target.value);
                              }}  placeholder="Address" required/>
                            </label>
                      </div>
                      <div className="form-group">
                          <label>
                            Website Url:
                            <input type="text" value={websiteUrl} onChange={(e)=>{
                                setWebsiteURL(e.target.value);
                            }} placeholder="Website URL "  required />
                          </label>
                      </div>
                      <div className="form-group">
                          <label>
                            Font Color Code
                            <input type="text" value={forecolor} onChange={(e)=>{
                                setForeColorCode(e.target.value);
                            }} placeholder="Font Color " required />
                          </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                         <label>
                            Contact:
                            <input type="text" value={contact} onChange={(e)=>{
                                setContact(e.target.value);
                            }} placeholder="Contact" required />
                          </label>
                      </div>
                      <div className="form-group">
                          <label>
                            Email:
                            <input
                              type="email"
                              value={email}
                              onChange={(e)=>{
                                setEmail(e.target.value);
                              }} placeholder="Email" required
                            />
                          </label>
                      </div>
                      <div className="form-group">
                        <label>
                          Background Color Code
                          <input type="text" value={bgcolor} onChange={(e)=>{
                              setBgColorCode(e.target.value);
                          }} placeholder="Background Color" required/>
                        </label>
                      </div>
                      <div className="form-group">
                        <label>
                          Upload Image:
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e)=>{
                              const selectedImage = e.target.files[0];
                              setImage(selectedImage);
                            }}
                           placeholder="Logo" required/>
                        </label>
                      </div>
                    </div>
                  </div>
              </div>
              <br />
              <button type="submit" className='btn btn-primary'>Submit</button>
            </form>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default AddSchool