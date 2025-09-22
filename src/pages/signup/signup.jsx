

import "./signup.css";
import register_img from "../../assets/images/register-img.png";
import { FcGoogle } from "react-icons/fc";
import { useRef, useState } from "react";
import SignUp_Api from "../../services/APIs/Auth/signup";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../Common/errorComponents/errorComponents";
export default function Signup()
{
    const inputRef=useRef([]);
const navigate=useNavigate(null);
const [errorData,setErrorData] =useState({message1:"" ,messsage2:"" ,Opacity:0})

async   function register()
    {
        let data={
  "email": inputRef.current[1].value.trim(),
  "password": inputRef.current[2].value.trim(),
  "phoneNumber":inputRef.current[4].value.trim(),
  "fullName": inputRef.current[0].value.trim(),
  "birthDate": inputRef.current[3].value.trim()
}



let res = await SignUp_Api(data);


if(res.succeeded)navigate("/");
else if(!res){
    let firstError=false;

for (const item of inputRef.current) {
    if (item.value.trim() === "") {
        setErrorData({
            message1: "Oops!",
            message2: `Your ${item.name} is required`,
            opacity: 1
        });
        console.log("Found an empty field:", item.name);
                firstError=true;

        return; // This is the key: stop the function after finding the first error
    }
}
    



if (!firstError)setErrorData({message1:`Oops! Something went wrong on our end.`,
    message2:`We're having trouble loading this page right now. Please try refreshing the page or try again in a few minutes.`  ,Opacity:1})


  




}
else{
        setErrorData({message1:`Oops!`,message2:res.message  ,Opacity:1});
}

    }

    
 
    return <div className="Signup formContainer"> 

 <main className="main-content">
        <div className="image-section">
            <img src={register_img} alt="An illustration of a person creating an account."/>
        </div>
        <div className="form-section">
            <h2>Create an account</h2>
            <p>Enter your details below</p>
            <div className="form" >

{/*========= name input========*/} 
               <input type="text" placeholder="FullName"
                ref={input=>{inputRef.current[0]=input}} 
                name="fullName" required/>
                {/*========= email input========*/} 

                <input type="email" ref={input=>{inputRef.current[1]=input}}   placeholder="Email" name="email" required/>
{/*========= password input========*/} 

                <input type="password" placeholder="Password" ref={input=>{inputRef.current[2]=input}}  name="password" required/>

           {/*========= birth input========*/} 
     <input type="text" placeholder="BirthDate (e.g. 2004-09-18)" 
                ref={input=>{inputRef.current[3]=input}} 
                name="birth Date"  pattern="^\d{4}-\d{2}-\d{2}$" required/>
{/*========= phone input========*/} 

                <input type="text" placeholder="Phone Number"
                ref={input=>{inputRef.current[4]=input}} 
                name="phone Number" required/>
{/*========= submit========*/} 

                <button type="submit" 
                
                onClick={()=>{register(),setErrorData({messsage1:"",message2:""  ,Opacity:0}
                )}}
                className="create-account-btn">Create Account</button>
                <button  className="google-btn"> <span><FcGoogle/></span>  Sign up with Google</button>
            </div>
            <p className="login-link">Already have an account? <Link style={{textDecoration:"underline", color:"var(--red-color)"}} to={"/login"}>Log in</Link></p>

<ErrorMessage message1={errorData.message1}  Opacity={errorData.Opacity}  message2={errorData.message2}/>
    
        </div>
    </main>
    </div>
    
}
 