import React, { useState,useEffect,useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
  Outlet,
  useParams,
  Link,useNavigate
} from "react-router-dom";
import Leftmenu from "../Leftmenu";
import axios from 'axios';
import ContextData from '../../Context/ContextData';

function EditStaff() {

    const { schoolId } = useContext(ContextData);
    const history = useNavigate ();

    const urlSearchParams = new URLSearchParams(window.location.search);
    // Get the value of the "id" variable
    const Sid = urlSearchParams.get('id');
    const [id,setId]=useState(Sid);

    const[data,setData]=useState([]);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [designation, setDesignation] = useState('');
    const [password, setPassword] = useState('');
    const [classId, setClassId] = useState('');
    const [principalId, setPrincipalId] = useState('');
    const [image, setImage] = useState(null);
    
    useEffect(() => {
        if(schoolId==""){
            history('/Schoollist');
        }
        fetchData();  
    },[]);
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://daycare-tas4.onrender.com/api/staff/staffById?id=${id}`);
            console.log(response.data.data);
            setName(response?.data?.data[0].name);
            setContact(response?.data?.data[0].contact);
            setEmail(response?.data?.data[0].email);
            setDesignation(response?.data?.data[0].designation);
            setClassId(response?.data?.data[0].classid);
            setPrincipalId(response?.data?.data[0].principalid);
            setPassword(response?.data?.data[0].password);
            setImage(response?.data?.data[0].logo);
            setUsername(response?.data?.data[0].username);
            console.log('school id--',schoolId);
            const respnse = await axios.get(`http://54.172.2.94:5000/api/room/roomBySchoolId?id=${schoolId}`);
            console.log(respnse.data.data);
            setData(respnse.data.data);

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
        formData.append('principalId',principalId);
        formData.append('picUrl', image);
        formData.append('userName', username);
        try {
            const response = await axios.put(`http://54.172.2.94:5000/api/staff/editStaff?id=${id}`, formData, {
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
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e)=>{
                    setEmail(e.target.value);
                  }}
                />
              </label>
              <br/>
              <label>
                Designation:
                <input type="text" value={designation} onChange={(e)=>{
                    setDesignation(e.target.value);
                }} />
              </label>
              <br />
              <label>
                Room ID:
                <select value={classId}  className="form-control" onChange={(e)=>{
                  setClassId(e.target.value);
                }}>
                   {data.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.name}
                      </option>
                    ))}

                </select>
              </label>

              <label>
                Username:
                <input type="text" value={username} onChange={(e)=>{
                    setUsername(e.target.value);
                }} />
              </label>
              <br />
              <button className='btn btn-primary'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default EditStaff