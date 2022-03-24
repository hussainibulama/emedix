import React from "react";
import "./index.scss";
const Step2 = ()=>{
   
    return(
        <div className="allcarts">
           <div className="confirmation">
               <div className="check">
               &#10003;
               </div>
               <div>
                   <p>Order complete with a total sum of <span>&#8358;10000</span>, thank you.</p>
                   <p>Check your email for payment confirmation</p>
               </div>
               <div><a href="/">Track order</a></div>

           </div>
        </div>
    )
}
export default Step2;