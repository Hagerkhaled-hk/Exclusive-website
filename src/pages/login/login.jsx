

import "../signup/signup.css";
import register_img from "../../assets/images/register-img.png";
import { useRef, useState } from "react";
import GenerateToken from "../../services/APIs/generateToken";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../Common/errorComponents/errorComponents";
export default function Login()
{
    const inputRef=useRef([]);
const navigate=useNavigate(null);
const [errorData,setErrorData] =useState({message1:"" ,messsage2:"" ,Opacity:0})


async   function TokenGeneration()
    {
        let inputData={
  "email": inputRef.current[0].value,
  "password": inputRef.current[1].value,
}




let res = await GenerateToken (inputData);

if(res.succeeded){
localStorage.setItem("userData",JSON.stringify(res.data) );
navigate("/");}
else if(res.statusCode == 500 ){setErrorData({message1:`Oops! Something went wrong on our end.`,
    message2:`We're having trouble loading this page right now. Please try refreshing the page or try again in a few minutes.`  ,Opacity:1})}
else{
        setErrorData({message1:`Oops!`,message2:"Either email or phone number is required" ,Opacity:1});
}




    }

    
 
    return <div className="Signup formContainer"> 

 <main className="main-content">
        <div className="image-section">
            <img src={register_img} alt="An illustration of a person creating an account."/>
        </div>
        <div className="form-section">
            <h2>Login to Exclusive </h2>
            <p>Enter your details below</p>
            <div className="form" >
{/*========= email input========*/} 


                <input type="email" ref={input=>{inputRef.current[0]=input}}   placeholder="Email or Phone Number" name="email_or_phone" required/>
{/*========= password input========*/} 

                <input type="password" placeholder="Password" ref={input=>{inputRef.current[1]=input}}  name="password" required/>

{/*========= submit========*/} 
                    <div className="form-buttons">

                <button type="submit" 
                
                onClick={()=>{TokenGeneration();setErrorData({messsage1:"",message2:""  ,Opacity:0}
                )}}
                className="create-account-btn">Log in</button>
                <div className="add" style={{display:"flex",justifyContent:"space-between",fontSize:"10px"}}>

                <Link   to={"/signup"}>Create Account</Link>
                    <Link  to={"/forgetPassword"}  className="forgot-password">Forget Password?</Link>

    
                </div>
<ErrorMessage message1={errorData.message1}  Opacity={errorData.Opacity}  message2={errorData.message2}/>
                    </div>
                </div>
        </div>
    </main>
    </div>
    
}
 



