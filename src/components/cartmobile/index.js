import React,{useState} from "react";
import Cart from "../cart/index";
import Footer from "../footer/index";
import Navigation from "../bottomnav/index";

const CartMobile =()=> {
    const [cart, setCart]=useState(true);


  return (
    <div className="App v1">
        {cart===true?<Cart  closeModal={()=>setCart(false)}/>:""}
      
        <div className="footer">
            <Footer/>
        </div>
        <div className="mobile-menu">
        <Navigation/>

        </div>
    </div>
  );
}
export default CartMobile;