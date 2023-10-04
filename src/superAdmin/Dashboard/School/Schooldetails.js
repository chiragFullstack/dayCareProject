
import  { useState,useEffect,useContext,React  } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import ContextData from '../../Context/ContextData';
import school from '../../../Assets/school.jpg';
import phone from '../../../Assets/phone.png';
import mail_icon from '../../../Assets/mail-icon.png';
import school_icon from '../../../Assets/school_icon.png';
import address_icon from '../../../Assets/address_icon.png';
import room_icon from '../../../Assets/room_icon.png';
import admin_icon from '../../../Assets/admin_icon.png';
import staff_icon from '../../../Assets/staff_icon.png';
import parent_icon from '../../../Assets/parnet_icon.png';
import service_icon from '../../../Assets/service_icon.png';



import { BrowserRouter as Router, Routes, Route, NavLink, Link,useParams,useNavigate } from 'react-router-dom';

function Schooldetails() {
    const history = useNavigate ();
    const urlSearchParams = new URLSearchParams(window.location.search);
    // Get the value of the "id" variable
    const Sid = urlSearchParams.get('id');
    const { schoolId, setSchoolId } = useContext(ContextData);
    const [id, setId] = useState(Sid);
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
          const response = await axios.get(`http://54.172.2.94:5000/api/School/schoolById?id=${id}`);
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
      
<div className="maiv-div-box">
        <div className="sidebar">
          <p className="logo pb-2">Daycare</p>
          <hr className="" />
          <Leftmenu/>
        </div>
        <div className="right-box p-md-0 p-2 m-1">
          <div className="db-content-display border p-0 h-100">
            <div className="allRecord">
               
            <div class="row card-img-top  pt-4 p-3 m-0 w-100">
              <div className="m-auto">
                <img src={school} className="card-img-top" alt="..." />
              </div>
              <div className="">
                  <div className="row school-detail-sec">
                    <div className="col-lg-12 mb-3">
                      <h5 className="mb-3 text-center">{name}</h5><hr/>                      
                    </div>
                    <div className="col-lg-4">
                      <p className="mb-2 text-center"><img src={phone} />{contact}</p>                      
                    </div>
                    <div className="col-lg-4">
                      <p className="mb-2 text-center"><img src={mail_icon} /> {email}</p>
                    </div>
                    <div className="col-lg-4">
                    <p className="mb-2 text-center"><img src={address_icon} /> {address}</p>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap justify-content-between five-school-btn mt-4">
                    <Link to={`/SubadminList`} className=" ">< img src={admin_icon}/> Admin </Link>                    
                    <Link to={`/AllRoom`} className="  "> <img src={room_icon}/>Rooms </Link>
                    <Link to={`/AllStaff`} className="  ">< img src={staff_icon}/>  Staff </Link>
                    <Link to={`/AllParent`} className="  "> < img src={parent_icon}/> Parent  </Link>
                    <Link to={`/AllClaimedService`} className="  ">< img src={service_icon}/> Services </Link>
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

export default Schooldetails