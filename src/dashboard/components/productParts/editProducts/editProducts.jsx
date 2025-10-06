import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductDashboard_Context } from "../../../context/productContext";
import "./editProducts.css";
import ProductById from "../../../../services/APIs/products/get_Product_Id";
import LoadingModal from "../../../../Common/modal/modal";
import { Toaster, toast } from "react-hot-toast";
import UpdateProduct from "../../../../services/APIs/products/update_product";
import Viewateg from "../../../../services/APIs/category/ViewCateg";
import RedButton from "../../../../Common/redButton/redButton";

// Initial state for form data, matching the product structure
const initialFormData = {
    Name: "",
    Description: "",
    Price: 0,
    Stock: 0,
    CategoryId:"", 
    
    UploadImages:[]  // Default value for hidden input
    // Note: 'images' will be handled separately and not initialized with fetched URLs here
};

// Initial state for validation errors
const initialValidation = { 
    Name: "",
    Description: "",
    Price: 0,
    Stock: 0,
    UploadImages:[]
};

export default function EditProduct() {
    const [product, setProduct] = useState({});
    // State to hold and manage form input values
    const [formData, setFormData] = useState(initialFormData);
    const [validationErrors, setValidationErrors] = useState(initialValidation);
    const [loading, setLoading] = useState(true);
    const[categoryOptions,setCategoryOptions]=useState([]);
    const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);
    const [ selectedCategory ,setSelectedCategory]=useState("")
    const{View_Products}=useContext(ProductDashboard_Context);
    useEffect(()=>{
console.log(categoryOptions);


        const Category = categoryOptions.find(option => option.categID === formData.CategoryId) || { Name: "Select Category", value: "" };  
        console.log(Category);
        setSelectedCategory(Category);
        console.log("formData" ,formData);
        

    },[formData,categoryOptions]);      
    // Determine if we should show the "No products found" message

    const { id } = useParams();

async function  update_product() {
toast(
  "Updating your changes....",
  {
    duration: 1000,
  }
);
    //FormData is a built-in interface in the browser's JavaScript environment (Web API). u can use it if the api not requiring objects + not stringfy object in body  
    const data = new FormData();
    console.log("Data",data);
    data.append('Name',formData.Name);
    data.append('Price',formData.Price);
    data.append('Stock',formData.Stock);
    data.append('Description',formData.Description);
    data.append('CategoryId',formData.CategoryId);
    //How to add imgs files in formData (accept blob (binary large object) per file)
    console.log("dd", formData);
[...formData?.UploadImages]?.map((file)=>{ 
    
    data.append('UploadImages',file,file.name); // api takes an array of imgs files 

}) 

     let res = await UpdateProduct(data,id)    
    if(res.statusCode==200){toast.success("Product updated successfully");fetchProduct();
View_Products();

    }
else toast.error( res.message || "Unable to update this product."); 
    
}

async function getCategNames() {
    let res =await Viewateg(true);
 if(res.statusCode==200){const categories=  res?.data.map((item)=>({"categName":item.name,"categID":item.id}) );

 setCategoryOptions(categories);


}
}

async function fetchProduct() {
            try {
                let res = await ProductById(id);
                if (res.statusCode === 200) {
                    const fetchedProduct = res?.data;
                    setProduct(fetchedProduct);

                    setFormData({
                        "Name": fetchedProduct.name || "",
                        "Description": fetchedProduct.description || "",
                        "Price": fetchedProduct.price || 0,
                        "Stock": fetchedProduct.stock || 0,
                        "CategoryId": fetchedProduct.categoryId || "DEFAULT_ID",
                       "UploadImages":[]
                    });
                    getCategNames();
                } else {
                    toast.error("Failed to fetch product data.");
                }
            } catch (error) {
                toast.error("An error occurred while fetching product.");
            } finally {
                // Remove the unnecessary setTimeout. Set loading to false here.
                setLoading(false);
            }
}

    useEffect(() => {

        fetchProduct();
        
    }, [id]); 

    const validateField = (Name, value) => {
        let error = "";
        console.log(Name === "Stock");
        
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
            console.log("val",numValue);
            
            if (isNaN(numValue) || numValue <= 0) {
                error = "Stock must be a  positive number.";
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

            if(Name=="CategoryId")
         {
            console.log("object length",Object.keys(value).length);
            
   if(value==="") error="Choose an category";
else{
   const findCateg = categoryOptions.find((option)=>option.categID==value );
   console.log("finded option" ,findCateg);
   if(!findCateg)error="Choose a category from avalliable options";
   

}         }
       
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
        
        
        // Run validation immediately on change
        validateField(name, value);
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

        if (isNameValid && isPriceValid && isStockValid && isDescriptionValid&&isCategoryId) {
            // Logic for API call to update product
            console.log("Form is valid. Submitting data:", formData);
            // Example: updateProductApi(formData);
            update_product();
        } else {
            toast.error("Please fix the validation errors before submitting.");
        }
    }
    const handleCategorySelect = (value) => {
        // Manually create the synthetic event object for consistency with handleChange
        handleChange({ target: { name:"CategoryId","value":value.categID , type: 'text' } });
        setIsCategorySelectOpen(false);
    };

  
    
   
    return (
        <div className="EditProduct DashboardPage">
            <Toaster position="top-center" reverseOrder={false} />

            {Object.keys(product).length === 0 ? (
                <LoadingModal loading={loading} mainText="No product found with this ID." />
            ) : (
                <div className="form-container">
                    <h2>Edit Product Details</h2>

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
                        </div>
 </div>
                        {/* Hidden Input for Category ID */}
                        <input
                            type="hidden"
                            id="CategoryId"
                            Name="CategoryId"
                            value={formData.CategoryId}
                        />
                          {validationErrors.CategoryId && <p className="error-message">{validationErrors.CategoryId}</p>}

                        <div className="form-group">
                            <RedButton text={"Update Product"}  btn_Function={()=>{handleSubmit()}}/>
                            
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
