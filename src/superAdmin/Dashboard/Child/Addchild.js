import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink,useNavigate, Link } from 'react-router-dom';
import ContextData from '../../Context/ContextData';

function Addchild() {

    const {schoolId,parentId,apiurl}=useContext(ContextData);
    
    const history = useNavigate ();

    const [data,setData]=useState([]);
    const [name, setName] = useState('');
    const [dateofbirth, setDateofbirth] = useState('');
    const[image,setImage]=useState('');
    const[roomId,setRoomId]=useState('');
    const[gender,setGender]=useState('');
    useEffect(() => {
        fetchData();  
      },[]);

    const fetchData = async () => {
        try {
          console.log('sub Admin School Id ',schoolId,'---',parentId);
            if(schoolId=="" || parentId==""){
                history('/AllChild');
            }else{
                const response = await axios.get(`${apiurl}/api/room/roomBySchoolId?id=${schoolId}`);
                console.log(response.data.data);
                setData(response?.data?.data);
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit =async (event) => {
        event.preventDefault();

        //here we need to call the API to post the data to the backend server 
        const formData = new FormData();
        formData.append('name', name);
        formData.append('dateofbirth', dateofbirth);
        formData.append('schoolid',schoolId);
        formData.append('roomid',roomId);
        formData.append('parentid',parentId);
        formData.append('logo', image);
        formData.append('gender', gender);
        try {
            const response = await axios.post(`${apiurl}/api/student/addStudent`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log(response.data);
            history('/Allchild');
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
                          <div className="form-group">
                             <label>
                                Name:
                                <input type="text" value={name} onChange={(e)=>{
                                    setName(e.target.value);
                                }} placeholder="Name" required/>
                              </label>
                          </div>
                          <div className="form-group">
                               <label>
                                  Room Name:
                                  <select value={roomId} onChange={(e)=>{
                                    setRoomId(e.target.value);
                                  }} required placeholder="Room ID">
                                    <option>select</option>
                                    {data.map((option, index) => (
                                        <option key={index} value={option.id}>
                                          {option.name}
                                        </option>
                                      ))}
                                  </select>
                               </label>
                          </div>
                          <div className="form-group">
                             <label>
                                Gender:
                                <input type="text" value={gender} onChange={(e)=>{
                                    setGender(e.target.value);
                                }} placeholder="Sex" required/>
                              </label>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="form-group">
                             <label>
                                Date of Birth:
                                <input type="date" value={dateofbirth} onChange={(e)=>{
                                    setDateofbirth(e.target.value);
                                }} placeholder="Select Date of Birth" required  />
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
                                  />
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

export default Addchild