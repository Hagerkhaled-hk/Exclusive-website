import { useContext, useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import "../productParts/editProducts/editProducts.css";
import { Toaster, toast } from "react-hot-toast";
import RedButton from "../../../Common/redButton/redButton";
import Add_Disconut from "../../../services/APIs/discount/addDiscount";

// Initial state for form data
const initialFormData = {
    code: "",
    type: "",
    value: 0,
    startDate: new Date().toISOString().slice(0, 16),
    endDate: "",
    productIds: [],
    categoryIds: []
};

// Initial state for validation errors
const initialValidation = { 
    code: "",
    type: "",
    value: "",
    endDate: "",
    productIds: "",
    categoryIds: ""
};

export default function AddDiscount() {
    // State to hold and manage form input values
    const [formData, setFormData] = useState(initialFormData);
    const [validationErrors, setValidationErrors] = useState(initialValidation);
    
    // Load selected products from localStorage on component mount
    useEffect(() => {
        const loadSelectedProducts = () => {
            try {
                const selectedProducts = JSON.parse(localStorage.getItem("selectedProducts") || "[]");
                
                // Extract productIds and categoryIds from the selected products
                const productIds = selectedProducts.map(item => item.productId).filter(id => id);
                const categoryIds = selectedProducts.map(item => item.categoryID).filter(id => id);
                
                setFormData(prev => ({
                    ...prev,
                    productIds: productIds,
                    categoryIds: categoryIds
                }));
                
                console.log("Loaded selected products:", selectedProducts);
                console.log("Product IDs:", productIds);
                console.log("Category IDs:", categoryIds);
                
            } catch (error) {
                console.error("Error parsing selected products from localStorage:", error);
                toast.error("Error loading selected products");
            }
        };
        
        loadSelectedProducts();
    }, []);

    async function addDiscount() {
        toast("Creating discount...", { duration: 1000 });
        
        // Prepare data for API call
        const discountData = {
            code: formData.code,
            type: formData.type,
            value: Number(formData.value),
            startDate:formData.startDate,
            endDate: formData.endDate,
            productIds: formData.productIds,
            categoryIds: formData.categoryIds
        };
        
        console.log("Sending discount data:", discountData);
        
        let res = await Add_Disconut(discountData);
        
        if (res.statusCode === 201) {
            toast.success(res.message || "Discount created successfully");
            setTimeout(() => {
                setFormData(initialFormData);
                // Clear localStorage after successful creation
                localStorage.removeItem("selectedProducts");
            }, 500);
        } else {
            toast.error(res.message || "Unable to create this discount.");
        }
    }

    const validateField = (name, value) => {
        let error = "";
        
        // --- Code Validation ---
        if (name === "code") {
            if (!value.trim()) {
                error = "Discount code is required.";
            } else if (value.trim().length < 3) {
                error = "Discount code must be at least 3 characters long.";
            } else if (value.trim().length > 50) {
                error = "Discount code cannot exceed 50 characters.";
            } else if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
                error = "Discount code can only contain letters, numbers, hyphens, and underscores.";
            }
        }
        
        // --- Type Validation ---
        if (name === "type") {
            if (!value.trim()) {
                error = "Discount type is required.";
            } else if (!["percentage", "fixedamount"].includes(value.toLowerCase())) {
                error = "Discount type must be: percentage or fixed.";
            }
        }
        
        // --- Value Validation ---
        if (name === "value") {
            const numValue = Number(value);
            if (isNaN(numValue)) {
                error = "Discount value must be a number.";
            } else if (numValue < 0) {
                error = "Discount value cannot be negative.";
            } else if (formData.type === "percentage" && numValue > 100) {
                error = "Percentage discount cannot exceed 100%.";
            } else if (formData.type === "fixed" && numValue <= 0) {
                error = "Fixed discount must be greater than 0.";
            }
        }
        
        // --- End Date Validation ---
        if (name === "startDate") {
 if (!value) {
                error = "Start date is required.";
            }
else{


                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (selectedDate <= today) {
                    error = "Start date must be in Today's day or in the future.";
                }
            }
            
        }
        if (name === "endDate") {
            if (!value) {
                error = "End date is required.";
            } else {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (selectedDate <= today) {
                    error = "End date must be in the future.";
                }
            }
        }
        
        // --- Product IDs Validation ---
        if (name === "productIds") {
            if (!value || value.length === 0) {
                error = "At least one product must be selected.";
            }
        }
        
        // --- Category IDs Validation ---
        if (name === "categoryIds") {
            // Optional: Add category validation if needed
            // Currently leaving it optional since products are already validated
        }
        
        setValidationErrors(prev => ({ ...prev, [name]: error }));
        return error.length === 0; // Return true if valid
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Run validation immediately on change
        validateField(name, value);
    };

    const handleSubmit = () => {
        // Re-validate all fields on submit
        const isCodeValid = validateField('code', formData.code);
        const isTypeValid = validateField('type', formData.type);
        const isValueValid = validateField('value', formData.value);
        const isEndDateValid = validateField('endDate', formData.endDate);
        const isProductIdsValid = validateField('productIds', formData.productIds);

        if (isCodeValid && isTypeValid && isValueValid && isEndDateValid && isProductIdsValid) {
            console.log("Form is valid. Submitting data:", formData);
            addDiscount();
        } else {
            toast.error("Please fix the validation errors before submitting.");
        }
    }

    return (
        <div className="EditProduct DashboardPage">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="form-container">
                <h2>Create Discount</h2>

                <div>
                    <div className="form-group">
                        <label htmlFor="discountCode" className="required">Discount Code</label>
                        <input
                            type="text"
                            id="discountCode"
                            name="code"
                            placeholder="Enter discount code (e.g., SUMMER25)"
                            value={formData.code}
                            onChange={handleChange}
                            required
                        />
                        {validationErrors.code && <p className="error-message">{validationErrors.code}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="discountType" className="required">Discount Type</label>
                        <select
                            id="discountType"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select discount type</option>
                            <option value="percentage">Percentage</option>
                            <option value="fixedAmount">Fixed Amount</option>
                        </select>
                        {validationErrors.type && <p className="error-message">{validationErrors.type}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="discountValue" className="required">Discount Value</label>
                        <input
                            type="number"
                            id="discountValue"
                            name="value"
                            placeholder={formData.type === "percentage" ? "Enter percentage (0-100)" : "Enter amount"}
                            value={formData.value}
                            onChange={handleChange}
                            min="0"
                            step={formData.type === "percentage" ? "1" : "0.01"}
                            required
                        />
                        {validationErrors.value && <p className="error-message">{validationErrors.value}</p>}
                        <small>
                            {formData.type === "percentage" 
                                ? "Enter percentage value (e.g., 25 for 25% off)" 
                                : "Enter fixed amount to deduct"  
                                    
                                  }
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="startDate" className="required">Start Date</label>
                        <input
                            type="datetime-local"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                        {validationErrors.startDate && <p className="error-message">{validationErrors.startDate}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="endDate" className="required">End Date</label>
                        <input
                            type="datetime-local"
                            id="endDate"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                        />
                        {validationErrors.endDate && <p className="error-message">{validationErrors.endDate}</p>}
                    </div>

                    <div className="form-group">
                        <label>Selected Products & Categories</label>
                        <div style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}>
                            <p><strong>Selected Products:</strong> {formData.productIds.length} product(s)</p>
                           
                            {formData.productIds.length === 0 && (
                                <p style={{ color: "#d9534f" }}>No products selected. Please go back and select products first.</p>
                            )}
                        </div>
                        {validationErrors.productIds && <p className="error-message">{validationErrors.productIds}</p>}
                    </div>
                </div>

                <div className="form-group">
                    <RedButton text={"Create Discount"} btn_Function={handleSubmit} />
                </div>
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