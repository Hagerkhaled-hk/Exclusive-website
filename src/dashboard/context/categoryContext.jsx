import { createContext, useEffect, useState } from "react";
import Viewateg from "../../services/APIs/category/ViewCateg";
import DeleteCategory from "../../services/APIs/category/delete_categ";
import toast from "react-hot-toast";
import UpdateProduct from "../../services/APIs/products/update_product";
import UpdateCategory from "../../services/APIs/category/update_categ";



export const CategoryDashboard_Context= createContext();


export default  function CategoryDashboard_Provider({children})
{

const [categories,setCategories]=useState([]);


    async function getCategories() {
          let res =await Viewateg(true,false);
          console.log(res);
          
          if(res.statusCode==200)setCategories(res?.data);
          else console.log(res.message);
                
    }

                  

    async function Delete_category(id ,name ,description) {

        toast.loading("Archiving category...", {
  duration: 2000
});
let newName="";
        if(name.includes("##ARCHIVE"))newName=name.split("##ARCHIVE")[0];
        else newName=name+"##ARCHIVE"
        
let res = await UpdateCategory({"name":newName,  "description": description},id);
console.log(res);

       /*  let res = await DeleteCategory(id);
        console.log(res);
         */
        if(res.statusCode!=200)toast.error(res.message);
        else {toast.success("Done sucssesfully");
        getCategories();}
    }
    return (
        <CategoryDashboard_Context.Provider  value={{getCategories,categories,Delete_category}} >
{children}
        </CategoryDashboard_Context.Provider>
    )
}