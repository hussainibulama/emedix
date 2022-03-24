import React,{useEffect,useState} from "react";
import Navigation from "../bottomnav/index";
import TopNav from "../topnav/index";
import Footer from "../footer/index";
import "./index.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHomeAlt, faHouseMedical,faPaintBrush,faTruckFast } from "@fortawesome/free-solid-svg-icons";
import SimpleImageSlider from "react-simple-image-slider";
import banner1 from "../../assets/img/banner1.png";
import banner2 from "../../assets/img/banner2.png";
import Instance from "../axios/index";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
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
const Home =()=> {
    const navigate = useNavigate();
    const [pall, setPall] = useState([]);
    const [phealth, setPhealth] = useState([]);
    const [pbeauty, setPbeauty] = useState([]);
    const [loading, setLoading] = useState(false);
    const [CartsTotal, setCartsTotal] = useState(0);

    const [more, setMore] = useState(10);
    const images = [
        { url: banner1 },
        { url: banner2 },
        
    ];
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
    const Health =async()=>{
        try {
            let res = await Instance.post("/fetchproducts", {
              store_id: 7,
              category: "Health",
            });
            const result = await res.data;
            if(result.success===true){
                setPhealth(result.data)
            }  
        }catch(e){
      console.log(e);
        }
    }
    const Beauty =async()=>{
        try {
            let res = await Instance.post("/fetchproducts", {
              store_id: 7,
              category: "Beauty",
            });
            const result = await res.data;
            if(result.success===true){
                setPbeauty(result.data)
            }  
        }catch(e){
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
    
    useEffect(()=>{
        All();
        Health();
        Beauty();
        GetTotalCart();
    },[])
  return (
    <div className="App v1">
        <ToastContainer />
        <div><TopNav sum={CartsTotal} GetTotalCart={GetTotalCart}/></div>
        <div className="mainBody">
            <div className="cat-and-banner">
                <div className="cat">
                    <div className="catItem">
                        <h3>Top Categories</h3>
                        <ul>
                            <li  onClick={()=>navigate("/")}><span> <FontAwesomeIcon className="fabag" icon={faHomeAlt} /> </span> Home</li>
                            <li  onClick={()=>navigate("/category/Health")}><span> <FontAwesomeIcon className="fabag" icon={faHouseMedical} /> </span> Health</li>
                            <li onClick={()=>navigate("/category/Beauty")}><span> <FontAwesomeIcon className="fabag" icon={faPaintBrush} /> </span> Beauty</li>
                        </ul>

                    </div>
                    <div className="catItem mremover">
                     <h4 className="hatz"><span><FontAwesomeIcon className="fabag" icon={faTruckFast} /></span> &nbsp;Delivery with 30 min</h4>
                    </div>
                </div>
                <div className="banner">
                <SimpleImageSlider
                    width={"100%"}
                    height={"100%"}
                    images={images}
                    showBullets={true}
                    showNavs={true}
        
                />
                </div>
            </div>
            <div className="mid-header">
                <h3>Top Deals Health</h3>
            </div>
    
            <div className="product-section">
                {phealth.slice(0,5).map((item)=>(
                    <div className="product">
                     
                    <div className="ptop">
                    {item.p_cprice>0&&item.p_cpu>0&&item.p_cpu!==item.p_cprice&&( 
                        <div className="off">{cal(item.p_cprice,item.p_cpu)}% off</div>
                    )} 
                        <img onClick={()=>navigate(`/viewproduct/${item.p_id}`)} src={""+item.image_link} alt="products"/>
                    </div>
                    <div className="pbottom">
                        <div onClick={()=>navigate(`/viewproduct/${item.p_id}`)}  className="sep">
                            <span className="header">{item.p_title}</span>
                        </div>
                        <div className="sep split">
                            <div><span className="norms">&#8358;{item.p_cprice} </span><span className="norms crossed">&#8358;{item.p_cpu}</span></div>
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
            <div className="mid-header">
                <h3>Beauty plus</h3>
            </div>
            <div className="product-section">
            {pbeauty.slice(0,5).map((item)=>(
                    <div className="product">
                     
                    <div className="ptop">
                    {item.p_cprice>0&&item.p_cpu>0&&item.p_cpu!==item.p_cprice&&( 
                        <div className="off">{cal(item.p_cprice,item.p_cpu)}% off</div>
                    )} 
                        <img onClick={()=>navigate(`/viewproduct/${item.p_id}`)} src={""+item.image_link} alt="products"/>
                    </div>
                    <div className="pbottom">
                        <div onClick={()=>navigate(`/viewproduct/${item.p_id}`)}  className="sep">
                            <span className="header">{item.p_title}</span>
                        </div>
                        <div className="sep split">
                            <div><span className="norms">&#8358;{item.p_cprice} </span><span className="norms crossed">&#8358;{item.p_cpu}</span></div>
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
            <div className="mid-header">
                <h3>More for you</h3>
            </div>
            <div className="product-section">
            {pall.slice(0,more).map((item)=>(
                    <div className="product">
                     
                    <div className="ptop">
                    {item.p_cprice>0&&item.p_cpu>0&&item.p_cpu!==item.p_cprice&&( 
                        <div className="off">{cal(item.p_cprice,item.p_cpu)}% off</div>
                    )} 
                        <img onClick={()=>navigate(`/viewproduct/${item.p_id}`)} src={""+item.image_link} alt="products"/>
                    </div>
                    <div className="pbottom">
                        <div onClick={()=>navigate(`/viewproduct/${item.p_id}`)}  className="sep">
                            <span className="header">{item.p_title}</span>
                        </div>
                        <div className="sep split">
                            <div><span className="norms">&#8358;{item.p_cprice} </span><span className="norms crossed">&#8358;{item.p_cpu}</span></div>
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
            <div className="more-loader">
                <button onClick={()=>setMore(more+10)}>Load More...</button>
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
export default Home;