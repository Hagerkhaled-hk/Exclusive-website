
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import notFound from "../../assets/images/icons/icons8-empty-100.png"


export default function LoadingModal({loading,text,mainText=""})
{

    return (
      <>{

      
      loading ?
   <Spinner style={{margin:"25% 0px 25%  50%   ", }} animation="border" /> 
:
<div 

style={{marginTop:"50px", width:"100%" , display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column" } }>
<img src={notFound}  alt="NOTFOUND" />



<p style={{marginTop:"20px",fontSize:"var(--text-size)"}}>
    
{mainText ? mainText : 
      <span>
        {text}.<Link style={{color:"var(--red-color)"}} to={"/product"}> Browse </Link>our best sellers to get started.`    

        </span>     
}
        
    </p>
</div>
}
</>
    );

    
}


