// src/Common/Auth/AuthFormLayout.jsx
import register_img from "../../../assets/images/register-img.png";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../../Common/errorComponents/errorComponents";
import "./AuthFormatLayout.css"; // Assuming the common styles are in signup.css or you might want to create a separate auth.css
import LoadingModal from "../../../Common/modal/modal";
import { UserContext } from "../../../context/userContext/userContext";
import { useContext, useEffect, useRef, useState } from "react";
import RedButton from "../../../Common/redButton/redButton";

/**
 * A layout component for both Signup and Login forms.
 * @param {object} props - The component props.
 * @param {string} props.heading - The main heading for the form (e.g., "Create an account").
 * @param {string} props.subHeading - The sub-heading/instruction (e.g., "Enter your details below").
 * @param {JSX.Element} props.children - The actual form input fields and buttons.
 * @param {object} props.errorData - State object for displaying errors.
 * @param {string} props.footerText - The text for the link section (e.g., "Already have an account?").
 * @param {string} props.footerLinkText - The text for the clickable link (e.g., "Log in").
 * @param {string} props.footerLinkTo - The destination path for the link (e.g., "/login").
 */
export default function AuthFormLayout({
  heading,
  subHeading,
  children,
  errorData,
  footerText,
  footerLinkText,
  footerLinkTo,
}) 
{

  const navigate =useNavigate();
  const {isLogin}=useContext(UserContext);
  const isLoginRef=useRef(isLogin);

  useEffect(() => {
    isLoginRef.current = isLogin;
  }, [isLogin]);



   useEffect(()=>{
    setTimeout(()=>{
      if(isLoginRef.current())navigate("/");   
    },500)
  },[]);

  return (
    <>
{
  isLogin()?
  <LoadingModal loading={true}/>
  :


    <div className="Signup formContainer">
      <main className="main-content">
        <div className="image-section">
          <img
            src={register_img}
            alt="An illustration of a person creating or logging into an account."
          />
        </div>
        <div className="form-section">
          <h2>{heading}</h2>
          <p>{subHeading}</p>
          <div className="form">{children}</div>
          <p className="login-link">
            {footerText}{" "}
            <Link
              style={{
                textDecoration: "underline",
                color: "var(--red-color)",
              }}
              to={footerLinkTo}
            >
              {footerLinkText}
            </Link>
          </p>

          <ErrorMessage
            message1={errorData.message1}
            Opacity={errorData.Opacity}
            message2={errorData.message2}
          />

        </div>
      </main>
    </div>
}
        </>

  );
}