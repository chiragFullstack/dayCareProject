
import  { useState,useEffect,useContext,React  } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import ContextData from '../../Context/ContextData';

import { BrowserRouter as Router, Routes, Route, NavLink, Link,useParams,useNavigate } from 'react-router-dom';

function Schooldetails() {
    const history = useNavigate ();
    const {id}=useParams("");
    const { schoolId, setSchoolId } = useContext(ContextData);
    const [_id, setId] = useState('');

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [bgcolor, setBgColorCode] = useState('');
    const [forecolor, setForeColorCode] = useState('');
    const [websiteUrl, setWebsiteURL] = useState('');
    const [image, setImage] = useState(null);
      //when the page or event is loaded then this method will automatically called 
      useEffect(() => {
        fetchData();  
      },[]);

      const fetchData = async () => {
        try {
          
         setSchoolId(id);
        console.log('school_Id',id);

          const response = await axios.get(`http://localhost:5000/schoolById/${id}`);
          console.log(response.data.data);
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
  return (
    <>
    <div className="maiv-div-box" >
        <div className="right-box fullWidth">
          <div className="db-content-display">
            <div className="allRecord">
                <h1>School Detail</h1> 
                
                <h2>Name: {name}</h2>
                <p>Website Name: {websiteUrl}</p>
                <p>Logo : {image}</p>
                <img src={image}/>
          </div>
          <Link to={`/SubadminList`} className="section m-3"> Add Sub Admin </Link>
          <Link to={`/AllRoom`} className="section m-3"> Add Rooms </Link>
          </div>
          <div>
        
          </div>
        </div>
      </div>
    </>
  )
}

export default Schooldetails