import  { useState,useEffect,useContext,React  } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import ContextData from '../../Context/ContextData';
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useParams,useNavigate } from 'react-router-dom';

function ParentDetails() {
    const history = useNavigate ();
    const {id}=useParams("");
    const { schoolId, setSchoolId,parentId,setParentId } = useContext(ContextData);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    setParentId(id);
   console.log('parent_Id',parentId);
      //when the page or event is loaded then this method will automatically called 
      useEffect(() => {
        fetchData();  
      },[]);

      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/Parent/ParentById/${id}`);
          console.log(response.data.data);
            setName(response?.data?.data[0].name);
            setContact(response?.data?.data[0].contact);
            setEmail(response?.data?.data[0].email);   
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
                <h1>Parent Detail</h1>     
                <h2>Name: {name}</h2>
                <p>Contact: {contact}</p>
                <p>Email: {email}</p>
          </div>
          <br/><br/>
          <Link to={`/Allchild`} className="section m-3"> Manage Child </Link>
          </div>
          <div>
        
          </div>
        </div>
      </div>
    </>
  )
}

export default ParentDetails