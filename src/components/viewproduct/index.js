import React,{useEffect,useState} from "react";
import Navigation from "../bottomnav/index";
import TopNav from "../topnav/index";
import Footer from "../footer/index";
import "./index.scss";
import { useNavigate,useParams } from "react-router-dom";
import Instance from "../axios/index";
import { ToastContainer, toast } from 'react-toastify';
import goli from "../../assets/img/goli.jpeg";
import beauty from "../../assets/img/beauty.jpeg";

function cal(a,b){
    if(a===0||a==null){
        return 0;
    } 
    if(b===0||b==null){
        return 0;
    }
    let A = a/b;
    let B = A*100;
    let C = parseInt(B);
    return C;
}
const ViewProduct =()=> {
    const{id}=useParams();
    const navigate = useNavigate();
    const [pall, setPall] = useState([]);
    const [more, setMore] = useState(10);
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [Actives, setActives] = useState(0);
    const [CartsTotal, setCartsTotal] = useState(0);
    const GetTotalCart=async()=>{
       try {
           let res = await Instance.post("/viewcart", {
             customer_id: localStorage.getItem("customer_id"),
             store_id: 7,
           });
     
           const results = await res.data;
           setCartsTotal(results.length);
         } catch (e) {
           console.log(e);
         }
      }
    const addCart=async(p_id, p_title, image_link, amount)=> {
        setLoading(true)
        let customer_info = null;
        let unit = 1;
        try {
          let res = await Instance.post("/insertcart", {
            customer_id: localStorage.getItem("customer_id"),
            store_id: 7,
            p_id: p_id,
            customer_info: customer_info,
            p_title: p_title,
            image_link: image_link,
            unit: unit,
            amount: amount,
          });
    
          let result = await res.data;
    
          if (result && result.success) {
            setLoading(false)
        GetTotalCart();

            toast.success("Item added");
    
          } else if (result && result.success === false) {
            setLoading(false)
            toast.error(result.msg);
            
          }
        } catch (e) {
          console.log(e);
          toast.error(e.response.data.message);
          setLoading(false)
    
        }
      }
      const All =async()=>{
        try {
            let res = await Instance.post("/fetchproducts", {
              store_id: 7,
              category: "all",
            });
      const result = await res.data;
          if(result.success===true){
              setPall(result.data)
          }  
        }catch(e){
      console.log(e);
        }
    }
    const Details =async()=>{
        try {
            let res = await Instance.post("/singleproduct", {
              store_id: 7,
              p_id: id,
            });
      const result = await res.data;
          if(result.success===true){
            setProducts(result.data.product);
            setImages(result.data.images);
          }  
        }catch(e){
      console.log(e);
        }
    }
      useEffect(()=>{
        Details();
        All();
        GetTotalCart();
        
    },[])
    const setAimages = (id)=>{
        setActives(id);
    }
  return (
    <div className="App v1">
        <ToastContainer/>
        <div><TopNav sum={CartsTotal} GetTotalCart={GetTotalCart}/></div>
        <div className="mainBody">
            <div className="viewsides">
                <div className="left_view">
                    <div className="superside">
                    {images.length>0&&<img src={""+images[Actives].image_link} alt="imageer"/>}
                    </div>
                    <div className="bottomside">
                        {images.map((item,key)=>(
                             <div onClick={()=>setAimages(key)} className={`images ${Actives===key?'active':''}`}>
                              <img src={""+item.image_link} alt="imageer"/>
                          </div>
                        ))}
  
                    </div>
                </div>
                <div className="right_view">
                    <div className="resource">
                        <h3>{products.length>0&&products[0].p_title}</h3>
                        <h5>&#8358;{products.length>0&&products[0].p_price}</h5>
                        <p>Stock Available</p>
                        <button onClick={()=>addCart(
                                    products.length?products[0].p_id:"",
                                    products.length?products[0].p_title:"",
                                    images.length>0?images[0].image_link:"",
                                    products.length?products[0].p_cprice:""
                                  )} >Add To Cart</button>
                    </div>
                </div>
            </div>
            <div className="description">
                <div className="header">Description</div>
                <p>{products.length?products[0].p_description:""}</p>
               
            </div>

            <div className="mid-header">
                <h3>Related Products</h3>
            </div>
            <div className="product-section">
            {pall.slice(0,5).map((item)=>(
                    <div className="product">
                     
                    <div className="ptop">
                    {item.p_cprice>0&&item.p_price>0&&item.p_price!==item.p_cprice&&( 
                        <div className="off">{cal(item.p_price,item.p_cprice)}% off</div>
                    )} 
                        <img onClick={()=>navigate(`/viewproduct/${item.p_id}`)} src={""+item.image_link} alt="products"/>
                    </div>
                    <div className="pbottom">
                        <div onClick={()=>navigate(`/viewproduct/${item.p_id}`)}  className="sep">
                            <span className="header">{item.p_title}</span>
                        </div>
                        <div className="sep split">
                            <div><span className="norms">&#8358;{item.p_price} </span><span className="norms crossed">&#8358;{item.p_cprice}</span></div>
                            <div>
                                <button disabled={loading} onClick={()=>addCart(
                                    item.p_id,
                                    item.p_title,
                                    item.image_link,
                                    item.p_price
                                  )} className="plus">{"+"}</button>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
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
export default ViewProduct;