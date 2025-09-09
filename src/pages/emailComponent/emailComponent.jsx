import { useRef, useState } from "react";
import "./emailComponent.css";
import ForgetPasword from "../../services/APIs/forgetPassword";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../Common/errorComponents/errorComponents";


export default function EmailComponent()
{
 
    const emailRef=useRef(null);
const [errorData,setErrorData] =useState({message1:"" ,messsage2:"" ,Opacity:0})
const navigate=useNavigate();

    async function sendEmail() {
        
        let data =  {"email": emailRef.current.value.trim()}

        let res= await ForgetPasword(data);
        if(res.succeeded){
            console.log(res.data);
            
localStorage.setItem("emailUser",JSON.stringify(res.data.userId) );

 navigate("/resetPassword");
 
}

else if(res.statusCode == 500 ){setErrorData({message1:`Oops! Something went wrong on our end.`,
    message2:`We're having trouble loading this page right now. Please try refreshing the page or try again in a few minutes.`  ,Opacity:1})}
else{
    console.log(res.message);
    
        setErrorData({message1:`Oops!`,message2:res.message ,Opacity:1});
}
        

    }

    return <div className="EmailComponent"> 
   <div className="container">
        <div className="header">
            <h2>Enter your Email</h2>
               <p>Enter your new email below</p>
        </div>

        <div id="reset-password-form">
            <div className="form-group">
                <input type="email" id="email" ref={emailRef} className="form-input" placeholder="Email"  />
            </div>
          
            <button    onClick={()=>{sendEmail(),
                   setErrorData({message1:"",message2:"" ,Opacity:0});
            }} className="submit-button btn">Send</button>
        </div>

       
                <ErrorMessage message1={errorData.message1}  Opacity={errorData.Opacity}  message2={errorData.message2}/>
    
    </div>
      </div>
    
}