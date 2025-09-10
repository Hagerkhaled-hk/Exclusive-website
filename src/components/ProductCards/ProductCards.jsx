import { FaHeart } from "react-icons/fa";
import RatingStars from "../RatingStars/RatingStars";
import {Link} from "react-router-dom"
import "./ProductCards.css";
import AddTOCart from "../../services/APIs/addToCart";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext/cartContext";
import toast, { Toaster } from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

export default function ProductCards({ products }) {
  
  const {setCart_All_State}=useContext(CartContext);
async function addToCart(data)
  {
    
    let res =await AddTOCart(data);
    console.log(res);
    if(res.succeeded) toast.success('Successfully added to cart!')
setCart_All_State();    
    
  }
  
  return (
    <div className="products-container">
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
  
      {products.map((product) => (
        <div className="card" key={product.id}>
          <div className="product-card">
            <div className="fav-icon">
                <Link  to = {`/wishlist/${product.name}`}>
                < FaRegHeart /> 

                                    </Link>
             
                <Link className="image-container" to = {`/product/${product.name}`}>
                <IoEyeOutline />
                                    </Link>
            </div>
            <div className="img-container">
            <img src={product.images} alt={product.name} />

            </div>
          


            <button onClick={()=>{
              addToCart({
  "productId": product.id,
  "quantity": 1
})}} className="add-to-cart">Add to Cart</button>
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
