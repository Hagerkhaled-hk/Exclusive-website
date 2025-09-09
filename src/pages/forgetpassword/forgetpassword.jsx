import { useRef, useState } from "react";
import "./forgetPassword.css";
import RestPassword from "../../services/APIs/resetPassword";
import ErrorMessage from "../../Common/errorComponents/errorComponents";
import { useNavigate } from "react-router-dom";


export default function ForgetPassword()
{
const inputRef=useRef([]);
const [errorData,setErrorData] =useState({message1:"" ,messsage2:"" ,Opacity:0})
const navigate=useNavigate();
    async function Reset() {
        
        if(localStorage["emailUser"]!=null || localStorage["emailUser"]!=undefined  )
        {

            let data={
      "userId":JSON.parse(localStorage["emailUser"]) ,
      "newPassword":inputRef.current[0].value.trim(),
      "confirmPassword":inputRef.current[1].value.trim()
    };
    
            let res = await  RestPassword(data);
            console.log(res);
                   if(res.succeeded){
            
navigate("/login");}
else if(res.statusCode == 500 ){setErrorData({message1:`Oops! Something went wrong on our end.`,
    message2:`We're having trouble loading this page right now. Please try refreshing the page or try again in a few minutes.`  ,Opacity:1})}
else{
    console.log(res.message);
    
        setErrorData({message1:`Oops!`,message2:res.message ,Opacity:1});
}
        

    
            
        }
    }
 
    return <div className="ForgetPassword"> 
   <div className="container">
        <div className="header">
            <h2>Reset Your Password</h2>
            <p>Enter your new password below</p>
        </div>

        <div id="reset-password-form">
            <div className="form-group">
                <input type="password" ref={input=>inputRef.current[0]=input} id="new-password" className="form-input" placeholder="New Password"  />
            </div>
            <div className="form-group">
                <input type="password" ref={input=>inputRef.current[1]=input} id="confirm-password" className="form-input" placeholder="Confirm Password"  />
            </div>
            <button type="submit" onClick={()=>{Reset(), setErrorData({message1:"",message2:"" ,Opacity:0});}} className="submit-button">Reset Password</button>
        </div>

      
                      <ErrorMessage message1={errorData.message1}  Opacity={errorData.Opacity}  message2={errorData.message2}/>
    
    </div>
      </div>
    
}