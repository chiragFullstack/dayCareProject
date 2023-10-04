import  { useState,useEffect,useContext,React  } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import ContextData from '../../Context/ContextData';
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useParams,useNavigate } from 'react-router-dom';
import child from '../../../Assets/child.png';
import profile from '../../../Assets/profile.png';
import phone from '../../../Assets/phone.png';
import mail_icon from '../../../Assets/mail-icon.png';
import user_icon from '../../../Assets/user.png';

function ParentDetails() {
    const history = useNavigate ();
   
    const urlSearchParams = new URLSearchParams(window.location.search);
    // Get the value of the "id" variable
    const id = urlSearchParams.get('id');
    console.log('Parent ID ',id);
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
          const response = await axios.get(`http://54.172.2.94:5000/api/parent/ParentById?id=${id}`);
          console.log(response.data.data?.parent[0].name);
            setName(response?.data?.data?.parent[0].name);
            setContact(response?.data?.data?.parent[0].contact);
            setEmail(response?.data?.data?.parent[0].email);   
        } catch (error) {
          console.error(error);
        }
      };
    return (
    <>
    <div className="maiv-div-box">
        <div className="sidebar">
          <p className="logo pb-2">Daycare</p>
          <hr className="" />
          <Leftmenu/>
        </div>
        <div className="right-box">
          <div className="db-content-display h-100">
            <div className="allRecord">
               
            <div class="parent_profile_card rounded border text-center m-auto p-4" >
              <img src={profile} className="parent-pro-img w-100 px-4 pb-4 mb-1" alt="..." />
              <div className="d-flex flex-wrap justify-content-start">
                <h5 className="card-title w-100 pb-2 mb-2">{name}</h5>
                <p className="card-text w-100 text-start"><img src={phone} />{contact}</p>
                <p className="card-text w-100 text-start"><img src={mail_icon} /> {email}</p>
                <div className="pt-2 parent-child-btn">
                  <Link to={`/Allchild`} className="section m-1" style={{ padding:"10px !important" }}>
                  <img src={child} />Child </Link>
                </div>
              </div>
            </div>     
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ParentDetails