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

function AddStaff() {
      const history = useNavigate ();
      const[data,setData]=useState([]);

      const { schoolId,apiurl } = useContext(ContextData);
      const [name, setName] = useState('');
      const [contact, setContact] = useState('');
      const [email, setEmail] = useState('');
      const [username, setUsername] = useState('');
      const [designation, setDesignation] = useState('');
      const [classId, setClassId] = useState('');
      const [image, setImage] = useState(null);
      const [gender, setGender] = useState('');

      useEffect(() => {
        fetchData();  
      },[]);
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiurl}/api/room/roomBySchoolId?id=${schoolId}`);
                console.log(response.data.data);
                setData(response.data.data);
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
            formData.append('email', email);
            formData.append('designation', designation);
            formData.append('schoolId',schoolId);
            formData.append('classId',classId);
            formData.append('picUrl', image);
            formData.append('username', username);
            formData.append('gender', gender);
            
            try {
                const response = await axios.post(`${apiurl}/api/staff/addStaff`, formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                });
                console.log(response.data);
                history('/AllStaff');
              } catch (error) {
                console.error(error);
              }
              

        }
  
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
                          <div className="formgroup">
                            <label>
                              Name:
                              <input type="text" value={name} onChange={(e)=>{
                                  setName(e.target.value);
                              }} placeholder="Name" required/>
                            </label>
                          </div>
                          <div className="formgroup">  
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
                          <div className="formgroup">  
                            <label>
                                Room ID:
                                <select value={classId}  onChange={(e)=>{
                                  setClassId(e.target.value);
                                }} placeholder="Room Id" required>
                                  <option value=""> Select </option>
                                  {data.map((option, index) => (
                                      <option key={index} value={option.id}>
                                        {option.name}
                                      </option>
                                    ))}
                                </select>
                              </label>
                          </div>
                          <div className="formgroup">  
                              <label>
                                Gender:
                                <input
                                  type="text"
                                  value={gender}
                                  onChange={(e)=>{
                                    setGender(e.target.value);
                                  }} placeholder="gender" required
                                />
                              </label>
                          </div>
                      </div>
                      
                      <div className="col-md-6">
                          <div className="formgroup">
                              <label>
                                Contact:
                                <input type="text" value={contact} onChange={(e)=>{
                                    setContact(e.target.value);
                                }} placeholder="Contact" required/>
                              </label>
                          </div>
                          <div className="formgroup">
                              <label>
                                Designation:
                                <input type="text" value={designation} onChange={(e)=>{
                                    setDesignation(e.target.value);
                                }} placeholder="Designation" required />
                              </label>
                          </div>
                          <div className="formgroup">
                             <label>
                                Username:
                                <input type="text" value={username} onChange={(e)=>{
                                    setUsername(e.target.value);
                                }} placeholder="Username" required />
                              </label>
                          </div>
                      </div>
                  </div>
              </div>
              <br/>
              <button type="submit" className='btn btn-primary'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddStaff