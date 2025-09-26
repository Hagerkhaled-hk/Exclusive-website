import React from "react";
import "./noOrdersModal.css";

export default function NoOrdersModal({status=""})  {
    return (
        <div className="no-orders-wrapper">
            <table className="no-orders-table" role="table" aria-label="No Shipped Orders">
                <thead>
                    <tr>
                        <th>
                            <span className="icon" aria-hidden="true">🚚</span>
                            <br />
                            No {status} Orders Found Here!
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                       
                            <strong>Is your order missing?</strong> Please check the <strong>Pending</strong>  tabs, as most orders take 1-2 business days to prepare before they ship out.
                            <br /><br />
                     
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};


