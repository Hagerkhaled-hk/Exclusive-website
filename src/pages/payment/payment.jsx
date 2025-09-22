import { useContext, useState, useEffect } from "react";
import DynamicIndex from "../../Common/DynamicIndex/DynamicIndex";
import RedButton from "../../Common/redButton/redButton";
import TotalDetails from "../../Common/totalDetails/totalDetails";
import banks from "../../assets/images/banks.png";
import { CartContext } from "../../context/cartContext/cartContext"
import "./payment.css";
import CheckoutSession from "../../services/APIs/payment/session";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../context/userContext/userContext";
import AddToOrder from "../../services/APIs/orders/addOrder";

export default function Payment() {

  const {cartItems}=useContext(CartContext);
  const {getToken} =useContext(UserContext);
  const [activeProcess,setActiveProcess] =useState(false);
  const url=useLocation();

  // State for form fields
  const [form, setForm] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phone: "",
    postalCode: "",
    saveInfo: false
  });
  // State for errors
  const [errors, setErrors] = useState({});

  useEffect(() => {

    // Load saved address from localStorage if available
    const savedAddress = localStorage.getItem("user_Address_Payment");   
    console.log(JSON.parse(savedAddress));
  if (savedAddress) {
    
      setForm(JSON.parse(savedAddress));
    }
    
  
if (url.pathname=="/success-payment") {
  (async()=>{

    let token =getToken();
    console.log(token);
    
let user_Address_Payment =JSON.parse(localStorage.getItem("user_Address_Payment"));

if(!user_Address_Payment) return;

  let res= await AddToOrder({
  "shippingAddress": user_Address_Payment["streetAddress"],
  "shipPostalCode": user_Address_Payment["postalCode"]
},token);
  console.log(res);
} )()
}
  
  },[]);

  // Handle input change
  function handleChange(e) {
    const { name, value,  } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  // Validation function
  function validateForm() {
    let newErrors = {};
    // First Name: required, min 2, max 30
    if (!form.firstName.trim()) {
      newErrors.firstName = "First name required";
    } else if (form.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    } else if (form.firstName.trim().length > 30) {
      newErrors.firstName = "First name must be less than 30 characters";
    }
    // Street Address: required, min 5, max 100
    if (!form.streetAddress.trim()) {
      newErrors.streetAddress = "Street address required";
    } else if (form.streetAddress.trim().length < 5) {
      newErrors.streetAddress = "Street address must be at least 5 characters";
    } else if (form.streetAddress.trim().length > 100) {
      newErrors.streetAddress = "Street address must be less than 100 characters";
    }
    // City: required, min 2, max 50
    if (!form.city.trim()) {
      newErrors.city = "City required";
    } else if (form.city.trim().length < 2) {
      newErrors.city = "City must be at least 2 characters";
    } else if (form.city.trim().length > 50) {
      newErrors.city = "City must be less than 50 characters";
    }
    // Phone: required, min 7, max 20
    if (!form.phone.trim()) {
      newErrors.phone = "Phone required";
    } else if (form.phone.trim().length < 7) {
      newErrors.phone = "Phone must be at least 7 digits";
    } else if (form.phone.trim().length > 20) {
      newErrors.phone = "Phone must be less than 20 digits";
    }
    // Postal Code: required, min 3, max 15
    if (!form.postalCode.trim()) {
      newErrors.postalCode = "Postal code required";
    } else if (form.postalCode.trim().length < 3) {
      newErrors.postalCode = "Postal code must be at least 3 characters";
    } else if (form.postalCode.trim().length > 15) {
      newErrors.postalCode = "Postal code must be less than 15 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function saveAddressToLocalStorage(e) {
        const {name,  checked } = e.target;
        console.log("checked",checked);
        let newForm = { ...form, [name]: checked };
        setForm(newForm);

    if (validateForm()) {
   if(checked) {localStorage.setItem("user_Address_Payment", JSON.stringify(newForm)); }
    else{localStorage.removeItem("user_Address_Payment");}}
  }
  // Save address to localStorage if valid




  async function processpayment() {
    // Validate and save address before payment
    if (!validateForm()) return;

setActiveProcess(true);
    /*   let data=[{"productNames":[],"unitAmounts":[],"quantities":[]}];
    cartItems.map((item)=>{
      data["productNames"].push(item.productName) ;
      data["unitAmounts"].push(item.price*100) ;
      data["quantities"].push(item.quantity) ;
    });
    console.log(data);
    

    let res =await CheckoutSession( 
      {
        "productNames":   data["productNames"],
        "unitAmounts": data["unitAmounts"],
        "quantities": data["quantities"],
        "currency": "EGP",
        "successUrl": "http://localhost:5173/account",
        "cancelUrl": "http://localhost:5173/Payment"
      }
    ); */

//Temp

    let res =await CheckoutSession({
  "productNames": [
    "product1","product2","product3"
  ],
  "unitAmounts": [
    5000,3000,2000
  ],
  "quantities": [
    1,2,3
  ],
  "currency": "EGP",
  "successUrl": "http://localhost:5173/success-payment",
  "cancelUrl": "http://localhost:5173/Payment"
});  
    if(res.data.url) {
       window.location.href=res.data.url;
     }
  }

  async function applyDiscount() {
    let data=[];
    cartItems.map((item)=>{
      data.push(item.productId) ;
    });
    console.log(data);
    let res =await ApplyDiscount({
      "code": coupounRef.current.value,
      "productIds": data
    });
    setCart_Info_State();
  }

  return (
    <div className="Payment">
      <DynamicIndex page={["Account", "My Account","Product","View Cart","Payment"]} />
      <div className="payment-container">
        {/* Billing Details */}
        <div className="billing-details">
          <h2>Billing Details</h2>
          <div className="form">
            <label>
              First Name<span>*</span>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </label>
            <label>
              Company Name
              <input
                type="text"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
              />
            </label>
            <label>
              Street Address<span>*</span>
              <input
                type="text"
                name="streetAddress"
                value={form.streetAddress}
                onChange={handleChange}
                required
              />
              {errors.streetAddress && <span className="error">{errors.streetAddress}</span>}
            </label>
            <label>
              Apartment, floor, etc. (optional)
              <input
                type="text"
                name="apartment"
                value={form.apartment}
                onChange={handleChange}
              />
            </label>
            <label>
              Town/City<span>*</span>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
              {errors.city && <span className="error">{errors.city}</span>}
            </label>
            <label>
              Phone Number<span>*</span>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </label>
            <label>
              Postal Code<span>*</span>
              <input
                type="text"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                required
              />
              {errors.postalCode && <span className="error">{errors.postalCode}</span>}
            </label>
            <div className="save-info">
              <input
                type="checkbox"
                id="saveInfo"
                name="saveInfo"
                checked={form.saveInfo}
                onChange={saveAddressToLocalStorage}
              />
              <label htmlFor="saveInfo">
                Save this information for faster check-out next time
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <TotalDetails total={2000} subTotal={3000} />
          <div className="payment-methods">
            <label>
              <input type="radio" name="payment" />
              Bank
              <span className="bank-icons">
                <img src={banks} alt="Bank Cards" />
              </span>
            </label>
            <label>
              <input type="radio" name="payment" defaultChecked />
              Cash on delivery
            </label>
          </div>
          <div className="coupoun coupon-row" >
            <input type="text"  placeholder="Coupoun"  />
            <RedButton text="Apply Coupoun" btn_Function={applyDiscount}/>
          </div>
          <RedButton text="Place order"
          className={`${activeProcess?"active":""}`}  btn_Function={processpayment}/>
        </div>
      </div>
    </div>
  );
}