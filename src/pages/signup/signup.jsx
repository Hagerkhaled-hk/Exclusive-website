// src/components/Auth/Signup.jsx (Refactored)
import { FcGoogle } from "react-icons/fc";
import { useContext, useEffect, useRef, useState } from "react";
import SignUp_Api from "../../services/APIs/Auth/signup";
import { Link, useNavigate } from "react-router-dom";
import AuthFormLayout from "../../dashboard/common/AuthFormLayout/AuthFormLayout"; // Import the new layout component
import RedButton from "../../Common/redButton/redButton";
import { UserContext } from "../../context/userContext/userContext";

export default function Signup() {
  const inputRef = useRef([]);
  const SpinnerRef= useRef(null)
  const navigate = useNavigate(null);
  const [errorData, setErrorData] = useState({
    message1: "",
    message2: "",
    Opacity: 0,
  });


  async function register() {
    let data = {
      email: inputRef.current[1].value.trim(),
      password: inputRef.current[2].value.trim(),
      phoneNumber: inputRef.current[4].value.trim(),
      fullName: inputRef.current[0].value.trim(),
      birthDate: inputRef.current[3].value.trim(),
    };

    // --- Client-Side Validation Check (Moved to register for direct check) ---
    let firstError = false;
    for (const item of inputRef.current) {
      if (item.value.trim() === "") {
        setErrorData({
          message1: "Oops!",
          message2: `Your ${item.name} is required`,
          opacity: 1,
        });
        firstError = true;
                   SpinnerRef.current.style.display="none";

        return; // Stop after finding the first empty field
      }
    }
    if (firstError) return; // Should be covered by the loop return, but good as a safety.
    // ------------------------------------------------------------------------

    let res = await SignUp_Api(data);

    if (res.succeeded) navigate("/");   
    else if (!res) {
      // API call failed unexpectedly (e.g., network error)
           
 
      setErrorData({
        message1: `Oops! Something went wrong on our end.`,
        message2: `We're having trouble loading this page right now. Please try refreshing the page or try again in a few minutes.`,
        Opacity: 1,
      });
    } else {
      // API returned an error message (e.g., validation or duplicate user)
      setErrorData({ message1: `Oops!`, message2: res.message, Opacity: 1 });

    }
          SpinnerRef.current.style.display="none";

  }

  // Define the common reset action for clearing errors on button click
  const handleRegisterClick = () => {
    SpinnerRef.current.style.display="flex";
    
    setErrorData({ message1: "", message2: "", Opacity: 0 }); // Clear previous errors
    register();
  };

  return (
    <>
    <AuthFormLayout
      heading="Create an account"
      subHeading="Enter your details below"
      errorData={errorData}
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerLinkTo="/login"
    >
      {/* Actual form inputs for Signup */}
      {/*========= name input========*/}
      <input
        type="text"
        placeholder="FullName"
        ref={(input) => {
          inputRef.current[0] = input;
        }}
        name="fullName"
        required
      />
      {/*========= email input========*/}
      <input
        type="email"
        ref={(input) => {
          inputRef.current[1] = input;
        }}
        placeholder="Email"
        name="email"
        required
      />
      {/*========= password input========*/}
      <input
        type="password"
        placeholder="Password"
        ref={(input) => {
          inputRef.current[2] = input;
        }}
        name="password"
        required
      />
      {/*========= birth input========*/}
      <input
        type="text"
        placeholder="BirthDate (e.g. 2004-09-18)"
        ref={(input) => {
          inputRef.current[3] = input;
        }}
        name="birthDate" // Changed name to remove space
        pattern="^\d{4}-\d{2}-\d{2}$"
        required
      />
      {/*========= phone input========*/}
      <input
        type="text"
        placeholder="Phone Number"
        ref={(input) => {
          inputRef.current[4] = input;
        }}
        name="phoneNumber" // Changed name to remove space
        required
      />
      {/*========= submit========*/}
      <RedButton
        btn_Function={handleRegisterClick}
        text={"Create Account"}
        SpinnerRef={SpinnerRef}
        className="create-account-btn"
   />
      <button disabled={true} className="google-btn">
        {" "}
        <span>
          <FcGoogle />
        </span>{" "}
        Sign up with Google
      </button>
    </AuthFormLayout>
    </>
  );
}