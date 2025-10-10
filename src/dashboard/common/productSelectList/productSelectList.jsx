import { useContext, useEffect, useState } from "react";
import "../../components/productParts/viewProducts/viewProducts.css"
import { CiFilter } from "react-icons/ci";
import { ProductDashboard_Context } from "../../context/productContext";
import LoadingModal from "../../../Common/modal/modal";
import RedButton from "../../../Common/redButton/redButton";
import Viewateg from "../../../services/APIs/category/ViewCateg";
import { Toaster } from "react-hot-toast";
import OutOfStock from "../../../Common/outOfStock/outOfStock";

export default function ProductSelectList({Get_LocalStorage_Data,selectedProducts,Next,selectDiscountProduct,setSelectedProducts,visibleQuantity=false,handleQuantityChange,
  selectOrderProduct ,Title=""}) {
 const { products } = useContext(ProductDashboard_Context);
 const [loading, setLoading] = useState(true);
 const [filter, setFilter] = useState([]);
 const [categories, setCategories] = useState([]);


 




 async function getCategories() {
  let res = await Viewateg();
  console.log(res);

  if (res.statusCode == 200) setCategories(res?.data);

 }

 function handleChange(e) {
  let category = e.target.value;
  if (category == "All") { setFilter(products); return }

  let filterProducts = products.filter((product) => product?.categoryName == category);
  if (filterProducts.length == 0) setFilter([{ count: 0 }]);
  else setFilter(filterProducts);

 }


 function selectAll(e)
 {
    if(e.target.checked){
     let allData=[];
     filter.map((item)=>{ 
    
   !visibleQuantity?
      allData.push({"productId":item.id,"categoryID":item.categoryId})  
      :
      setOrderSellectedToAll(allData,item);
     })
      setSelectedProducts(allData)
    }
    else setSelectedProducts([]);
}

function setOrderSellectedToAll(allData,item)
{

  const productExists=selectedProducts.find((current)=>current.productId===item.id);
        if(productExists)allData.push(productExists);
        else if(item.stock) allData.push({"productId":item.id,"quantity":1});
}

 useEffect(() => { 
  getCategories();
  setTimeout(() => {
   setLoading(false);
  }, 5000);
 }, []);


 useEffect(() => {
  setFilter([...products]);
  
 Get_LocalStorage_Data();
    
  }, [products])
 
  




 return (
  <div className="viewProducts DashboardPage">
   {filter?.length == 0 ?
    <LoadingModal loading={loading} mainText="No products found" />
    :
    <>
     <Toaster position="top-center" reverseOrder={false} />

     <h2>{Title}</h2>
     <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
      <div className="left">
       <p style={{ marginTop: "0px" }}><small style={{ fontSize: "13px", color: "var(--red-color)" }}>Select an product to Edit. </small></p>

       <RedButton text={"Next"} btn_Function={() => { Next() }} />

  
<small style={{fontSize:"13px", display:"flex",justifyContent:"start",gap:"5px",alignItems:"center"}}><span style={{background:"var(--red-color)", color:"white",borderRadius:"50%",display:"flex",width:"25px",height:"25px",justifyContent:"center",alignItems:"center" }}>
          
          {selectedProducts?.length}</span> Selected </small>      



      </div>
      <div className="right">


      <div className="filter-select">
       <CiFilter />
       <select
        className="custom-filter-select"
        onChange={handleChange}
       >
        <option value={"All"}>All</option>
        {
         categories?.map((category, id) => <option value={category.name} id={id} key={id}>{category.name}</option>)
        }
       </select>
      </div>




      </div>

     </div>

<div style={{ fontSize:"13px"}} className="form-input d-flex justify-content-start align-items-center mt-3 ms-1 mb-0">
<input value="selectAll"  onChange={selectAll} id="selectAll" type="checkbox" />
<label htmlFor="selectAll" className="m-0 ms-1 ">select All</label>

</div>
     <table className="orders-table">
      <thead>
       <tr>
        <th>Select</th>
                <th style={{display:visibleQuantity?"block":"none"}}>Quantity</th>
        <th>ID</th>
        <th>Images</th>
        <th>Name</th>
        <th>Category</th>
        <th>Stock</th>
        <th>Price</th>
       </tr>
      </thead>
      <tbody>
       {(filter?.length == 1 && filter[0]?.count == 0) ?
        <tr >
         <td colSpan={9} > 
          <LoadingModal loading={false} mainText="No Product Found in this categroy" />
         </td>
        </tr>
        :
        filter?.map((product, id) => {
                  // Retrieve the current quantity from the order state, default to 1
            const selectedProduct= selectedProducts.find((item)=>item.productId==product.id)
                  
                  return (
         <tr style={{cursor:"default"}} key={product.id}>
          <td data-label="Select: " onClick={(e) => e.stopPropagation()}>
           <input
            type="checkbox"
            checked={selectedProducts.some((item)=>(item?.productId===product.id))  }
            onChange={() => 
              {!visibleQuantity ? selectDiscountProduct(product.id,product.categoryId ):selectOrderProduct(product.id,1,product.stock)}}
           />
          </td>
                    {/* Quantity Input */}
                    <td style={{display:visibleQuantity?"block":"none"}} data-label="Quantity: " onClick={(e) => e.stopPropagation()}>
                        <input
                          type="number"
                          min="1"
                          // Ensures input is controlled, using state quantity or default of 1
                          value={selectedProduct?.quantity||1} 
                          onChange={(e) => handleQuantityChange(product.id, e,product?.stock)}
                          style={{ width: '60px', padding: '5px', textAlign: 'center' }}
                        />
                      </td>
          <td data-label="ID: " >{id + 1}</td>
          <td className="img-table" >
           <div className="images">
            <div  className="img-container">{product.images.map((image, idx) => <img key={idx} src={image} alt="" />)}
            {
              !product.stock ? 
            <OutOfStock/>
            :
            ""
            }
            </div>
           </div>
          </td>
          <td data-label="Name: " >{product.name}</td>
          <td data-label="Category: " >{product.categoryName}</td>
          <td data-label="Stock: " >{product.stock}</td>
          <td data-label="Price: " >{product.price}</td>
         </tr>
        )})}
      </tbody>
     </table>
    </>
   }
  </div>
 );
}