import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink,useNavigate, Link,useParams } from 'react-router-dom';
import ContextData from '../../Context/ContextData';


function EditParent() {
    const history = useNavigate ();

    const urlSearchParams = new URLSearchParams(window.location.search);
    // Get the value of the "id" variable
    const id = urlSearchParams.get('id');
    console.log('Parent ID ',id);

    const {schoolId,apiurl}=useContext(ContextData);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const[username,setUsername]=useState('');
    const[password,setPassword]=useState('');
    const [gender, setGender] = useState('');
    const [relation, setRelation] = useState('');

    useEffect(() => {
        fetchData();  
      },[]);
    const fetchData = async () => {
        try {
            if(schoolId==""){
                history('/Schoollist');
            }else{
                try {
                    const response = await axios.get(`${apiurl}/api/parent/ParentById?id=${id}`);
                    console.log('=---',response?.data?.data.parent);
                    setName(response?.data?.data.parent[0].name);
                    setContact(response?.data?.data.parent[0].contact);
                    setEmail(response?.data?.data.parent[0].email);
                    setUsername(response?.data?.data.parent[0].username);
                    setPassword(response?.data?.data.parent[0].password);
                    setGender(response?.data?.data.parent[0].gender);
                    setRelation(response?.data?.data.parent[0].relation);
                  } catch (error) {
                    console.error(error);
                  }

            }
            console.log('sub Admin School Id ',schoolId);
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit =async (event) => {
        event.preventDefault();
        if(schoolId!=""){
            //here we need to call the API to post the data to the backend server 
            const formData = new FormData();
            formData.append('name', name);
            formData.append('contact', contact);
            formData.append('email', email);
            formData.append('username', username);
            formData.append('password', password);
            formData.append('schoolId',schoolId);
            formData.append('gender',gender);
            formData.append('relation',relation);
            try {
            const response = await axios.put(`${apiurl}/api/parent/editParent?id=${id}`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            history('/AllParent');
            } catch (error) {
            console.error(error);
            }
        }else{
            history('/Schoollist');
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
                                Relation:
                                <input
                                  type="text"
                                  value={relation}
                                  onChange={(e)=>{
                                    setRelation(e.target.value);
                                  }} placeholder="Relation" required
                                />
                              </label>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="form-group">
                              <label>
                                Contact:
                                <input type="text" value={contact} onChange={(e)=>{
                                    setContact(e.target.value);
                                }} placeholder="Contact" required/>
                              </label>
                          </div>
                          <div className="form-group">
                             <label>
                                Gender:
                                <input
                                  type="text"
                                  value={gender}
                                  onChange={(e)=>{
                                    setGender(e.target.value);
                                  }} placeholder="Gender" required
                                />
                              </label>
                          </div>
                      </div>
                  </div>
              </div>
              <br />
              <button type="submit" className='btn btn-primary'>Update Record</button>
            </form>
          </div>
        </div>
      </div>   
    </>
  )
}

export default EditParent