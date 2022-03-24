import React,{useEffect, useState} from "react";
import "./index.scss";
import Instance from "../axios/index";

const Step2 = ({total,customer_info})=>{
    const [carts, setCarts] = useState([])
   
    const GetCart=async()=>{
     try {
         let res = await Instance.post("/viewcart", {
           customer_id: localStorage.getItem("customer_id"),
           store_id: 7,
         });
   
         const results = await res.data;
         setCarts(results);
       } catch (e) {
         console.log(e);
       }
    }
    useEffect(()=>{  
        GetCart();
       },[])
    return(
        <div className="allcarts">
            <div className="summary">
            <h5>Order Summary</h5>
                <div className="summaries">
                    {carts.map((item)=>(
                        <div>
                        <span>{item.unit} x {item.p_title}</span>
                        <span>&#8358;{item.total}</span>
                        </div>
                    ))}
                     
                </div>
                <hr/>
                <div className="others">
                    <div>
                    <span>Delivery Fee</span>
                    <span>&#8358;1000</span>
                    </div>
                    <div>
                    <span>Total</span>
                    <span>&#8358;{total+1000}</span>
                    </div>
                  
                </div>
                <hr/>
                <div className="others">
                    <div >
                    <span className="sepas">Delivery Address</span>
                    <span>{customer_info}</span>
                    </div>
                    
                  
                </div>
            </div>
           
        </div>
    )
}
export default Step2;