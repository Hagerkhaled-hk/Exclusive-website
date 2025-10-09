import React, { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import AddToOrderAdmin from "../../../../services/APIs/orders/addOrderAdmin";
import { DashboardContext } from "../../../context/dashboardContext";
import "../../productParts/editProducts/editProducts.css"
const initialFormData = {
    // Replaced/New fields
    buyerId: "",
    postalCode: "",
    streetAddress: "",
    
    productIds: [], // Used to calculate totalProducts
    
    totalProducts: 0,
    totalMoney: 0.00,
};

// Initial state for validation errors
const initialValidation = {
    buyerId: "",
    postalCode: "",
    streetAddress: "",
    productIds: "", // For the product count check
};


// --- REACT COMPONENT ---

export default function AddOrderForm() {
    const [formData, setFormData] = useState(initialFormData);
    const [validationErrors, setValidationErrors] = useState(initialValidation);
    const {getAdminToken}=useContext(DashboardContext);

    // Load mock product/order summary data on component mount
    useEffect(() => {
        const loadMockOrderData = () => {
            try {
         
            

                const productIds = getOrderSelectedProduct();
                console.log("productIds",productIds);
                
                // Calculate total money

                setFormData(prev => ({
                    ...prev,
                    productIds: productIds,
                    totalProducts: productIds.length,
                    totalMoney:0, // Format to 2 decimal places
                }));

            } catch (error) {
                console.error("Error loading mock data:", error);
                toast.error("Error loading product data summary.");
            }
        };

        loadMockOrderData();
    }, []);

    function getOrderSelectedProduct()
    {
        let orderSeleectedProduct= localStorage.getItem("OrderselectedProducts");
        if(!orderSeleectedProduct)return;
        
         return JSON.parse(orderSeleectedProduct);
    }

    // --- API Submission Function ---
    async function submitOrderDetails() {
        toast.loading("Submitting order details...", { duration: 1000 });
        const orderDetails = {
            buyerId: formData.buyerId,
            shipPostalCode: formData.postalCode,
            shippingAddress: formData.streetAddress,
            items: formData.productIds,
        };

        console.log("items",formData.productIds);
        
        
  let token = getAdminToken();
  console.log("getAdminToken",token);
  
  if(!token)return
         let res = await AddToOrderAdmin(orderDetails,token);
 console.log("res",res);

        if (res.statusCode === 200) {
            toast.success(res.message || "Order details submitted successfully.");
            setTimeout(() => {
                // Keep the product summary but clear the specific order inputs
                setFormData(prev => ({
                    ...prev,
                    buyerId: initialFormData.buyerId,
                    postalCode: initialFormData.postalCode,
                    streetAddress: initialFormData.streetAddress,
                }));
            }, 500);
        } else {
            toast.error(res.message || "Unable to submit order details.");
        }
    }

    // --- Validation Logic ---
    const validateField = (name, value) => {
        let error = "";
        console.log(name , value.length);
        
        switch (name) {
            case "buyerId":
                if (!value.trim()) error = "Buyer ID is required.";
                else if (value.trim().length < 5) error = "Buyer ID must be at least 5 characters.";
                break;
            case "streetAddress":
                if (!value.trim()) error = "Street Address is required.";
                else if (value.trim().length <5) error = "Address must be at least 5 characters long.";
                break;
            case "postalCode":
                if (!value.trim()) error = "Postal code is required.";
                // Simple validation for US (5 or 5-4) or Canadian (A1A 1A1) format
                else if (!/^\d{5}(-\d{4})?$/.test(value.trim()) && !/^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/.test(value.trim())) {
                    error = "Invalid postal code format (e.g., 12345 or A1A 1A1).";
                }
                break;
            case "productIds":
                if (!value || value.length === 0) {
                    error = "The order must contain at least one product.";
                }
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

        setFormData(prev => {
            const newFormData = { ...prev, [name]: value };
            // Run validation immediately on change
            validateField(name, value);
            return newFormData;
        });
    };

    const handleSubmit = () => {
        // Re-validate all required fields on submit
        const isBuyerIdValid = validateField('buyerId', formData.buyerId);
        const isAddressValid = validateField('streetAddress', formData.streetAddress);
        const isPostalCodeValid = validateField('postalCode', formData.postalCode);
        // Validate that products are present
        const isProductIdsValid = validateField('productIds', formData.productIds); 

        console.log("is valid",isBuyerIdValid && isAddressValid && isPostalCodeValid && isProductIdsValid);
        
        if (isBuyerIdValid && isAddressValid && isPostalCodeValid && isProductIdsValid) {
            console.log("Form is valid. Submitting data.");
            submitOrderDetails();
        } else {
            toast.error("Please fix the validation errors before submitting.");
        }
    }

    // --- Render ---
    return (
        <div className="OrderDetailsForm EditProduct DashboardPage">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="form-container">
                <h2>Enter Customer & Delivery Information</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    
                    {/* Buyer ID */}
                    <div className="form-group">
                        <label htmlFor="buyerId" className="required">Buyer ID</label>
                        <input
                            type="text"
                            id="buyerId"
                            name="buyerId"
                            placeholder="Enter unique customer identifier"
                            value={formData.buyerId}
                            onChange={handleChange}
                            required
                        />
                        {validationErrors.buyerId && <p className="error-message">{validationErrors.buyerId}</p>}
                    </div>
                    
                    {/* Street Address */}
                    <div className="form-group">
                        <label htmlFor="streetAddress" className="required">Street Address</label>
                        <input
                            type="text"
                            id="streetAddress"
                            name="streetAddress"
                            placeholder="e.g., 123 Main St, Apt 4B"
                            value={formData.streetAddress}
                            onChange={handleChange}
                            required
                        />
                        {validationErrors.streetAddress && <p className="error-message">{validationErrors.streetAddress}</p>}
                    </div>

                    {/* Postal Code */}
                    <div className="form-group">
                        <label htmlFor="postalCode" className="required">Postal Code</label>
                        <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            placeholder="e.g., 12345 or L1A 2B3"
                            value={formData.postalCode}
                            onChange={handleChange}
                            required
                        />
                        {validationErrors.postalCode && <p className="error-message">{validationErrors.postalCode}</p>}
                    </div>
                    
                    {/* --- Order Summary View --- */}
                    <div className="form-group">
                        <label>Order Summary</label>
                        <div style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "4px", backgroundColor: "#f9f9f9" }}>
                            <p>
                                <strong>Total Number of Products:</strong> 
                                <span style={{ color: formData.totalProducts > 0 ? "green" : "red", fontWeight: 'bold', marginLeft: '5px' }}>
                                    {formData.totalProducts}
                                </span>
                            </p>
                            <p>
                                <strong>Total Money:</strong> 
                                <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>
                                    ${formData.totalMoney}
                                </span>
                            </p>
                        </div>
                        {validationErrors.productIds && <p className="error-message">{validationErrors.productIds}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="form-group">
                        <button type="button" onClick={handleSubmit} style={{ 
                            backgroundColor: '#d9534f', 
                            color: 'white', 
                            padding: '10px 15px', 
                            border: 'none', 
                            borderRadius: '4px', 
                            cursor: 'pointer',
                            width: '100%',
                            fontWeight: 'bold'
                        }}>
                            Save Order & Delivery Details
                        </button>
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
            `}</style>
        </div>
    );
}