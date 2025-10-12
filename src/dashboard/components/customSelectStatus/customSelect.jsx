import React, { useContext, useState } from 'react';
import './customSelect.css'; // We'll create this CSS file
import ChangeStatusAdmin from '../../../services/APIs/orders/changeStautsAdmin';
import { DashboardContext } from '../../context/dashboardContext';
import toast from 'react-hot-toast';

const CustomSelectStatus = ({ value ,id,order={},setOrders=()=>{}}) => {

     const[selectedStatus,setSelectedStatus]=useState(value);
     const {getAdminToken,demoDashboard} =useContext(DashboardContext);

 const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Canceled', label: 'Cancel' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Shipped', label: 'Shipped' }
  ];

    async function StatusChangeAPi(status)
  {
  console.log(id);
  
    let token=getAdminToken();
    if(!token)return;
    let res =await ChangeStatusAdmin({status:status},id,token);
    if(res.statusCode!==200){toast.error(res.message||"unable to change state"); return false;}
    return true;

  }
  
async function onChange(e) {

    if(demoDashboard){setSelectedStatus(e?.target?.value);
      
      let AnOrder= Orders.find((order)=>{order.id==id});
      console.log(Orders);
      
      AnOrder.status=e?.target?.value;
      setOrders([...Orders]);
      return;}

  let oldVal=selectedStatus;
  setSelectedStatus(e?.target?.value);
  let res =await StatusChangeAPi(e?.target?.value);
  if(!res)setSelectedStatus(oldVal);
  console.log("change");
/*    Pending, Shipped, Processing, Delivered, Canceled
 */}
 
  return (
    <select 
      className="custom-select"
      value={selectedStatus} 
      onChange={onChange}
    >
      {statusOptions.map((option) => (
        <option  key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CustomSelectStatus;