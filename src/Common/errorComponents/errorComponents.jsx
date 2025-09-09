
import "bootstrap/dist/css/bootstrap.min.css";
import "./errorComponents.css"
import { IoIosCloseCircle } from "react-icons/io";
export default function ErrorMessage({message1,message2,Opacity})
{
    
    
 
    return (
    
    <div id="error-message-container" style={{opacity:Opacity ,marginTop:"20px"} } className="ErrorMessage">
        <div className="error-card"  >
            <div className="flex-container">
                <div className="icon-wrapper">
                <IoIosCloseCircle className="icon"/>
                </div>
                <div className="text-content">
                    <h3 className="error-heading">
{
    message1
}                    </h3>
                    <div className="error-details">
                        <ul role="list" className="error-list">
                            <li>{message2}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}


