import { createContext, useEffect, useState } from "react";
import ViewProducts from "../../services/APIs/products/viewProducts";
import DeleteProduct from "../../services/APIs/products/delete_product";
import toast from "react-hot-toast";
import ProductById from "../../services/APIs/products/get_Product_Id";



export const ProductDashboard_Context= createContext();


export default  function ProductDashboard_Provider({children})
{
    const [products, setProducts] = useState([]);

    async function View_Products() {
        
        let res = await ViewProducts(false);
        console.log(res);
        
        if(res.statusCode===200) setProducts(res?.data);
    }

    async function Delete_product(id , name) {
        toast.loading("Deleting product...", {
  duration: 1500
});
        let res = await DeleteProduct(id) ;
        
        if(res.statusCode!=200)toast.error(res.message || `Unable to delete ${name} `)
        else setTimeout(()=>{View_Products()  ;},500); 
    }
    useEffect(()=>{
        View_Products()
    },[]);

    async function Get_Product_By_id(id ) {
        let res = await ProductById(id) ;
        
        if(res.statusCode==200)return res;
         
    }
    
    useEffect(()=>{
        View_Products()
    },[]);




    return (
        <ProductDashboard_Context.Provider  value={{products,Delete_product,Get_Product_By_id,View_Products}} >
{children}
        </ProductDashboard_Context.Provider>
    )
}