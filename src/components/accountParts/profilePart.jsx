import { use, useContext, useState } from "react";
import { UserContext } from "../../context/userContext/userContext";
import ForgetPasword from "../../services/APIs/Auth/forgetPassword";
import RestPassword from "../../services/APIs/Auth/resetPassword";

export default function ProfilePart() {
  const {userData}=useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
const [passAct,setPassAct]=useState(false);
  const [form, setForm] = useState({
    email: userData.email,
    newPassword: "",
    confirmPassword: "",
  });
  
  


  async function change_password() {

    let res= await ForgetPasword({"email":form.email});
    
    if(res.statusCode==400) return { ...errors,"confirmPassword":"password not changed"};
  
   let  restRes =await RestPassword({
  "userId": res.data.userId,
  "newPassword": form.newPassword,
  "confirmPassword": form.confirmPassword

}
)

if(restRes.statusCode==400) return { ...errors,"confirmPassword":"password not changed"};


return {};
  }



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  

  const handleBlur = (e) => {
    if (submitted) return; // Don't run blur validation if submitting
    const { name, value } = e.target;
    const fieldError = runFieldValidation(name, value, form);

    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const runFieldValidation = (name, value, allValues) => {
    switch (name) {
 
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value))
          return "Invalid email format";
        break;


      

      case "newPassword":
        if (!value.trim()) return "New password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/[A-Z]/.test(value))
          return "Password must contain at least one uppercase letter";
        if (!/[0-9]/.test(value))
          return "Password must contain at least one number";
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
          return "Password must contain at least one special character";
        break;

      case "confirmPassword":
        if (value !== allValues.newPassword) return "Passwords do not match";
        break;

      default:
        break;
    }
    return "";
  };

  const runValidation = (values) => {
    const newErrors = {};
    
    Object.keys(values).forEach((key) => {
      const error = runFieldValidation(key, values[key], values);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  const handleSubmit =async () => {
    setSubmitted(true);
    setSuccessMessage("");


    const validationErrors = runValidation(form);
    
    setErrors(validationErrors);
    

    if (Object.keys(validationErrors).length == 0) {
    const  database_validationErrors= await change_password();
console.log(database_validationErrors);

    if(Object.keys(database_validationErrors).length > 0)
{      setErrors(database_validationErrors) 
    return ;
}   
    }
    else return;


    setSuccessMessage(" Your changes have been saved successfully!");
    setTimeout(() => {

      handleCancel();
      
    }, 1500);
  };

  const handleCancel = () => {
    setForm({
      email: userData.email,
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({});
    setSubmitted(false);
    setSuccessMessage("");
  };

  return (
 

      <main className="account-content">
        <h2>Your Profile</h2>

        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="profile-form" >
          <div className="form-grid">
          
          
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled
                placeholder="rimel111@gmail.com"
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
         
          </div>

          <label   onClick={ ()=>{setPassAct(!passAct)}} className="password-label btn "  >Password Changes</label>

           <div             className={`${passAct?"visible":""} password-input`}
>

  
   <input

            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="New Password"
          />
          {errors.newPassword && <p className="error">{errors.newPassword}</p>}

          <input 
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Confirm New Password"
          

          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}


          <div className="form-actions "          
>
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" onClick={handleSubmit} className="btn-save">
              Save Changes
            </button>
          </div>
          </div>  
          </div>

          
 
      </main>
  );
}
