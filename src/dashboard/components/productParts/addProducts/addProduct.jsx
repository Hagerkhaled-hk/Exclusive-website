import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductDashboard_Context } from "../../../context/productContext";
import "../../productParts/viewProducts/viewProducts.css";
import { Toaster, toast } from "react-hot-toast";
import RedButton from "../../../../Common/redButton/redButton";
import Viewateg from "../../../../services/APIs/category/ViewCateg";
import Add_Product from "../../../../services/APIs/products/add_product";
import"../editProducts/editProducts.css"
import { DashboardContext } from "../../../context/dashboardContext";

// Initial state for form data, matching the product structure

export default function  AddProduct() {
    // State to hold and manage form input values
    const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    Price: 0,
    Stock: 0,
    CategoryId:"", 
   UploadImages:[]  // Default value for hidden input
    // Note: 'images' will be handled separately and not initialized with fetched URLs here
});
    const [validationErrors, setValidationErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const[categoryOptions,setCategoryOptions]=useState([{categID:"" ,name:""}]);
    const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);
    const [ selectedCategory ,setSelectedCategory]=useState("")
    const{View_Products}=useContext(ProductDashboard_Context);
    const{isAdminLogin,demoDashboard}=useContext(DashboardContext);

    useEffect(()=>{
console.log(formData);

        const Category = categoryOptions.find(option => option.categID === formData.CategoryId) || { categName: "Select Category", value: "" };  
        console.log(Category);
        
        setSelectedCategory(Category);
        

    },[formData,categoryOptions]);      
    // Determine if we should show the "No products found" message

useEffect(()=>{getCategNames();
},[])

async function getCategNames() {
    let res =await Viewateg(true);
 if(res.statusCode==200){const categories=  res?.data.map((item)=>({"categName":item.name,"categID":item.id}) );

 setCategoryOptions(categories);


}
}

async function add_product() {
     //Demo Dashboard
   if(demoDashboard){toast.success("Added Successfully (Simulation)",{duration:1500});  return;}

        // --- API Submission ---
      if(isAdminLogin && !demoDashboard){



    toast(
  "Adding Product....",
  {
    duration: 1500,
  }
);
    //FormData is a built-in interface in the browser's JavaScript environment (Web API). u can use it if the api not requiring objects + not stringfy object in body  
    const data = new FormData();
    data.append('Name',formData.Name);
    data.append('Price',formData.Price);
    data.append('Stock',formData.Stock);
    data.append('Description',formData.Description);
    data.append('CategoryId',formData.CategoryId);
    //How to add imgs files in formData (accept blob (binary large object) per file)
[...formData?.UploadImages]?.map((file)=>{ 
    
    data.append('UploadImages',file,file.name); // api takes an array of imgs files 

})

for (const item of data.entries()) {
    console.log('item', item);
}

    let res = await Add_Product(data) ;
    if(res.statusCode==200){toast.success(" product added Successfully ")
        setFormData({
    Name: "",
    Description: "",
    Price: 0,
    Stock: 0,
    CategoryId:"", 
   UploadImages:[] 
});
        View_Products();}
    else toast.error("Unable to add product,Try again or Ensure if you set all required data");
}
}


    const validateField = (Name, value) => {
        let error = "";
        console.log(Name , value);
        
        // --- Name Validation ---
        if (Name === "Name") {
            if (value.trim().length < 3) {
                error = "Name must be at least 3 characters long.";
            } else if (value.trim().length > 100) {
                error = "Name cannot exceed 100 characters.";
            }
        }
        
        // --- Price Validation ---
        if (Name === "Price") {
            const numValue = parseFloat(value);
            if (isNaN(numValue) || numValue <= 0) {
                error = "Price must be a positive number.";
            }
        }
        
        // --- Stock Validation ---
        if (Name === "Stock") {
            const numValue = parseInt(value);
            if (isNaN(numValue) || numValue <= 0) {
                error = "Stock must be a postive number.";
            }

        }   

        // --- Description Validation ---
        if (Name === "Description") {
            if (value.trim().length > 500) {
                error = "Descriptixon cannot exceed 500 characters.";
            }
             else if(value.trim().length <10) 
           {
                            error = "Description must be longer than 10 characters.";

           }
        }
         if(Name=="UploadImages")
         {
            console.log("object length",Object.keys(value).length);
            
   if(Object.keys(value).length==0 ) error="At least one photo for the product";
         }
         if(Name=="CategoryId")
         {
            console.log("object length",Object.keys(value).length);
            
   if(value==="") error="Choose an category";
else{
   const findCateg = categoryOptions.find((option)=>option.categID==value );
   console.log("finded option" ,findCateg);
   if(!findCateg)error="Choose a category from avalliable options";
   

}         }
console.log("validation ERROrs ===================",validationErrors);

        setValidationErrors(prev => ({ ...prev, [Name]: error }));
        return error.length === 0; // Return true if valid
    };


    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        
        let newValue = value;
        
        // Convert numeric inputs to number type for consistency
        if (type === 'number') {
            newValue = parseFloat(value) || 0;
        }
        if (type === 'file') {
            
            newValue = files ; 
/*             console.log(typeof(files));
 */            
        }

        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));
        console.log("value||files",value||files);
        
        // Run validation immediately on change
        validateField(name, value||files);
    };

    // --------------------------------------------------------
    // 4. Form Submission (Placeholder)
    // --------------------------------------------------------
    const handleSubmit = () => {
        
        // Re-validate all fields on submit
        const isNameValid = validateField('Name', formData.Name);
        const isPriceValid = validateField('Price', formData.Price);
        const isStockValid = validateField('Stock', formData.Stock);
        const isDescriptionValid = validateField('Description', formData.Description);
        const isCategoryId= validateField('CategoryId', formData.CategoryId);
        const isUploadImagesValid = validateField('UploadImages', formData.UploadImages);

        if (isNameValid && isPriceValid && isStockValid && isDescriptionValid &&isUploadImagesValid&&isCategoryId) {
            // Logic for API call to update product
            console.log("Form is valid. Submitting data:", formData);
            // Example: updateProductApi(formData);
 add_product();
         } else {
            toast.error("Please fix the validation errors before submitting.");
        }   
    }

    const handleCategorySelect = (value) => {
        console.log( "value",value);
        
        // Manually create the synthetic event object for consistency with handleChange
        handleChange({ target: { name:"CategoryId","value":value.categID , type: 'text' } });
        setIsCategorySelectOpen(false);
    };

  
    
   
    return (
        <div className="EditProduct ViewProducts DashboardPage AddProduct ">
            <Toaster position="top-center" reverseOrder={false} />

                <div className="form-container">
                    <h2>Add Product</h2>

                    <div >

                        <div className="form-group">
                            <label htmlFor="productName" className="required">Name</label>
                            <input
                                type="text"
                                id="productName"
                                Name="Name" // Important: match the key in formData state
                                placeholder="Enter product Name"
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

                        <div className="form-group">
                            <label htmlFor="productPrice" className="required">Price</label>
                            <input
                                type="number"
                                id="productPrice"
                                Name="Price" // Important: match the key in formData state
                                placeholder="e.g., 29.99"
                                step="0.01"
                                value={formData.Price}
                                onChange={handleChange}
                                required
                            />
                            {validationErrors.Price && <p className="error-message">{validationErrors.Price}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="productStock" className="required">Stock</label>
                            <input
                                type="number"
                                id="productStock"
                                Name="Stock" // Important: match the key in formData state
                                placeholder="e.g., 150"
                                value={formData.Stock}
                                onChange={handleChange}
                                required
                            />
                            {validationErrors.Stock && <p className="error-message">{validationErrors.Stock}</p>}
                        </div>

                        {/* --- Upload Images (File Input) --- */}
                        <div className="form-group">
                            <label htmlFor="uploadImages">Upload New Images</label>
                            <div className="file-input-wrapper">
                                <input
                                    type="file"
                                    id="uploadImages"
                                    Name="UploadImages" 
                                    multiple
                                    accept="image/*"
                                    onChange={handleChange}

/>
                                <span>{formData.UploadImages?.length?[...formData.UploadImages].map((file)=>file.name):"Click to select images or drag & drop here" }</span>
                            </div>
                                 {validationErrors.UploadImages && <p className="error-message">{validationErrors.UploadImages}</p>}
                        </div>
                        <div className="form-group" style={{position:"relative"}}>

 <label className="required">Category</label>
                            
                            <div 
                                className={`custom-select-trigger ${isCategorySelectOpen ? 'focused' : ''}`}
                                onClick={() => setIsCategorySelectOpen(!isCategorySelectOpen)}
                                tabIndex="0"
                                onBlur={() => setTimeout(() => setIsCategorySelectOpen(false), 150)}
                            >
                                {selectedCategory.categName}
                                <span className="dropdown-arrow">{isCategorySelectOpen ? '▲' : '▼'}</span>
                            </div>

                            {isCategorySelectOpen && (
                                <div className="custom-select-options">
                                    {categoryOptions.map((option) => (
                                        <div
                                            key={option.categID}
                                            className={`custom-select-option ${option.categID === formData.CategoryId ? 'selected' : ''}`}
                                            onClick={() => handleCategorySelect(option)}
                                        >
                                            {option.categName}
                                        </div>
                                    ))}
                                </div>
                            )}
                                 {validationErrors.CategoryId && <p className="error-message">{validationErrors.CategoryId}</p>}
                        </div>
 </div>
                        {/* Hidden Input for Category ID */}
                        <input
                            type="hidden"
                            id="CategoryId"
                            Name="CategoryId"
                            value={formData.CategoryId}
                        />

                        <div className="form-group">
                            <RedButton text={"Add Product"}  btn_Function={()=>{handleSubmit()}}/>
                            
                        </div>
                    </div>
            
            
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
