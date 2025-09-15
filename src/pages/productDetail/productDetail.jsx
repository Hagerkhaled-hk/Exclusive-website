import { useNavigate, useParams } from "react-router-dom";
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
import { Spinner } from "react-bootstrap";
import AddTOCart from "../../services/APIs/cart/addToCart";
import { UserContext } from "../../context/userContext/userContext";

 
export default function ProductDetail() {
  const { id } = useParams();
const [products ,setProducts]=useState([]);
const [activeImageIndex, setActiveImageIndex] = useState(0);
  const navigate =useNavigate();
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

   useEffect(()=>{
    (async()=>{
      let res =await ProductById(id)
      console.log(res.data);

setProducts(res.data);
    })()

   },[id])
 

  const [color, setColor] = useState("blue");
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));


  if (!products) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-detail">
      {
products.length!==0 ?
<>
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
      >
        {products.images.map((_, index) => (
          <SwiperSlide key={index}>
            <div className={`image ${activeImageIndex===index?"active":""}`} onClick={() => setActiveImageIndex(index)}>
              <img src={products.images[index]} alt={products.name} />
            </div>
          </SwiperSlide>
        ))}
        {/* Custom navigation buttons */}
        <div className="swiper-button-prev vertical-nav"></div>
        <div className="swiper-button-next vertical-nav"></div>
      </Swiper>
   </div> 

      <div className="image-section">
     

        <div className="image">

        <img src={products.images[activeImageIndex]} alt={products.name} />
        </div>
      </div>
 </div>
 

      <div className="info-section">
        <h2>{products.name}</h2>

        <div className="stars-container">
          <RatingStars rating={4.5} />
          <span className="reviews">(65 reviews)</span>
        </div>

        <p className="price">${products.price}</p>

        <p className="description">{products.description}</p>


        <div className="actions">
          <div className="qty">
            <button onClick={handleDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrease}>+</button>
          </div>
          <button onClick={()=>{
            !isLogin()?
            navigate("/signup")
            :
                          addToCart({
  "productId": product.id,
  "quantity": {quantity}
})
          }} className="buy-btn">Add to cart</button>
          <button className="heart"><CiHeart />
          </button>
        </div>

      </div>
      </div>
  
    </> 
      :
    
<Spinner style={{margin:"25% 0px 25%  50%   ", }} animation="border" /> 

  }
        </div>
          
  );
}
