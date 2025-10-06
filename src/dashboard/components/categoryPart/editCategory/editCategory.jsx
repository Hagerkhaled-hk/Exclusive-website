import { useContext, useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import "../../productParts/editProducts/editProducts.css";
import LoadingModal from "../../../../Common/modal/modal";
import { Toaster, toast } from "react-hot-toast";
import RedButton from "../../../../Common/redButton/redButton";
import CategId from "../../../../services/APIs/category/categ_id";
import UpdateCategory from "../../../../services/APIs/category/update_categ";

// Initial state for form data, matching the product structure
const initialFormData = {
    Name: "",
    Description: "",
};

// Initial state for validation errors
const initialValidation = { 
    Name: "",
    Description: "",
};

export default function EditCategory() {
/*     const [category, setCategory] = useState({});
 */    // State to hold and manage form input values
    const [formData, setFormData] = useState(initialFormData);
    const [validationErrors, setValidationErrors] = useState(initialValidation);
    const [loading, setLoading] = useState(true);
    
    // Determine if we should show the "No products found" message

    const { id } = useParams();


async function  update_Category() {
toast(
  "Updating your changes....",
  {
    duration: 1000,
  }
);
 


     let res = await UpdateCategory(formData,id)    
    if(res.statusCode==200){toast.success("Category updated successfully");

    }
else toast.error( res.message || "Unable to update this category."); 
    
}



    useEffect(() => {
(async()=>{
    let res = await CategId(id,true,true);

    console.log(res);
    
    if(res.statusCode==200){setFormData(
        {
    Name: res?.data.name,
    Description:res?.data.description
}
    );}
})()   

setTimeout(()=>{
    setLoading(false)
},5000)
    }, [id]); 

    const validateField = (Name, value) => {
        let error = "";
        
        // --- Name Validation ---
        if (Name === "Name") {
            if (value.trim().length < 3) {
                error = "Name must be at least 3 characters long.";
            } else if (value.trim().length > 100) {
                error = "Name cannot exceed 100 characters.";
            }
        }
        
      
        // --- Description Validation ---
        if (Name === "Description") {
            if (value.trim().length > 500) {
                error = "Description cannot exceed 500 characters.";
            }
             else if(value.trim().length <10) 
           {
                            error = "Description must be longer than 10 characters.";

           }
        }

    
       
        setValidationErrors(prev => ({ ...prev, [Name]: error }));
        return error.length === 0; // Return true if valid
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        
        
        // Convert numeric inputs to number type for consistency
  
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        
        // Run validation immediately on change
        validateField(name, value);
    };

    // --------------------------------------------------------
    // 4. Form Submission (Placeholder)
    // --------------------------------------------------------
    const handleSubmit = () => {
        
        // Re-validate all fields on submit
        const isNameValid = validateField('Name', formData.Name);
        const isDescriptionValid = validateField('Description', formData.Description);

        if (isNameValid&&isDescriptionValid) {
            // Logic for API call to update product
            console.log("Form is valid. Submitting data:", formData);
            // Example: updateProductApi(formData);
update_Category();        } else {
            toast.error("Please fix the validation errors before submitting.");
        }
    }
   

  
    
   
    return (
        <div className="EditProduct DashboardPage">
            <Toaster position="top-center" reverseOrder={false} />

            {(formData.Name==""&&formData.Description=="") ? (
                <LoadingModal loading={loading} mainText="No Category found " />
            ) : (
                <div className="form-container">
                    <h2>Edit Category</h2>

                    <div >

                        <div className="form-group">
                            <label htmlFor="productName" className="required">Name</label>
                            <input
                                type="text"
                                id="productName"
                                Name="Name" // Important: match the key in formData state
                                placeholder="Enter Category Name"
                                value={formData.Name}
                                onChange={handleChange}
                                required
                            />
                            {validationErrors.Name && <p className="error-message">{validationErrors.Name}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="productDescription">Description</label>
                            <textarea
                                id="productDescription"
                                Name="Description" // Important: match the key in formData state
                                placeholder="Provide a detailed Description of the product"
                                value={formData.Description}
                                onChange={handleChange}
                            ></textarea>
                            {validationErrors.Description && <p className="error-message">{validationErrors.Description}</p>}
                        </div>

                      
 </div>
                     

                        <div className="form-group">
                            <RedButton text={"Update Category"}  btn_Function={()=>{handleSubmit()}}/>
                            
                        </div>
                    </div>
            )}
            
            {/* Minimal CSS for error message to be effective */}
            <style jsx>{`
                .error-message {
                    color: #d9534f;
                    font-size: 0.85em;
                    margin-top: 5px;
                }
            `}</style>
        </div>
    );
}
