import { useNavigate } from "react-router-dom";
import ProductSelectList from "../../../common/productSelectList/productSelectList";
import { useState } from "react";

export default function ProductSelectAdd_order() {
  const navigate = useNavigate();
  

   const [selectedOrderProducts, setSelectedOrderProducts] = useState([]);




  const handleQuantityChange = (productId, e) => {
    const quantity = parseInt(e.target.value);
    
    if (!isNaN(quantity) && quantity >= 1) {
        selectOrderProduct(productId, quantity);
    } else if (quantity === 0) {
       setSelectedOrderProducts(prev => prev.filter(item => item.productId !== productId));
    }
  };

function Next()
{
  
   
    navigate("/dashboard/order/addOrder");
}


  function get_Selected_localstorage(setSelectedProducts)
  {
   let SelectedProducts_local = localStorage.getItem("OrderselectedProducts");
   
if(!SelectedProducts_local)return;
     SelectedProducts_local=JSON.parse(SelectedProducts_local);
     setSelectedProducts(SelectedProducts_local);



  }

  const selectOrderProduct = (productId, quantity,stock) => {
    // Ensure quantity is a number and at least 1, or default to 1 if invalid
    const newQuantity = Math.min( Math.max(1, Number(quantity) || 1) ,stock); 

    setSelectedOrderProducts(prev => {
      const existingProduct = prev.find(item => item.productId === productId);
      
      if (existingProduct) {
        return prev.map(item => 
          item.productId === productId 
            ? { ...item, quantity: newQuantity } 
            : item
        );
      } else if (newQuantity > 0) {
        return [...prev, { productId, quantity: newQuantity }];
      }
      return prev;
    });
  };




  return (
    <ProductSelectList  get_Selected_localstorage={get_Selected_localstorage} Next={Next}
        IsStateFunction={true}

    />
  );
}