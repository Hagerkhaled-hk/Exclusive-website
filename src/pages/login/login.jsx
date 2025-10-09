// src/components/Auth/Login.jsx (Refactored)
import { useContext, useRef, useState } from "react";
import GenerateToken from "../../services/APIs/Auth/generateToken";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { UserContext } from "../../context/userContext/userContext";
import Google_Login_Api from "../../services/APIs/Auth/googleLogin";
import { FcGoogle } from "react-icons/fc";
import AuthFormLayout from "../../dashboard/common/AuthFormLayout/AuthFormLayout";// Import the new layout component
import RedButton from "../../Common/redButton/redButton";

export default function Login() {
  const { UserDataSetting } = useContext(UserContext); // Retain context
  const SpinnerRef=useRef(null);
  const inputRef = useRef([]);
  const navigate = useNavigate(null);
  const [errorData, setErrorData] = useState({
    message1: "",
    message2: "",
    Opacity: 0,
  });
  const path = useLocation();

  const google_login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      let res = await Google_Login_Api(
        { idToken: codeResponse.access_token },
        codeResponse.access_token
      );
      localStorage.setItem("userData", JSON.stringify(res.data)); // Added JSON.stringify to match Signup's role setting
      // You might want to navigate here based on the result
    },
    onError: (error) =>
      setErrorData({ message1: "Opps", message2: error, Opacity: 1 }),
  });

  async function TokenGeneration() {
    let inputData = {
      email: inputRef.current[0].value,
      password: inputRef.current[1].value,
    };

    let res = await GenerateToken(inputData);

    if (res.succeeded) {

      if (path.pathname == "/ADMIN__LOGINDASHBOARD" && res.data.role == "Admin") {
        localStorage.setItem("adminData", JSON.stringify(res.data));
        navigate("/dashboard");
      } else if (
        path.pathname != "/ADMIN__LOGINDASHBOARD" &&
        res.data.role != "Admin"
      ) {
        localStorage.setItem("userData", JSON.stringify(res.data));
        window.dispatchEvent(new Event("localStorageChange"));
        navigate("/");
      } else {
        // Handle incorrect role/route combination
        setErrorData({
          message1: `Oops!`,
          message2: "The credentials do not match this login page's requirements.",
          Opacity: 1,
        });
      }
    } else if (res.statusCode == 500) {
      setErrorData({
        message1: `Oops! Something went wrong on our end.`,
        message2: `We're having trouble loading this page right now. Please try refreshing the page or try again in a few minutes.`,
        Opacity: 1,
      });
    } else {
      setErrorData({
        message1: `Oops!`,
        message2: "Either email or password is incorrect.", // Made message clearer
        Opacity: 1,
      });
    }
          SpinnerRef.current.style.display="none";

  }


  // Define the common reset action for clearing errors on button click
  const handleLoginClick = () => {
           SpinnerRef.current.style.display="flex";
           console.log("SpinnerRef",SpinnerRef);
          

    setErrorData({ message1: "", message2: "", Opacity: 0 }); // Clear previous errors
    TokenGeneration();
  };

  return (
    <AuthFormLayout
      heading="Login to Exclusive"
      subHeading="Enter your details below"
      errorData={errorData}
      // The Login component handles its own footer links internally for more flexibility
      footerText="" // Empty as the links are part of the 'children' section
      footerLinkText=""
      footerLinkTo=""
    >
      {/* Actual form inputs for Login */}
      {/*========= email input========*/}
      <input
        type="email"
        ref={(input) => {
          inputRef.current[0] = input;
        }}
        placeholder="Email or Phone Number"
        name="email_or_phone"
        required
      />
      {/*========= password input========*/}
      <input
        type="password"
        placeholder="Password"
        ref={(input) => {
          inputRef.current[1] = input;
        }}
        name="password"
        required
      />

      {/*========= submit and other buttons in a div========*/}
      <div className="form-buttons">
        <RedButton
          btn_Function={handleLoginClick}
          className="create-account-btn"
          text={"Login"}
          SpinnerRef={SpinnerRef}
       />

        <button
          disabled={true}
          onClick={() => {
            google_login();
          }}
          className=" google-btn"
        >
          <span>
            <FcGoogle />
          </span>{" "}
          Login with Google
        </button>

        <div
          className="add"
          style={{ display: "flex", justifyContent: "space-between", fontSize: "10px" }}
        >
          <Link to={"/signup"}>Create Account</Link>
          <Link to={"/forgetPassword"} className="forgot-password">
            Forget Password?
          </Link>
        </div>
      </div>
      {/* NOTE: ErrorMessage is now rendered inside AuthFormLayout for consistency, so it's removed here.
          However, since Login has a slightly different structure for its buttons/links, 
          I've kept the bottom links inside 'children' and used an empty footer in AuthFormLayout. */}
    </AuthFormLayout>
  );
}