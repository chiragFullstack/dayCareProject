import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink,useNavigate, Link,useParams } from 'react-router-dom';
import ContextData from '../../Context/ContextData';


function Editchild() {
    const history = useNavigate ();
    const [data,setData]=useState([]);

    const urlSearchParams = new URLSearchParams(window.location.search);
    // Get the value of the "id" variable
    const id = urlSearchParams.get('id');
    
    const {schoolId,parentId}=useContext(ContextData);
    const [name, setName] = useState('');
    const [dateofbirth, setDateofbirth] = useState('');
    const[roomId,setRoomId]=useState('');
    const[image,setImage]=useState('');

    useEffect(() => {
        fetchData();  
      },[]);
    function formatDate(date) {
        const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    const fetchData = async () => {
        try {
            if(schoolId=="" || parentId==""){
                history('/AllChild');
            }else{
              console.log('Child ID ',id);
                const response = await axios.get(`https://daycare-tas4.onrender.com/api/student/getStudentById?id=${id}`);
                console.log(response.data.data);
                setName(response.data.data[0].name);
                setDateofbirth(formatDate(response.data.data[0].dateofbirth));
                setRoomId(response.data.data[0].roomid);
                setImage(response.data.data[0].picurl);

                const respnse = await axios.get(`https://daycare-tas4.onrender.com/api/room/roomBySchoolId?id=${schoolId}`);
                console.log(respnse.data.data);
                setData(respnse?.data?.data);
                
            }
            console.log('sub Admin School Id ',schoolId,'---',parentId);
        } catch (error) {
            console.error(error);
        }
    }
    const handleSubmit=async(event)=>{
        event.preventDefault();
        //here we need to call the API to post the data to the backend server 
        const formData = new FormData();
        formData.append('name', name);
        formData.append('dateofbirth', dateofbirth);
        formData.append('schoolid',schoolId);
        formData.append('roomid',roomId);
        formData.append('parentid',parentId);
        formData.append('logo', image);
        try {
            const response = await axios.put(`https://daycare-tas4.onrender.com/api/student/editStudent?id=${id}`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            history('/AllChild');
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
              <label>
                Name:
                <input type="text" value={name} onChange={(e)=>{
                    setName(e.target.value);
                }} />
              </label>
              <br />
              <label>
                Date of Birth:
                <input type="text" value={dateofbirth} onChange={(e)=>{
                    setDateofbirth(e.target.value);
                }} />
              </label>
              <br />
              <label>
                Room Name:
                 <select value={roomId}  className="form-control" onChange={(e)=>{
                  setRoomId(e.target.value);
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
              <button type="submit" className='btn btn-primary'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Editchild