import React, { useContext, useEffect, useState } from 'react';
import "./css/Part-5.css"
/* import { FetchApIsContext } from '../../../context/fetchAPIs/fetchAPIs';
 */import { BiSolidFoodMenu } from "react-icons/bi";
import { MdOutlineFoodBank } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
export default function Part5()
{

const Icons=[<BiSolidFoodMenu/>,<MdOutlineFoodBank/>,<FaUser/>,<MdFeedback/>];
  const feedBack= [
   {
      "name":  "Orders",
      "completed today": 215,
      "pending": 5
    },
     {
            "name":  "Reservations",

      "made today": 32,
      "upcoming this week": 124
    },
   {
      "name":  "Staff",
      "on duty": 8,
      "available": 2
    },
    {
      "name": "Customer feedback",
      "positive reviews": 15,
      "negative reviews": 1
    }
  ]


    return <div className="Part5">
<h5>Categories</h5>

<ul>
    {
feedBack.map((item , index)=>{

return (
     <li >
        <div className="left">

                <div className="icon-feedback">
                    {Icons[index]}
                     </div>
        <div className="text">
            <div className="header-feedback">
            <p>{item.name}</p>
            </div>

            <div className="data">
            <p>{Object.keys(item)[1]} : {Object.values(item)[1]}</p>
            <p>{Object.keys(item)[2]} : {Object.values(item)[2]}</p>

            </div>
        </div>
                </div>

<div className="right">
            <IoIosArrowForward className="arrow"/>


</div>

    </li> 
)

})
   
}
</ul>
    </div>;
}