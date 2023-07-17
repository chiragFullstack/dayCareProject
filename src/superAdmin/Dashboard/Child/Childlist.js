import  { useState,useEffect,useContext,React  } from "react";
import axios from 'axios';
import Leftmenu from "../Leftmenu";
import ContextData from '../../Context/ContextData';
import { BrowserRouter as Router, Routes, Route, NavLink, Link,useParams,useNavigate } from 'react-router-dom';


function Childlist() {
  
    //get all entries so we can show the record 
    const [data, setData] = useState([]);
    const history = useNavigate ();
    const { schoolId, setSchoolId,parentId,setParentId } = useContext(ContextData);
    //when the page or event is loaded then this method will automatically called 
    useEffect(() => {
      fetchData();  
      if(parentId==""){
        history('/Allchild');
      }
    },[]);
    function formatDate(date) {
        const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    const fetchData = async () => {
      try {
        console.log('Parent ID ',parentId);
        const response = await axios.get(`http://localhost:5000/api/student/getStudentByParentId/${parentId}`);
        setData(response?.data?.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    async function deleteChild(id){
        console.log(id);
        await axios.delete(`http://localhost:5000/api/student/deleteStudent/${id}`);
        fetchData();  
    }

  return (
    <>
     <div className="maiv-div-box">
        <div className="sidebar">
          <p className="logo pb-2">Daycare</p>
          <hr className="" />
          <Leftmenu/>
        </div>
        <div className="right-box">
          <div className="db-content-display">
          <Link to={`/AddChild`} className="btn btn-primary"> Add Child </Link>
          <br/><br/>
            <div className="allRecord">
                 <h1>View Child Details </h1> 
                 <table className="table table-border">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date of Birth</th>
                        <th>School Id </th>
                        <th>Room Id </th>
                        <th>Parent Id </th>
                        <th>Modifications </th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                    data.length>0 ? data.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{formatDate(item.dateofbirth)}</td>
                          <td>{item.schoolid}</td>
                          <td>{item.roomid}</td>
                          <td>{item.parentid}</td>
                          <td>
                            <input type="button" className="btn btn-danger" 
                            onClick={(e)=> deleteChild(item.id)} value="delete" />
                            <Link to={`/Editchild/${item.id}`} className="btn btn-success"> Edit </Link>
                           </td>
                        </tr>
                      )):(
                      <tr>
                        <td colSpan="3">No data available</td>
                      </tr>
                    )}
                    </tbody>
                  </table>
          </div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Childlist