import { useNavigate } from "react-router-dom";
import ProductSelectList from "../../../common/productSelectList/productSelectList";
import { useEffect, useState } from "react";

export default function ProductSelectAdd_order() {
  const navigate = useNavigate();
  

   const [selectedProducts, setSelectedProducts] = useState([]);




  const handleQuantityChange = (productId, e,stock) => {
    const quantity = parseInt(e.target.value);  
    console.log("stock" ,stock);
    console.log(!isNaN(quantity) && quantity >= 1 && quantity <=stock);
    console.log("productId",productId);
    
    
    if (!isNaN(quantity) && quantity >= 1 && quantity <=stock) {
        setNewQuantity(productId, quantity);
    } else if (quantity === 0) {
       setSelectedProducts(productId,quantity,stock);
    }
  };

function Next()
{
  
   
    navigate("/dashboard/order/addOrder");
    
}


  function get_Selected_Order_localstorage()
  {
   let SelectedProducts_local = localStorage.getItem("OrderselectedProducts");
   
if(!SelectedProducts_local)return;
     SelectedProducts_local=JSON.parse(SelectedProducts_local);
     setSelectedProducts(SelectedProducts_local);



  }

  const selectOrderProduct = (productId, quantity,stock) => {
    // Ensure quantity is a number and at least 1, or default to 1 if invalid
    const newQuantity = Math.min( Math.max(1, Number(quantity) || 1) ,stock); 
console.log("newQuantity",newQuantity);
if(stock===0)return;

    setSelectedProducts(prev => {
      const existingProduct = prev.find(item => item.productId === productId);
      
      if (existingProduct) {
  
      
        return  prev.filter((item)=>item.productId!==productId)
      } 

      return [... prev,{ "productId":productId, "quantity": newQuantity }];
    });
  };


  function setNewQuantity(productId,quantity)
  {
console.log("quantity",quantity);

    const existingProduct = selectedProducts.find(item => item.productId === productId);

     if(existingProduct)
     {
      existingProduct.quantity=quantity;
        setSelectedProducts([...selectedProducts]);
       console.log([...selectedProducts]);
      
     }
  
  }



  useEffect(()=>{

    localStorage.setItem("OrderselectedProducts",JSON.stringify(selectedProducts));
    
  },[selectedProducts])

  return (
    <ProductSelectList  Get_LocalStorage_Data={get_Selected_Order_localstorage} Next={Next}
     visibleQuantity={true} handleQuantityChange={handleQuantityChange}
selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts}
    selectOrderProduct={selectOrderProduct} Title="Add order"
    />
  );
}