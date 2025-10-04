import { useContext, useEffect, useState } from "react";
import "../productParts/viewProducts/viewProducts.css"
import { useNavigate } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import { ProductDashboard_Context } from "../../context/productContext";
import LoadingModal from "../../../Common/modal/modal";
import RedButton from "../../../Common/redButton/redButton";
import Viewateg from "../../../services/APIs/category/ViewCateg";
import { Toaster } from "react-hot-toast";

export default function SelectDiscountProduct() {
  const { products } = useContext(ProductDashboard_Context);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState([]);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]); // State to store selected product IDs

 

  // Function to handle product selection for discount
  const selectDiscountProduct = (productId,categoryID) => {
    setSelectedProducts(prev => {
        console.log('prev',prev);
        
      if (prev.find((item)=>item.productId==productId) ) {
        // If already selected, remove it
        return prev.filter(item => item.productId !== productId);
      } else {
        // If not selected, add it
        return [...prev, {"productId":productId,"categoryID":categoryID}];
      }
    });
  };


function Next()
{
    localStorage.setItem("selectedProducts",JSON.stringify(selectedProducts));
    navigate("/dashboard/discounts/Applydiscounts")
}
  async function getCategories() {
    let res = await Viewateg();
    console.log(res);

    if (res.statusCode == 200) setCategories(res?.data);
    else console.log(res.message);
  }

  function handleChange(e) {
    let category = e.target.value;
    if (category == "All") { setFilter(products); return }

    let filterProducts = products.filter((product) => product?.categoryName == category);
    if (filterProducts.length == 0) setFilter([{ count: 0 }]);
    else setFilter(filterProducts);

    console.log(filterProducts);
  }

  useEffect(() => {
    setFilter([...products]);
  }, [products])

  useEffect(() => {
    getCategories();

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="viewProducts DashboardPage">
      {filter?.length == 0 ?
        <LoadingModal loading={loading} mainText="No products found" />
        :
        <>
          <Toaster position="top-center" reverseOrder={false} />

          <h2>Add discount</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
            <div className="left">
              <p style={{ marginTop: "0px" }}><small style={{ fontSize: "13px", color: "var(--red-color)" }}>Select an product to Edit. </small></p>
              <RedButton text={"Next"} btn_Function={() => { Next() }} />
                <small style={{fontSize:"13px", display:"flex",justifyContent:"start",gap:"5px",alignItems:"center"}}><span style={{background:"var(--red-color)", color:"white",borderRadius:"50%",display:"flex",width:"25px",height:"25px",justifyContent:"center",alignItems:"center" }}>
                    
                    {selectedProducts?.length}</span> Selected </small>

            </div>
            <div className="filter-select">
              <CiFilter />
              <select
                className="custom-filter-select"
                onChange={handleChange}
              >
                <option value={"All"}>All</option>
                {
                  categories?.map((category, id) => <option value={category.name} id={id}>{category.name}</option>)
                }
              </select>
            </div>
          </div>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Select</th>
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
                <tr  >
                  <td colSpan={7} >
                    <LoadingModal loading={false} mainText="No Product Found in this categroy" />
                  </td>
                </tr>
                :
                filter?.map((product, id) => (
                  <tr style={{cursor:"default"}} >
                    <td data-label="Select: " onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedProducts.some((item)=> {console.log(item?.productId===product.id)
                       return (item?.productId===product.id)})   }
                        onChange={() => selectDiscountProduct(product.id,product.categoryId)}
                      />
                    </td>
                    <td data-label="ID: " >{id + 1}</td>
                    <td className="img-table" >
                      <div className="images">
                        <div className="img-container">{product.images.map((image, id) => <img id={id} src={image} alt="" />)}</div>
                      </div>
                    </td>
                    <td data-label="Name: " >{product.name}</td>
                    <td data-label="Category: " >{product.categoryName}</td>
                    <td data-label="Stock: " >{product.stock}</td>
                    <td data-label="Price:  " >{product.price}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      }
    </div>
  );
}