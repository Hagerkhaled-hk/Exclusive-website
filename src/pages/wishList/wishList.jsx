import { useContext } from "react";
import BlackButton from "../../Common/blackButton/blackButton";
import DynamicIndex from "../../Common/DynamicIndex/DynamicIndex";
import ProductCards from "../../components/ProductCards/ProductCards";
import { WishlistContext } from "../../context/wishlistContext/wishlistContext";
import "./wishList.css";
import empty from "../../assets/images/icons/icons8-empty-100.png";
import { Link } from "react-router-dom";

import { FaRegTrashCan } from "react-icons/fa6";
export default function Wishlist()
{
 
const {wishlistItems}=useContext(WishlistContext);


    return <div className="Wishlist"> 
    <div className="top">

<DynamicIndex page={["home","wishList"]} />


<BlackButton text={"Move all to Bag"} />
    </div>



    <div className="bottom">
{
 wishlistItems.length==0?
<div 

style={{marginTop:"50px", width:"100%" , display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column" } }>
<img src={empty}  alt="empty" />
<p style={{marginTop:"20px",fontSize:"var(--text-size)"}}>Your cart is empty.<Link style={{color:"var(--red-color)"}} to={"/product"}> Browse </Link>our best sellers to get started.</p>
</div>       
:
<ProductCards products={wishlistItems} />
}
    </div>

    </div>
    
}