import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useNavigate  } from 'react-router-dom';
import ContextData from "./Context/ContextData";
import log from '../Assets/logo.jpg';
import slide1 from '../Assets/slide1.jpg';
import slide2 from '../Assets/slide2.jpg';
import slide3 from '../Assets/slide3.jpg';
import logo from '../Assets/logo.jpeg';

function AdminLogin() {
    const { loginType, setLoginType,apiurl } = useContext(ContextData);
    const {schoolId , setSchoolId } = useContext(ContextData);
    const {principalId, setPrincipalId}=useContext(ContextData);
    const {parentId, setParentId}=useContext(ContextData);

    const history = useNavigate ();
    const [username, setUserName] = useState('');
    const [userpassword, setUserPassword] = useState('');
    const [userError, setUserError] = useState('') // useState to store First Name

    const handleSubmit = async (event) => {
        event.preventDefault();
        //here we need to call the API to post the data to the backend server 
        const form_Data = new FormData();
        form_Data.append('username', username);
        form_Data.append('password', userpassword);
        form_Data.append('devicetype','Browser');
        form_Data.append('devicetoken','Computer');
        try {
          const response = await axios.post(`${apiurl}/api/checkLogin`, 
          //const response = await axios.post('http://localhost:5000/api/checkLogin', 
          form_Data,{
            headers: {'Content-Type': 'multipart/form-data'},
          });
          
          if(response.data!=null){
            console.log(response.data.data);
            setLoginType(response.data?.data[0]?.usertype);
            setPrincipalId(response.data?.data[0]?.id);
            setSchoolId(response.data?.data[0]?.schoolid);
            setParentId(response.data?.data[0]?.id);
            if(response.data?.data[0]?.usertype=='super admin'){
              history('/Schoollist');
            }else if(response.data?.data[0]?.usertype=='admin'){
              console.log('admin matched');
              setParentId(response.data?.data[0]?.id);
              history('/Adminprofile');
            }else if(response.data?.data[0]?.usertype=='staff'){
              history('/AllRoom');
            }else if(response.data?.data[0]?.usertype=='parent'){
              setParentId(response.data?.data[0]?.id);
              console.log('parent Login Type==',loginType);
              history('/searchReport');
            }

          }else{
            setUserError('Invalid User Name or Password');
          }
        } catch (error) {
          console.error(error.message);
          setUserError('Invalid User Name or Password');
        }
        // Reset form fields
        setUserName('');
        setUserPassword('');
      };
  return (
    <>
         <div className="row login m-0">
                <div className='col-md-6'>
                  <div id="carouselExampleSlidesOnly" className=" h-100 carousel slide h-100" data-bs-ride="carousel">
                    <div className="carousel-inner h-100">
                      <div className="carousel-item active h-100">
                        <img src={slide1} className='d-block w-100 h-100 object-fit-cover'/>
                      </div>
                      <div className="carousel-item h-100">
                        <img src={slide2} className='d-block w-100 h-100 object-fit-cover'/>
                      </div>
                      <div className="carousel-item h-100">
                        <img src={slide3} className=' h-100 d-block w-100'/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 d-flex flex-wrap flex-column justify-content-center' style={{zIndex: '9', background: 'rgb(245 255 255)'}}>
                    <div className='container mt-3 db-content-display-login'>
                      <img src={logo} height="100px" width="100px"/>
                    <h1 className='login-heading'>Login</h1>
                    <form onSubmit={handleSubmit} encType='multiplart/form-data'>
                    <label>
                            User Name:
                            <input type="text" value={username} onChange={(e)=>{
                                setUserName(e.target.value); 
                            }} placeholder="User Name" required/>
                        </label>
                        <br />
                        <label>
                            Password:
                            <input type="password" value={userpassword} onChange={(e)=>{
                                setUserPassword(e.target.value);
                            }} placeholder="Password" required />
                        </label>
                        <br />                        
                        <button type="submit" className='btn btn-primary button'>Submit</button>
                        <span className="error">{userError}</span>
                    </form>
                    </div>
                </div>
            </div>
    </>
  )
}

export default AdminLogin