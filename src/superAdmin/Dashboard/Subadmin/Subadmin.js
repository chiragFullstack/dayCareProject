import React, { useState,useEffect } from "react";
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

function Subadmin() {

  const history = useNavigate ();

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
    
    const [data, setData] = useState([]);
    useEffect(() => {
      fetchData();  
    },[]);
      const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:5000/allSchool');
              setData(response?.data?.data);
              
              const password = generateRandomPassword(12);
              setPassword(password);
              console.log('Generated Password:', password);

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
        formData.append('password', password);
        formData.append('schoolid',schoolid);
        formData.append('picurl', image);

        try {
          const response = await axios.post('http://localhost:5000/api/subadmin/addSubadmin', formData, {
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
                School Name: <br/>
                <select value={schoolid}  className="form-control" onChange={(e)=>{
                  setSchoolId(e.target.value);
                }}>
                   {data.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                </select>
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