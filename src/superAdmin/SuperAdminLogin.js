import React from 'react'
import { useState } from 'react'
import { useNavigate} from 'react-router-dom';
function SuperAdminLogin() {
    const [userName, setUserName] = useState('') // useState to store First Name
    const [userError, setUserError] = useState('') // useState to store First Name
    const [password, setPassword] = useState('') // useState to store Last Name
    
    function checkLogin(){
        if(userName!=='' && password!==''){
            if(userName==='admin' && password==='admin'){
                setUserError('Welcome to the Day Care pannel');
                localStorage.setItem('userType','superAdmin');
            }else if(userName!=='admin' || password!=='admin'){
                setUserError('Please check Your User Name or Password');        
            }
        }else {
            setUserError('must need to fill User Name or Password');        
        }
    }
  return (
    <>        
        <div className="container-fluid login">
            <div className="row">
                <div className='col-md-12'>
                    <div className='container mt-3'>
                    <h1>Super Admin Login</h1>
                        <div className="form-group">
                            <input type="text" name="userName" 
                                placeholder='Enter User Name'
                                className='form-control'
                                onChange={(e)=>setUserName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input type="password" name="userPassword" 
                                placeholder='Enter Password'
                                className='form-control'
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                        <input type="button" value="Sign In" 
                        className="btn btn-success button"
                        onClick={()=>{
                            checkLogin();
                        }}
                        />
                        <span className="error">{userError}</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SuperAdminLogin;