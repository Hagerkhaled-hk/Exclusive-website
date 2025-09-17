import "./payment.css";

export default function Payment() {
  return (
    <div className="Payment">
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
          <div className="order-items">
            <div className="order-item">
              <img src="https://i.imgur.com/8Km9tLL.png" alt="LCD Monitor" />
              <span>LCD Monitor</span>
              <span className="price">$650</span>
            </div>
            <div className="order-item">
              <img src="https://i.imgur.com/1Q9Z1Zm.png" alt="HI Gamepad" />
              <span>HI Gamepad</span>
              <span className="price">$1100</span>
            </div>
          </div>
          <div className="order-totals">
            <div>
              <span>Subtotal:</span>
              <span>$1750</span>
            </div>
            <div>
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="total">
              <span>Total:</span>
              <span>$1750</span>
            </div>
          </div>
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
          <div className="coupon-row">
            <input type="text" placeholder="Coupon Code" />
            <button className="apply-coupon">Apply Coupon</button>
          </div>
          <button className="place-order">Place Order</button>
        </div>
      </div>
    </div>
  );
}