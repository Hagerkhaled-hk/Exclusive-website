import React, { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import SignUp_Api from "../../../../services/APIs/Auth/signup"; // Assuming correct path
import { useNavigate } from "react-router-dom";
import "../../productParts/editProducts/editProducts.css"; // Reuse Order/Product CSS
import RedButton from "../../../../Common/redButton/redButton";
import SignUp_Admin_Api from "../../../../services/APIs/Auth/sigupAdmin";

// --- INITIAL STATE FOR SIGNUP ---
const initialFormData = {
    fullName: "",
    email: "",
    password: "",
    birthDate: "",
    phoneNumber: "",
};

// Initial state for validation errors
const initialValidation = {
    fullName: "",
    email: "",
    password: "",
    birthDate: "",
    phoneNumber: "",
};

// --- REACT COMPONENT ---

export default function SignupWithOrderLayout() {
    const [formData, setFormData] = useState(initialFormData);
    const [validationErrors, setValidationErrors] = useState(initialValidation);
const [roleType,setRoleType]=useState("buyer");
    const SpinnerRef =useRef(null)

    // --- Validation Logic (Copied from structured Signup) ---
    const validateField = (name, value) => {
        let error = "";
        const trimmedValue = String(value).trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10,}$/;
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        switch (name) {
            case "fullName":
                if (!trimmedValue) error = "Full Name is required.";
                else if (trimmedValue.length < 3) error = "Full Name must be at least 3 characters.";
                break;

            case "email":
                if (!trimmedValue) error = "Email is required.";
                else if (!emailRegex.test(trimmedValue)) error = "Please enter a valid email address.";
                break;

            case "password":
                if (!trimmedValue) error = "Password is required.";
                else if (trimmedValue.length < 6) error = "Password must be at least 6 characters.";
                break;

            case "birthDate":
                if (!trimmedValue) error = "Birth Date is required (YYYY-MM-DD).";
                else if (!dateRegex.test(trimmedValue)) error = "Format must be YYYY-MM-DD (e.g., 2004-09-18).";
                break;

            case "phoneNumber":
                if (!trimmedValue) error = "Phone Number is required.";
                else if (!phoneRegex.test(trimmedValue.replace(/\D/g, ""))) error = "Phone number must contain at least 10 digits.";
                break;

            default:
                break;
        }

        setValidationErrors(prev => ({ ...prev, [name]: error }));
        return error.length === 0; // Return true if valid
    };

    // --- Event Handlers ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validateField(name, value); // Validate immediately on change
    };

    const handleSubmit = async () => {
        // Re-validate all fields on submit
        SpinnerRef.current.display="flex";
        const isFullNameValid = validateField('fullName', formData.fullName);
        const isEmailValid = validateField('email', formData.email);
        const isPasswordValid = validateField('password', formData.password);
        const isBirthDateValid = validateField('birthDate', formData.birthDate);
        const isPhoneNumberValid = validateField('phoneNumber', formData.phoneNumber);

        const isFormValid = isFullNameValid && isEmailValid && isPasswordValid && isBirthDateValid && isPhoneNumberValid;

        if (!isFormValid) {
            toast.error("Please fix the validation errors before submitting.");
            SpinnerRef.current.display="none";
            return;
        }

        // --- API Submission ---
        toast.loading("Creating account...", { duration: 1000 });
        const dataToSend = {
            email: formData.email.trim(),
            password: formData.password.trim(),
            phoneNumber: formData.phoneNumber.trim(),
            fullName: formData.fullName.trim(),
            birthDate: formData.birthDate.trim(),
        };
     let res={};
        if(roleType!=="admin") res = await SignUp_Api(dataToSend);
        else res =await SignUp_Admin_Api(dataToSend) ;
        
        if (res.succeeded) {
            toast.success("Added successfully!");
        } else if (res.message) {
             // API error (e.g., duplicate email)
            toast.error(res.message);
        } else {
            // Network or unhandled error
            toast.error("Registration failed. Please try again later.");
        }
                    SpinnerRef.current.display="none";

    };

    // --- Render ---
    return (
        // Reusing the Order/Product Dashboard styling class
        <div className="SignupFormWithOrderStyle EditProduct DashboardPage"> 
            <Toaster position="top-center" reverseOrder={false} />

            <div className="form-container">
                <h2>Add user Account</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>

                    {/* Full Name */}
                    <div className="form-group">
                        <label htmlFor="fullName" className="required">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            onBlur={(e) => validateField("fullName", e.target.value)}
                            required
                        />
                        {validationErrors.fullName && <p className="error-message">{validationErrors.fullName}</p>}
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email" className="required">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="e.g., user@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={(e) => validateField("email", e.target.value)}
                            required
                        />
                        {validationErrors.email && <p className="error-message">{validationErrors.email}</p>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="Role" className="required">Role</label>
                        <select
                            id="Role"
                            name="type"
                            onChange={(e)=>setRoleType(e.target.value)}
                            required
                        >
                            <option value="buyer">Buyer</option>
                            <option value="admin">Admin</option>
                        </select>
                        {validationErrors.type && <p className="error-message">{validationErrors.type}</p>}
                    </div>


                    {/* Password */}
                    <div className="form-group">
                        <label htmlFor="password" className="required">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password (min 6 characters)"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={(e) => validateField("password", e.target.value)}
                            required
                        />
                        {validationErrors.password && <p className="error-message">{validationErrors.password}</p>}
                    </div>

                    {/* Birth Date */}
                    <div className="form-group">
                        <label htmlFor="birthDate" className="required">Birth Date</label>
                        <input
                            type="text"
                            id="birthDate"
                            name="birthDate"
                            placeholder="YYYY-MM-DD (e.g. 2004-09-18)"
                            value={formData.birthDate}
                            onChange={handleChange}
                            onBlur={(e) => validateField("birthDate", e.target.value)}
                            required
                        />
                        {validationErrors.birthDate && <p className="error-message">{validationErrors.birthDate}</p>}
                    </div>

                    {/* Phone Number */}
                    <div className="form-group">
                        <label htmlFor="phoneNumber" className="required">Phone Number</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Enter 10-digit phone number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            onBlur={(e) => validateField("phoneNumber", e.target.value)}
                            required
                        />
                        {validationErrors.phoneNumber && <p className="error-message">{validationErrors.phoneNumber}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="form-group">
                        <RedButton type="button" btn_Function={handleSubmit} 
                       text={"Add Account"} SpinnerRef={SpinnerRef} />
                            
                    </div>
                </form>
            </div>

            <style jsx>{`
                .error-message {
                    color: #d9534f;
                    font-size: 0.85em;
                    margin-top: 5px;
                }
                .required::after {
                    content: " *";
                    color: #d9534f;
                }
                .form-group {
                    margin-bottom: 20px;
                }
            `}</style>
        </div>
    );
}