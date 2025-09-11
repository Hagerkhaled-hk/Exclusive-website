import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import RatingStars from "../../components/RatingStars/RatingStars";
import { CiHeart } from "react-icons/ci";
import "./ProductDetail.css";
import ProductById from "../../services/APIs/get_Product_Id";
import DynamicIndex from "../../Common/DynamicIndex/DynamicIndex";
 
export default function ProductDetail() {
  const { id } = useParams();
const [products ,setProducts]=useState([]);

   useEffect(()=>{
    (async()=>{
      let res =await ProductById(id)
setProducts(res.data);
    })()

   },[])
 

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
<div className="top">

      <DynamicIndex page={["account",products.categoryName,products.name]} />
</div>
<div className="down">
{/* <div className="images">
 */} {/*  <div className="altImages">
    <div className="image">
              <img src={products.images} alt={products.name} />

    </div>
  </div> */}

      <div className="image-section">
     

        <div className="image">

        <img src={products.images} alt={products.name} />
        </div>
      </div>
{/* </div>
 */}

      <div className="info-section">
        <h2>{products.name}</h2>

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
            <button onClick={handleDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrease}>+</button>
          </div>
          <button className="buy-btn">Buy Now</button>
          <button className="heart"><CiHeart />
          </button>
        </div>

      </div>
      </div>
    </div>
  );
}
