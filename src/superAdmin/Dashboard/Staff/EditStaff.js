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

    const {id}=useParams("");
    
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
            const response = await axios.get(`http://localhost:5000/api/staff/staffById/${id}`);
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
            const respnse = await axios.get(`http://localhost:5000/api/staff/getRoombySchool/${schoolId}`);
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
        formData.append('logo', image);
        formData.append('userName', username);
        
        try {
            const response = await axios.post('http://localhost:5000/api/staff/addStaff', formData, {
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

export default EditStaff