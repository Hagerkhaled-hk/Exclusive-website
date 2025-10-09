import { Spinner } from "react-bootstrap";
import "./redButton.css";


export default function RedButton({text,className="",SpinnerRef=null,btn_Function})
{


 
    return <div  className={`RedButton ${className}`}> 
 <button className="    rounded-md  " onClick={()=>{btn_Function()}}>
   <span>

{text} 
   </span>
      <Spinner ref={SpinnerRef} className="processing"/>


   </button>    </div>
    
}


  
