import React,{useState,useEffect} from 'react';
import "./css/Part-2.css"
import drone from "../../assets/images/swiperImages/drone.png"
import headphone from "../../assets/images/swiperImages/headPhone.png"
import phone from "../../assets/images/swiperImages/phone.png"
import labtop from "../../assets/images/swiperImages/labtop.png"
import dji from "../../assets/images/swiperImages/logo/dji.png"
import aur from "../../assets/images/swiperImages/logo/aur.png"
import quantum from "../../assets/images/swiperImages/logo/quantum.png"
import apple from "../../assets/images/swiperImages/logo/apple.png"

export default function Part2()
{
/* async function getStatistics() {
  
  const {data} = await axios.get(import.meta.env.VITE_DASHBOARDMetrices_BASE);
  
 setStatistics(data);  
 } */
/* useEffect(()=>{
getStatistics();

},[]) */
const statistics=[

  {
    "product_name": "iPhone",
    "version": "Pro 14",
    "company_logo": apple,
    "image":phone,
    "estimated_sales":10
  },
  {
    "product_name": "Drone",
    "version": "v3.1",
    "company_logo": dji,
    "image":drone,
    "estimated_sales":20

  },
  {
    "product_name": "Headphones",
    "version": "Aura X",
    "company_logo": aur,
    "image":headphone,
     "estimated_sales":10

  },

  {
    "product_name": "Laptop",
    "version": "Infinity Pro",
    "company_logo": quantum,
    "image":labtop,
      "estimated_sales":15

  }
]


    return <div className="Part2-Dashboard">

{
    statistics.map((item ,key)=>{
        return  (
        <div className="card-container" key={key}>
        <div className="text-section">
            <h6 className="product-title">{item.product_name}</h6>
            <p className="price-text">
                <span className="price-value">{item.version}</span>
            </p>
            <p className="sale-text">
                <span className="sale-value">{item.estimated_sales} Off!</span>
            </p>
            <p className="day-text">

            </p>
        </div>

        <div className="icon-section">
          <img src={item.image} className='fas fa-tag' alt=''/>
        </div>
    </div>)
    })
}
</div>;
}