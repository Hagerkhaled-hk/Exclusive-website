import {  useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import RatingStars from "../../components/RatingStars/RatingStars";
import { CiHeart } from "react-icons/ci";
import "./ProductDetail.css";
import ProductById from "../../services/APIs/products/get_Product_Id";
import DynamicIndex from "../../Common/DynamicIndex/DynamicIndex";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import toast, { Toaster } from "react-hot-toast";
import { CartContext } from "../../context/cartContext/cartContext";
import { UserContext } from "../../context/userContext/userContext";
import AddToWishlist from "../../services/APIs/wishlist/addToWishlist";
import AddTOCart from "../../services/APIs/cart/addToCart";
import LoadingModal from "../../Common/modal/modal";
import OutOfStock from "../../Common/outOfStock/outOfStock";


export default function ProductDetail() {
  const { id } = useParams();
const [products ,setProducts]=useState([]);
const [activeImageIndex, setActiveImageIndex] = useState(0);
  const navigate =useNavigate();

  const{getToken,isLogin} =useContext(UserContext);
  const{setCart_All_State,addToCart} =useContext(CartContext);
  const [loading, setLoading] = useState(true);



  async function AddTOWishlist(data)
  {     
    if (!products.stock) return;

    let token =getToken();
    if(token){  
      let res =await AddToWishlist(data,token);
      if(res.succeeded) {toast.success('Successfully added to wishlist!');fetchWishlist();}
      else {toast.error(res?.message)}
       }
  }


   useEffect(()=>{
          if(!isLogin()) navigate("/signup");
else{

  (async()=>{
    let res =await ProductById(id)
if(res.statusCode!==200)return;
 setProducts(res?.data);
  })()

  setTimeout(() => {
    setLoading(false);
  }, 2000);
 
}

   },[id])
 
 

  const [color, setColor] = useState("blue");
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity((q) =>(products.stock <= q ?q : q + 1));
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));


  if (!products) {
    console.log(products);
    
    return       <LoadingModal loading={false}  text="product Not Found"/>
;
  }

  return (
    <div className="product-detail">
      {
products?.length!==0 ?
<>
     <Toaster
  position="top-center"
  reverseOrder={false}
/>
<div className="top">

      <DynamicIndex page={["account",products.categoryName,products.name]} />
</div>
<div className="down">
 <div className="images">
   <div className="altImages">

       <Swiper
        direction={'vertical'}
        slidesPerView={4}
        autoplay={{
          delay: 1500,
        }}
        speed={1000}
        className="mySwiper"
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Navigation]}
        breakpoints={
{
0:{
slidesPerView:1,
 direction:'horizontal',
},
336:{
slidesPerView:2,
 direction:'horizontal',
}
,
  526:{
     direction:'horizontal',
             slidesPerView:3
  },
  681:{
    direction:'vertical'  }
}
        }
      >
        {
       
      
        products?.images?.length==1 ?
 <SwiperSlide >
            <div className={`image active`} onClick={() => setActiveImageIndex(index)}>
              <img src={products.images[0]} alt={products.name} />
            </div>
          </SwiperSlide>
        :
        
        products?.images?.map((_, index) => (
          <SwiperSlide key={index}>
            <div className={`image ${activeImageIndex===index?"active":""}`} onClick={() => setActiveImageIndex(index)}>
              <img src={products.images[index]} alt={products.name} />
            </div>
          </SwiperSlide>
        ))
        
        }
        {/* Custom navigation buttons */}
        <div className="swiper-button-prev vertical-nav"></div>
        <div className="swiper-button-next vertical-nav"></div>
      </Swiper>
   </div> 

      <div className="image-section">
     
 
        <div className="image">

{
  !products.stock ?
    <OutOfStock/>
  :
  ""

}
        <img src={products.images[activeImageIndex]} alt={products.name} />
        </div>
      </div>
 </div>
 

      <div className="info-section">
        <h2>{products.name} <span style={{fontWeight:"bold" , textTransform:"capitalize"}}>{products.categoryName}</span></h2>

        <div className="stars-container">
          <RatingStars rating={4.5} />
          <span className="reviews">(65 reviews)</span>
        </div>

        <p className="price">${products.price}</p>

        <p className="description">{products.description}</p>
<hr className="split" />
      <div className="section">
          <span>Colours:</span>
          <div className="colors">
            <button
              className={`circle ${color === "blue" ? "active" : ""}`}
              style={{ background: "lightblue" }}
              onClick={() => setColor("blue")}
            ></button>
            <button
              className={`circle ${color === "red" ? "active" : ""}`}
              style={{ background: "red" }}
              onClick={() => setColor("red")}
            ></button>
          </div>
        </div>

        <div className="section">
          <span>Size:</span>
          <div className="sizes">
            {["XS", "S", "M", "L", "XL"].map((s) => (
              <button
                key={s}
                className={`size-btn ${size === s ? "active" : ""}`}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>


        <div className="actions">
          <div className="qty">
            <button disabled={!products.stock} onClick={handleDecrease}>-</button>
            <span>{quantity}</span>
            <button disabled={!products.stock} onClick={handleIncrease}>+</button>
          </div>
          <button  disabled={!products.stock}  onClick={()=>{
            !isLogin()?
            navigate("/signup")
            :
                          addToCart({
  "productId": products.id,
  "quantity": quantity
},products.name,quantity)
          }} className="buy-btn">Add to cart</button>

          <button disabled={!products.stock} onClick={()=>{
isLogin()?
AddTOWishlist(
                  {
  "productId": products.id 
                  }
                )
              :
              navigate("/signup")

          }}   className="heart"><CiHeart />
          </button>
        </div>

      </div>
      </div>
  
    </> 
      :
      <LoadingModal loading={loading} text="product" />

  }
        </div>
          
  );
}
