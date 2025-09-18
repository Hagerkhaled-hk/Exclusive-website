import DynamicIndex from "../../Common/DynamicIndex/DynamicIndex";
import RedButton from "../../Common/redButton/redButton";
import TotalDetails from "../../Common/totalDetails/totalDetails";
import "./payment.css";

export default function Payment() {


    async function processOrder()
    {
  let token= getToken();
  if(token){
  
    let res =await AddToOrder(cartItems,token);
  setCart_Info_State();
    console.log("order",res);
  }
      
  
    }

    async function applyDiscount()
    {let data=[];
      cartItems.map((item,index)=>{
  
           data.push(item.productId) ;
      });
      console.log(data);
      
      let res =await ApplyDiscount({
    "code": coupounRef.current.value,
    "productIds": data
  });
  setCart_Info_State();
      console.log("order",res);
      
  
    }
  
  return (
    <div className="Payment">
      <DynamicIndex page={["Account", "My Account","Product","View Cart","CheckOut"]} />
      <div className="payment-container">
        {/* Billing Details */}
        <div className="billing-details">
          <h2>Billing Details</h2>
          <form>
            <label>
              First Name<span>*</span>
              <input type="text" required />
            </label>
            <label>
              Company Name
              <input type="text" />
            </label>
            <label>
              Street Address<span>*</span>
              <input type="text" required />
            </label>
            <label>
              Apartment, floor, etc. (optional)
              <input type="text" />
            </label>
            <label>
              Town/City<span>*</span>
              <input type="text" required />
            </label>
            <label>
              Phone Number<span>*</span>
              <input type="text" required />
            </label>
            <label>
              Email Address<span>*</span>
              <input type="email" required />
            </label>
            <div className="save-info">
              <input type="checkbox" id="saveInfo" />
              <label htmlFor="saveInfo">
                Save this information for faster check-out next time
              </label>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
         
     <TotalDetails total={2000} subTotal={3000} />
          <div className="payment-methods">
            <label>
              <input type="radio" name="payment" />
              Bank
              <span className="bank-icons">
                <img src="https://i.imgur.com/5oCG0vJ.png" alt="Bank Cards" />
              </span>
            </label>
            <label>
              <input type="radio" name="payment" defaultChecked />
              Cash on delivery
            </label>
          </div>
       <div className="coupoun coupon-row" >
              <input type="text"  placeholder="Coupoun"  />
              <RedButton text="Apply Coupoun" btn_Function={applyDiscount}/>
          </div>
                        <RedButton text="Place order" btn_Function={processOrder}/>

        </div>
      </div>
    </div>
  );
}