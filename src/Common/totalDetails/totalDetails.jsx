import "./totalDetails.css";


export default function TotalDetails({total, subTotal,shipPostalCode,shippingAddress,discountAmount,createdAt})
{
 
    return <div className="TotalDetails"> 
<p>Subtotal <span>{subTotal}</span></p>
<p>Shipping <span>Free</span></p>
<p>Total<span>{total}</span></p>
{(discountAmount !== undefined && discountAmount !== null) ? <p>Discount<span> {discountAmount}</span></p> : ""}
{shipPostalCode ? <p>Postal Code<span>{shipPostalCode}</span></p>:""}
{shippingAddress ? <p>Shipping Address<span>{shippingAddress}</span></p>:""}
{createdAt ? <p>Order Date<span>{new Date(createdAt).toLocaleDateString()}</span></p>:""}


    </div>
    
}