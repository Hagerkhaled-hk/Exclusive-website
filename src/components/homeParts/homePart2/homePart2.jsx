import "./css/HomePart2.css";
import HomeHeader from "../../../Common/homeHeader/homeHeader";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import Viewateg from "../../../services/APIs/category/ViewCateg";
import ProductCards from "../../ProductCards/ProductCards";
import ViewProducts from "../../../services/APIs/products/viewProducts";
import LoadingModal from "../../../Common/modal/modal";


export default function HomePart2()
{
const [actCateg,setActCateg]=useState("")
const [categories,setcategories]=useState([]);
const [products,setProducts]=useState([]);

async function Getproducts(categName)
{
 
    console.log(categName);
    
        let res_products =await ViewProducts();

    let data= res_products?.data?.filter((item)=>{


            return    item.categoryName == categName
            })
            
setProducts(data);



}

useEffect(()=>{
    (async ()=>{
        let res = await Viewateg();
        setcategories(res.data);
        setActCateg(res.data[4].name);

Getproducts(res.data[4].name);

    })()

  
},[])



    return <div className="HomePart2"> 

    <HomeHeader note={"Categories"} title={"Browse By Category"}  >
          <div className="navigation-arrows">
        <div className="arrow arrow-left   "><FaArrowLeft/>  </div>
        <div className="arrow arrow-right"><FaArrowRight/></div>
    </div> 
        </HomeHeader>

<Swiper
  navigation ={{
    nextEl: '.arrow-right', 
    prevEl: '.arrow-left', 
  }}
 modules={[Navigation]} className="mySwiper"
   slidesPerView={6}
   breakpoints={{

    "0":{
        slidesPerView:1
    },
    "335":{
        slidesPerView:2
    },
    "466":{
        slidesPerView:3
    },
    "762":{
        slidesPerView:4
    },
    "944":{
        slidesPerView:5
    },
    "1030":{
        slidesPerView:7
    },

   }}
>
<div className="categories-container">
    {
        categories.map((item,index)=>{
            return( 
                
             <SwiperSlide key={index}>
   
                <div key={index}  
                onClick={()=>{setActCateg(item.name); Getproducts(item.name)}}
                className={`category-item ${actCateg==item.name&&'active'}`}>
{/* <div className={`icon ${actCateg==item.name&&'active'}`}>{item.icon}</div>
 */}        <p>{item.name}</p>
        </div>
            </SwiperSlide>

        
        );
        })
    }
  

    </div>
    </Swiper>
    <div className="products-container-home2 ">
        {
            products.length?

            <ProductCards products={products} />
            :
<LoadingModal text={"No product founds in this Category"} />
}
</div>

    </div>
    
}