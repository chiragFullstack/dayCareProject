import React, { useState,useEffect } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useParams,useNavigate } from 'react-router-dom';

function EditSubadmin() {

    const history = useNavigate ();
    const {id}=useParams("");

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [schoolid, setSchoolId] = useState('');
    const [image, setImage] = useState(null);
    const [data, setData] = useState([]);
    const [schooldata, setSchoolData] = useState([]);
    useEffect(() => {
      fetchData();  
    },[]);
      const fetchData = async () => {
          try {
              const response = await axios.get(`http://localhost:5000/api/subadmin/getSubadminById/${id}`);
              console.log(response?.data?.data);
              setData(response?.data?.data);
              setName(response?.data?.data[0].name);
              setContact(response?.data?.data[0].contact);
              setAddress(response?.data?.data[0].address);
              setEmail(response?.data?.data[0].email);
              setPassword(response?.data?.data[0].password);
              setSchoolId(response?.data?.data[0].schoolid);
              setImage(response?.data?.data[0].picurl);

            const res =  await axios.get('http://localhost:5000/allSchool');
            console.log("all School Data ",res?.data?.data);
            setSchoolData(res?.data?.data);

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
                   {schooldata.map((option, index) => (
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

export default EditSubadmin