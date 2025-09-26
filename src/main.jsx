import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ProductProvider from './context/productContext/productContext.jsx'
import CartProvider from './context/cartContext/cartContext.jsx'
import UserProvider from './context/userContext/userContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import WishlistProvider from "./context/wishlistContext/wishlistContext.jsx"
import PaymentProvider from './context/paymentContext/paymentContext.jsx'
import OrderProvider from './context/orderContext/orderContext.jsx'

createRoot(document.getElementById('root')).render(

     <GoogleOAuthProvider clientId="736736504858-k7297dcrj2ru3j1rlju0k6o8grmgj4qv.apps.googleusercontent.com">
<UserProvider>
<ProductProvider>
<WishlistProvider>
    <CartProvider>
        <PaymentProvider>
<OrderProvider>

    <App />
</OrderProvider>

        </PaymentProvider>
    </CartProvider>
    </WishlistProvider>
</ProductProvider>
</UserProvider>
</GoogleOAuthProvider>
)
