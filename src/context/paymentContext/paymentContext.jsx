import { createContext, useEffect, useState } from "react";

export const PaymentContext = createContext();

export default function PaymentProvider({ children }) {

   const [form, setForm] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phone: "",
    postalCode: "",
    saveInfo: false
  });

  const [is_From_PaymentPage,set_Is_From_PaymentPage] =useState(false);
  




  return (
    <PaymentContext.Provider value={{form,setForm,is_From_PaymentPage,set_Is_From_PaymentPage}}>
      {children}
    </PaymentContext.Provider>
  );
}