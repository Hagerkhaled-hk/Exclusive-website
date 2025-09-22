import { Spinner } from "react-bootstrap";
import "./redButton.css";


export default function RedButton({text,className="",btn_Function})
{


 
    return <div  className={`RedButton ${className}`}> 
 <button className="    rounded-md  " onClick={()=>{btn_Function()}}>
   <span>

{text} 
   </span>
      <Spinner className="processing"/>


   </button>    </div>
    
}


  
