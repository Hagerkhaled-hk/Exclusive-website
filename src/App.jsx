import React, { lazy, Suspense, useContext, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from './components/layout/layout';

import ErrorPage from './Common/errorPage/errorPage.jsx';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";


const  ForgetPassword = lazy(()=>import ("./pages/forgetpassword/forgetpassword.jsx")) ;
const  EmailComponent  = lazy(()=>import ("./pages/emailComponent/emailComponent.jsx")) ;

const HomePage = lazy(() => import('./pages/homePage.jsx'));
const Cart = lazy(() => import('./pages/cart/cart.jsx'));
const Signup = lazy(() => import('./pages/signup/signup.jsx'));
const Login = lazy(() => import('./pages/login/login.jsx'));
const ProductsPage = lazy(() => import("./pages/products/product.jsx"));
const ProductDetail = lazy(() => import("./pages/productDetail/productDetail.jsx"));
const AboutUs = lazy(() => import("./pages/aboutUs/AboutUs"));
const Account = lazy(() => import("./pages/account/account.jsx"));
const Wishlist = lazy(() => import("./pages/wishList/wishList.jsx"));


export default function App() {


      

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
            errorElement:<ErrorPage/>,


    children:[
      {path:"",element:( 
        <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   ", }} animation="border" /> }>
<HomePage/>
        </Suspense>
      )},
      {path:"cart",element:(
         <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   ", }} animation="border" /> }>
<Cart/>
         </Suspense>
      )},
      {path:"signup",element:(
               <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   ", }} animation="border" /> }>

<Signup/>
               </Suspense>
      )},
      {path:"login",element:(
                     <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   ", }} animation="border" /> }>
                      <Login/>
</Suspense>
      )},
      { path: "product", element: (
                           <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   ", }} animation="border" /> }>
                            <ProductsPage />
</Suspense>

      ) },


{path: "forgetPassword", element: (
      <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   ", }} animation="border" /> }>
                            <EmailComponent />
</Suspense>

)
}
,
{

path: "resetPassword", element: (
                           <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   ", }} animation="border" /> }>
                            <ForgetPassword />
</Suspense>

)
}
,

      { path: "product/:id", element:(
           <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   ", }} animation="border" /> }>
                          <ProductDetail /> 

</Suspense>

        
      ) },
      { path: "about", element:(
                                   <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   ", }} animation="border" /> }>
<AboutUs />
        
        </Suspense>

        ) },
       ,
      { path: "account", element:(
        <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   ", }} animation="border" /> }>
<Account />
        
        </Suspense>

        ) },
       ,
      { path: "wishList", element:(
        <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   ", }} animation="border" /> }>
<Wishlist />
        
        </Suspense>

        ) },



      { path: "*", element: (
                                   <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   ", }} animation="border" /> }>

<ErrorPage /> 
 </Suspense>

      )},
      
     

    ]
    },

  
    ,
{ future: {
    v7_fetcherPersist: true,
  }}
  
  ],
);

return  <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   "}} animation="border" /> }>
<RouterProvider router={router}/>


 </Suspense>
}
