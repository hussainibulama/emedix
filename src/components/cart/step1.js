import React,{useEffect, useState} from "react";
import "./index.scss";
import beauty from "../../assets/img/beauty.jpeg";
import Instance from "../axios/index";

const Step1 = ({GetCartTotal})=>{
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
   const deletecart = async(p_id)=>{
    try {
        let res = await Instance.post("/deletecart", {
          customer_id: localStorage.getItem("customer_id"),
          p_id: p_id,
          store_id: 7,
        });
  
        let result = await res.data;
        if (result && result.success) {
            GetCart();
            GetCartTotal();
        } else if (result && result.success === false) {
          
        }
      } catch (e) {
        console.log(e);
      }
   }
   const pluscart = async(p_id, amount)=>{
    try {
        let res = await Instance.post("/pluscart", {
          customer_id: localStorage.getItem("customer_id"),
          p_id: p_id,
          store_id: 7,
          amount: amount,
        });
  
        let result = await res.data;
        if (result && result.success) {
            GetCart();
            GetCartTotal();
        } else if (result && result.success === false) {
          
        }
      } catch (e) {
        console.log(e);
      }

   }
   const minuscart = async(p_id, amount)=>{
    try {
        let res = await Instance.post("/minuscart", {
          customer_id: localStorage.getItem("customer_id"),
          p_id: p_id,
          store_id: 7,
          amount: amount,
        });
  
        let result = await res.data;
        if (result && result.success) {
            GetCart();
            GetCartTotal();
        } else if (result && result.success === false) {
       
        }
      } catch (e) {
        console.log(e);
      }
}
   useEffect(()=>{  
    GetCart();
   },[])
    return(
        <div className="allcarts">
            {carts.length>0?carts.map((item)=>(
                <div className="cart_product">
                <div className="lefty">
                    <div  onClick={() => pluscart(item.p_id, item.amount)}className="circles active">+</div>
                    <div>{item.unit}</div>
                    <div  onClick={() => item.unit>1?minuscart(item.p_id, item.amount):""}  className={`circles ${item.unit>1?'active':''}`}>-</div>
                </div>
                <div className="centy">
                    <div><img src={""+item.image_link} alt="images"/></div>
                    <div>
                        <h5>{item.p_title}</h5>
                        <small  >&#8358;{item.amount} x {item.unit}</small>
                        <h4>&#8358;{item.total}</h4>
                    </div>
                </div>
                <div className="righty">
                    <div onClick={() => deletecart(item.p_id)}><span>&times;</span></div>
                </div>
            </div>
            )):""}
        </div>
    )
}
export default Step1;