import RatingStars from "../RatingStars/RatingStars";
import {Link, useNavigate} from "react-router-dom"
import "./ProductCards.css";
import AddTOCart from "../../services/APIs/cart/addToCart";
import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../../context/cartContext/cartContext";
import toast, { Toaster } from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Spinner } from "react-bootstrap";
import { UserContext } from "../../context/userContext/userContext";
import { motion } from "motion/react"
import AddToWishlist from "../../services/APIs/wishlist/addToWishlist";
import { WishlistContext } from "../../context/wishlistContext/wishlistContext";
import RemoveWishlist from "../../services/APIs/wishlist/removeWishlist";
import { FaRegTrashCan } from "react-icons/fa6";
import LoadingModal from "../../Common/modal/modal";
export default function ProductCards({ products }) {
  
  const Navigate =useNavigate();
  const [loading,setLoading]=useState(true);
  const {setCart_All_State}=useContext(CartContext);
    const{getToken,isLogin} =useContext(UserContext);
    const {fetchWishlist}=useContext(WishlistContext);





async function addToCart(data)
  {

         let token =getToken();
    if(token){
    
    let res =await AddTOCart(data,token);
    if(res.succeeded) {toast.success('Successfully added to cart!')
setCart_All_State();    
}
else  if(res.statusCode=400) toast.error(res?.message)
  } 

    
  }



  async function AddTOWishlist(data)
  {     
    let token =getToken();
    if(token){  
      let res =await AddToWishlist(data,token);
      if(res.succeeded) {toast.success('Successfully added to wishlist!');fetchWishlist();}
      else  if(res.statusCode=400) toast.error(res?.message)
       }
  }

  async function DeleteFromWishlist(id)
  {     
    
    let token =getToken();  
    if(token){  
      let res =await RemoveWishlist({productId:id},token);
      if(res.succeeded) {toast.success('Successfully removed from wishlist!');fetchWishlist();}
      else  if(res.statusCode=400) toast.error(res?.message)
  }
  }
  
  useEffect(()=>{

    setTimeout(() => {
setLoading(false);
    },5000);
  },[])
  
  return (
    <div className="products-Cards  ">

    
      <Toaster
  position="top-center"
  reverseOrder={false}
/>

  <div className="products-container">
      {
      
      products.length==0 ? 
      
      <LoadingModal  loading={loading} text={"products"} mainText={  "Something went wrong while loading the products. Please give it another try by reloading the page.  "} />
      
      :
      products.map((product ) => {
        
        
        return(

        
        <motion.div  

          initial={{ opacity: 0, y: 50 }}
 
 whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0 }}
        className="card " key={product.id}>
          <div
         
          
          className="product-card">
          
            <div className="img-container">
                <div className="fav-icon">


                <button
                 onClick={()=>{
                  product?.productImageUrl ? 
DeleteFromWishlist(product.productId)
                  :
            (      isLogin()?
                  
                  AddTOWishlist(
                  {
  "productId": product.id || product.productId
                  }
                )
              :
              Navigate("/signup"))
              
              }} 
              
                            

              >
                {
                product?.productImageUrl ?<FaRegTrashCan/> :  
                              < FaRegHeart /> }


                                    </button>
             
                <Link  to = {`/product/${product.id || product.productId}`} className="view-icon">
                <IoEyeOutline />
                                    </Link>
            </div>
              <div className="image">

            <img src={product?.productImageUrl || product?.images[0] } alt={product.name} />
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
            <h3>{product.name || product.productName}</h3>
           
   <div className="price-rate">
              <span className="price">${product.price}</span>
                            <span className="sale">${product.price}</span>

            </div>


            <div className="stars">
              <RatingStars rating={5} />
              <span className="reviews">(65)</span>
            </div>
         
          </div>
        </motion.div>


      )})
      
      }
      </div>
    </div>
  );
}
