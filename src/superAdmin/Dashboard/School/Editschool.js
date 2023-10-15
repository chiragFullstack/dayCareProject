import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useParams,useNavigate } from 'react-router-dom';
import ContextData from '../../Context/ContextData';

function Editschool() {

    const history = useNavigate ();
    const [id,setId]=useState();
    const { apiurl } = useContext(ContextData);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [bgcolor, setBgColorCode] = useState('');
    const [forecolor, setForeColorCode] = useState('');
    const [websiteUrl, setWebsiteURL] = useState('');
    const [image, setImage] = useState(null);

    //get all entries so we can show the record 
    const [data, setData] = useState([]);
    
    //when the page or event is loaded then this method will automatically called 
    useEffect(() => {
      fetchData();  
    },[]);

    const fetchData = async () => {
      try {
        const urlSearchParams = new URLSearchParams(window.location.search);
        // Get the value of the "id" variable
        const Sid = urlSearchParams.get('id');
        console.log('school Id',Sid);
        setId(Sid);
        const response = await axios.get(`${apiurl}/api/School/schoolById?id=${Sid}`);
        setData(response?.data?.data);
        console.log(response?.data?.data);
        setName(response?.data?.data[0].name);
        setAddress(response?.data?.data[0].address);
        setContact(response?.data?.data[0].contact);
        setEmail(response?.data?.data[0].email);
        setBgColorCode(response?.data?.data[0].bgcolor);
        setForeColorCode(response?.data?.data[0].forecolor);
        setWebsiteURL(response?.data?.data[0].websiteurl);
        setImage(response?.data?.data[0].logo);
      } catch (error) {
        console.error(error);
      }
    };

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
          const response = await axios.put(`${apiurl}/api/School/editSchool?id=${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(response.data);
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
        history('/Schoollist');
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
                          }} placeholder=" Address " required/>
                        </label>
                      </div>
                      <div className="form-group">
                         <label>
                          Website Url:
                          <input type="text" value={websiteUrl} onChange={(e)=>{
                              setWebsiteURL(e.target.value);
                          }} placeholder="website URL" required/>
                        </label>
                      </div>
                      <div className="form-group">  
                          <label>
                            Font Color Code
                            <input type="text" value={forecolor} onChange={(e)=>{
                                setForeColorCode(e.target.value);
                            }} placeholder="Font Color" required />
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
                            }}
                            placeholder="Email" required
                          />
                        </label>
                      </div>
                      <div className="form-group">
                        <label>
                            Background Color Code
                            <input type="text" value={bgcolor} onChange={(e)=>{
                                setBgColorCode(e.target.value); 
                            }} placeholder="background color" required />
                        </label>
                      </div>
                      <div className="form-group">
                        <label>
                          Image:
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e)=>{
                              const selectedImage = e.target.files[0];
                              setImage(selectedImage);
                            }} placeholder="Logo" required
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

export default Editschool