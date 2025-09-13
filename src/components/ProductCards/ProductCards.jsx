import { FaHeart } from "react-icons/fa";
import RatingStars from "../RatingStars/RatingStars";
import {Link, useNavigate} from "react-router-dom"
import "./ProductCards.css";
import AddTOCart from "../../services/APIs/addToCart";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext/cartContext";
import toast, { Toaster } from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Spinner } from "react-bootstrap";
import { UserContext } from "../../context/userContext/userContext";

export default function ProductCards({ products }) {
  
  const {setCart_All_State}=useContext(CartContext);
  const Navigate =useNavigate();
    const{getToken,isLogin} =useContext(UserContext);
  
async function addToCart(data)
  {

        let token =getToken();
    if(token){
    
    let res =await AddTOCart(data,token);
    console.log(res);
    if(res.succeeded) toast.success('Successfully added to cart!')
setCart_All_State();    
  }
    
  }

  console.log(products);
  
  
  return (
    <div className="products-container">
      <Toaster
  position="top-center"
  reverseOrder={false}
/>

  
      {
      
      products.length==0 &&<Spinner style={{margin:"25% 0px 25%  50%   ", }} animation="border" /> 
      }
      {
      products.map((product) => (
        <div className="card" key={product.id}>
          <div className="product-card">
          
            <div className="img-container">
                <div className="fav-icon">
                <Link  to = {`/wishlist/${product.id}`}>
                < FaRegHeart /> 

                                    </Link>
             
                <Link  to = {`/product/${product.id}`}>
                <IoEyeOutline />
                                    </Link>
            </div>
              <div className="image">

            <img src={product.images[0]} alt={product.name} />
              </div>

            </div>

            <button  onClick={()=>{ 
              isLogin()?
              addToCart({
  "productId": product.id,
  "quantity": 1
})
:
Navigate("/signup")
}} className="add-to-cart">Add to Cart</button>          


          </div>

          <div className="product-info">
            <h3>{product.name}</h3>
            <div className="price-rate">
              <span className="price">${product.price}</span>
                            <span className="sale">${product.price}</span>

            </div>

            <div className="stars">
              <RatingStars rating={5} />
              <span className="reviews">(65)</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
