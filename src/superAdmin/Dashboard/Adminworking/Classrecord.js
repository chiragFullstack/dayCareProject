import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useNavigate  } from 'react-router-dom';
import ContextData from "../../Context/ContextData";
import add from '../../../Assets/add.png';

function Classrecord() {
    const { schoolId,loginType,apiurl} = useContext(ContextData);
    const [data, setData] = useState([]);
    const history = useNavigate ();
    const [totalclass,setTotalClass]=useState(0);
    const [totalchild,setTotalChild]=useState(0);
    const [avg,setAvg]=useState(0.0);
    //when the page or event is loaded then this method will automatically called 
    useEffect(() => {
        console.log('sub Admin ID: ',schoolId);
      fetchData();  
    },[]);
   
    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiurl}/api/Dashboard/classData?schoolId=${schoolId}`);
            setData(response?.data?.data);
            console.log('class record=--',response?.data?.data[0].classCount);
             setTotalClass(response?.data?.data[0].classCount);
             setTotalChild(response?.data?.data[1].studentCount);
            // setAddress(response?.data?.data[0].address);
        } catch (error) {
          console.error(error); 
        }
    };
  return (
    <>
    <div className='viewdata'>
        <table className="table table-striped table-hover">
            <tr>
                <td>Class Rooms</td>
                <td>{totalclass}</td>
            </tr>
            <tr>
                <td>Total Active Students</td>
                <td>{totalchild}</td>
            </tr>
            <tr>
                <td>Students Per Class</td>
                <td>{totalchild/totalclass}</td>
            </tr>
            <tr>
                <td>Parents Per Student</td>
                <td>{totalchild}/{totalchild}</td>
            </tr>
        </table>
        <Link to={`/AllRoom`} className="btn btn-warning">Add Room </Link>
    </div>
    </>
  )
}

export default Classrecord