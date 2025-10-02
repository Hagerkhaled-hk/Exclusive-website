import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ProductDashboard_Context } from "../../../context/productContext";
import "./editProducts.css"
import ProductById from "../../../../services/APIs/products/get_Product_Id";
import LoadingModal from "../../../../Common/modal/modal";

export default function EditProduct()
{

    const [product,setProduct]=useState({});
    const [loading,setLoading]=useState(true);
const {id} = useParams();

useEffect(()=>{
    console.log(id);
 (async()=>{

 let res = await ProductById(id) ;
 if(res.statusCode==200)setProduct(res?.data);   

 })()

 setTimeout(()=>{
    setLoading(false);
 },2000)
    
})

    return <div className="EditProduct DashboardPage">
        {products.length ==0?
                   
                  <LoadingModal loading={loading} text="No products found" />
                  :
                  <>  
                            <Toaster position="top-center" reverseOrder={false} />
         <div class="form-container">
        <h2>Product Details</h2>

        <form action="#" method="POST" enctype="multipart/form-data">

            <div class="form-group">
                <label for="productName" class="required">Name</label>
                <input type="text" id="productName" name="productName" placeholder="Enter product name" required/>
            </div>

            <div class="form-group">
                <label for="productDescription">Description</label>
                <textarea id="productDescription" name="productDescription" placeholder="Provide a detailed description of the product"></textarea>
            </div>

            <div class="form-group">
                <label for="productPrice" class="required">Price</label>
                <input type="number" id="productPrice" name="productPrice" placeholder="e.g., 29.99" step="0.01" required/>
            </div>

            <div class="form-group">
                <label for="productStock" class="required">Stock</label>
                <input type="number" id="productStock" name="productStock" placeholder="e.g., 150" required/>
            </div>

            <div class="form-group">
                <label for="uploadImages">Upload Images</label>
                <div class="file-input-wrapper">
                    <input type="file" id="uploadImages" name="productImages[]" multiple accept="image/*"/>
                    <span>Click to select images or drag & drop here</span>
                </div>
            </div>

            <input type="hidden" id="categoryId" name="categoryId" value="YOUR_CATEGORY_ID_HERE"/>

            <div class="form-group">
                <button type="submit">Add Product</button>
            </div>

        </form>
        </div>
        </>
        }
    </div>
}