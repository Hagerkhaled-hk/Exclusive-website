import { createContext, useEffect, useState } from "react";
import Viewateg from "../../services/APIs/category/ViewCateg";
import DeleteCategory from "../../services/APIs/category/delete_categ";
import toast from "react-hot-toast";



export const CategoryDashboard_Context= createContext();


export default  function CategoryDashboard_Provider({children})
{

const [categories,setCategories]=useState([]);


    async function getCategories() {
          let res =await Viewateg();
          console.log(res);
          
          if(res.statusCode==200)setCategories(res?.data);
          else console.log(res.message);
                
    }

                  

    async function Delete_category(id , name) {
        let res = await DeleteCategory(id);
        console.log(res);
        
        if(res.statusCode!=200)toast.error(res.message);
        else toast.success("deleted sucssesfully");
    }
    return (
        <CategoryDashboard_Context.Provider  value={{getCategories,categories,Delete_category}} >
{children}
        </CategoryDashboard_Context.Provider>
    )
}