import React,{useState} from "react";
import Navigation from "../bottomnav/index";
import TopNav from "../topnav/index";
import Footer from "../footer/index";
import "./index.scss";
import banner1 from "../../assets/img/banner1.png";
import banner2 from "../../assets/img/banner2.png";
import Instance from "../axios/index";
import { ToastContainer, toast } from 'react-toastify';
import moment from "moment";
const Order =()=> {
    const [orders, setOrders] = useState([]);
    const [email, setEmail]=useState("");
    const getOrders =async()=>{
        if(email !==""){
        try {
            let res = await Instance.post("/userorders", {
              c_email:email,
            });
            const result = await res.data;
            if(result.success===true){
                setOrders(result.data)
            }  
        }catch(e){
      console.log(e);
        }
    }else{
        toast.error("Enter your email")
    }
    }
  return (
    <div className="App v1">
        <ToastContainer />

        <div><TopNav/></div>
        <div className="mainBody">
            <div className="cat-and-banner extenders">
                <div className="cat extended">
                    <div className="catItem">
                        <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Email or Phone number"/>
                        <button onClick={()=>getOrders()}>Search</button>

                    </div>
                 
                </div>
                <div className="banner extended">
                     <h5>My Orders</h5>
                     {orders.map((item)=>(
                        <div className="singles">
                        <div>{item.reference_no}</div>
                        <div>{item.status==="now"?<span className="process">Processing</span>:<span className="delivered">Delivered</span>}</div>
                        <div >{moment(item.date).format("ll")}</div>
                        <div>&#8358;{item.amount}</div>
                        <div className="adr">{item.customer_info}</div>
                        </div>
                     ))}
                 
                    
                </div>
            </div>
           
         
        </div>
        <div className="footer">
            <Footer/>
        </div>
        <div className="mobile-menu">
        <Navigation/>

        </div>
    </div>
  );
}
export default Order;