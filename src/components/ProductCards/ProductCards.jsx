import { FaHeart } from "react-icons/fa";
import RatingStars from "../RatingStars/RatingStars";
import {Link} from "react-router-dom"
import "./ProductCards.css";
import AddTOCart from "../../services/APIs/addToCart";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext/cartContext";
import toast, { Toaster } from "react-hot-toast";

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
        <div key={product.id}>
          <div className="product-card">
            <div className="fav-icon">
              <FaHeart />
            </div>
            <Link to = {`/product/${product.id}`}>
            <img src={product.images} alt={product.name} />
                        </Link>

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
            </div>

            <div className="stars">
              <RatingStars rating={product.rating} />
              <span className="reviews">({product.reviews} reviews)</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
