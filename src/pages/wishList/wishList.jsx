import { useContext } from "react";
import BlackButton from "../../Common/blackButton/blackButton";
import DynamicIndex from "../../Common/DynamicIndex/DynamicIndex";
import ProductCards from "../../components/ProductCards/ProductCards";
import { WishlistContext } from "../../context/wishlistContext/wishlistContext";
import "./wishList.css";
import empty from "../../assets/images/icons/icons8-empty-100.png";
import { Link, useNavigate } from "react-router-dom";

import { FaRegTrashCan } from "react-icons/fa6";
import HomeHeader from "../../Common/homeHeader/homeHeader";
import { ProductContext } from "../../context/productContext/productContext";
export default function Wishlist()
{
 
const {wishlistItems,add_Wishlit_To_Cart}=useContext(WishlistContext);

const {products}=useContext(ProductContext);
const Navigate=useNavigate(null);


    return <div className="Wishlist"> 
    <div className="top">

<DynamicIndex page={["home","wishList"]} />


<BlackButton text={"Move all to Cart"} btn_Function={ ()=>{add_Wishlit_To_Cart()}} />
    </div>



    <div className="bottom">

    <div className="wishlistItmes">
{
 wishlistItems.length==0?
<div 

style={{width:"100%" , display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column" } }>

<img src={empty}  alt="empty" />

<p style={{marginTop:"20px",fontSize:"var(--text-size)"}}>Your wishList is empty.<Link style={{color:"var(--red-color)"}} to={"/product"}> Browse </Link>our best sellers to get started.</p>
</div>       
:
<ProductCards products={wishlistItems} />

}
    </div>
<div className="recommendation">

<HomeHeader note={"Just for you"} >
<BlackButton text={"See All"} btn_Function={ ()=>{Navigate("/product")}} />
    </HomeHeader>

<div className="recommendation-bottom">

<ProductCards products={products.splice(4,4)} />
</div>

</div>



    </div>

    </div>
    
}