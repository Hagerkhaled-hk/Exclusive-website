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
const AboutUs = lazy(() => import("./pages/aboutUs/aboutUs.jsx"));
const Account = lazy(() => import("./pages/account/account.jsx"));
const Wishlist = lazy(() => import("./pages/wishList/wishList.jsx"));
const Payment = lazy(() => import("./pages/payment/payment.jsx"));
const ProfilePart = lazy(() => import("./components/accountParts/profilePart.jsx"));
const AllOrders = lazy(() => import("./components/accountParts/orderPart/AllOrders/allOrders.jsx"));
const CurrentOrder = lazy(() => import("./components/accountParts/orderPart/currentOrder/currentOrder.jsx"));
const Contact = lazy(()=>import("./pages/contact/contact.jsx"));
const OrderState = lazy(()=>import("./pages/orderState/orderState.jsx"));
const DiscountPart = lazy(()=>import("./components/accountParts/discountPart/discountPart.jsx"));
const DiscountProducts = lazy(()=>import("./components/accountParts/discountPart/discountProducts.jsx"));



const DashboardLayout =lazy(()=>import("./components/layout/dashboard-layout.jsx"));
const Dashboard =lazy(()=>import("./dashboard/dashboardPage.jsx"));
const ViewProducts= lazy(()=>import("./dashboard/components/productParts/viewProducts/viewProducts.jsx"))
const EditProduct= lazy(()=>import("./dashboard/components/productParts/editProducts/editProducts.jsx"))
const AddProduct= lazy(()=>import("./dashboard/components/productParts/addProducts/addProduct.jsx"))
const ViewCategories= lazy(()=>import("./dashboard/components/categoryPart/viewCategory/viewCategory.jsx"))
const EditCategory= lazy(()=>import("./dashboard/components/categoryPart/editCategory/editCategory.jsx"))
const AddCategory= lazy(()=>import("./dashboard/components/categoryPart/addCategory/addCategory.jsx"))
const ViewDiscounts= lazy(()=>import("./dashboard/components/discountPart/viewDiscount.jsx"))
const SelectDiscountProduct= lazy(()=>import( "./dashboard/components/discountPart/selectDiscountProduct.jsx"))
const AddDiscount= lazy(()=>import( "./dashboard/components/discountPart/addDiscount.jsx"))
const EditDiscountForm= lazy(()=>import( "./dashboard/components/discountPart/editDiscountForm.jsx"))



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
      ,
      {path:"ADMIN__LOGINDASHBOARD",element:(
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

        ) }
        ,
        
        { path: "contact", element:(
                          <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   ", }} animation="border" /> }>
<Contact />
        
        </Suspense>

        ) }
       ,
      { path: "account",
         element:(
        <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   ", }} animation="border" /> }>
<Account />
        
        </Suspense>),
         
         errorElement:<ErrorPage/>,
        children:[
          {
            path:"profile" ,
            element:(
          
                  <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   ", }} animation="border" /> }>

          <ProfilePart/>
                </Suspense>
          )
        
        } 
      ,
      {

    path:"allOrders" ,
            element:(
          
                  <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   ", }} animation="border" /> }>

          <AllOrders/>
                </Suspense>
          )
      }
      ,
{ path: "order/:id", element: (
    <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   "}} animation="border" />}>
        <CurrentOrder />
    </Suspense>
)},
{ path: "discount", element: (
    <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   "}} animation="border" />}>
        <DiscountPart />
    </Suspense>
)},
{ path: "discountProducts", element: (
    <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   "}} animation="border" />}>
        <DiscountProducts />
    </Suspense>
)},


      
      
      ]
      }
         
       ,
      { path: "wishList", element:(
        <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   ", }} animation="border" /> }>
<Wishlist />
        
        </Suspense>

        ) },
       ,
      { path: "payment", element: (
    <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   "}} animation="border" />}>
        <Payment />
    </Suspense>
)}
,
{ path: "order", element: (
    <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   "}} animation="border" />}>
        <OrderState />
    </Suspense>
)},

      { path: "*", element: (
                                   <Suspense fallback={<Spinner style={{margin:"25% 0px 25%  50%   ", }} animation="border" /> }>

<ErrorPage /> 
 </Suspense>

      )},
      
     

    ]
    },

    {
          path:"/dashboard",
          element:<DashboardLayout/>,
          children: [
    {
      path:"",
      element :<Dashboard/>,

    
    },
     {
      path:"products",
      element :<ViewProducts/>,

    
     },
     {
      path:"product/:id"
      ,element : <EditProduct/>
     }
     ,
     {
      path:"addproduct"
      ,element : <AddProduct/>
     }
    
     ,
     {
      path:"categories"
      ,element : <ViewCategories/>
     }
     ,
     {
      path:"category/:id"
      ,element : <EditCategory/>
     }
     ,
     {
      path:"addcategory"
      ,element : <AddCategory/>
     }
     ,
     {
      path:"discounts"
      ,element : <ViewDiscounts/>
     }
     ,
     {
      path:"discounts/Applyproducts"
      ,element : <SelectDiscountProduct/>
     }
     ,
     {
      path:"discounts/Applydiscounts"
      ,element : <AddDiscount/>
     }
    
     ,
     {
      path:"discounts/Applyproducts/:id"
      ,element : <SelectDiscountProduct/>
     }
    
     ,
     {
      path:"discounts/Applydiscounts/:id"
      ,element : <EditDiscountForm/>
     }
    
          ]
          
          
    
        }

  
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
