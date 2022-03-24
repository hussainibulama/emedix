import React,{useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faShoppingBag,faUserAlt } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";
import Logo from "../../assets/img/e-medix-logo-light.png";
import Cart from "../cart/index";
import { useNavigate } from "react-router-dom";

const TopNav =({sum,GetTotalCart})=> {
    const navigate = useNavigate();
    const [cart, setCart]=useState(false);
    const [search, setSearch]=useState("");
    const [Focus,setFocus]=useState(false);
    const HandleBlurs=()=>{
        setFocus(false)
    }
    const HandleFocus=()=>{
        setFocus(true)
    }
    const Searcher = ()=>{
        if(search !==""){
            navigate(`/search/${search}`)
        }
    }
  return (
    <div className="topnav">
            {cart===true?<Cart  closeModal={()=>{GetTotalCart();setCart(false);}}/>:""}
        <div className="top">
            <div onClick={()=>navigate("/")} className="logo">
                <img src={Logo} alt="logo"/>
            </div>
            <div className="search">
                <div className={`input-search ${Focus?'onfocus':''}`}>
                    <div className="faw">  
                        <FontAwesomeIcon
                    className="searchIcon"
                  icon={faSearch}
                 
                /></div>
                    <div className="caw"><input onChange={(e)=>setSearch(e.target.value)} onFocus={HandleFocus} onBlur={HandleBlurs} type="text" placeholder="Searching for..."/></div>
                    <div className="baw"><button onClick={()=>Searcher()}>Search</button></div>
                </div>
            </div>
            <div className="Carts">
                <div onClick={()=>navigate("/orders")}>
                <FontAwesomeIcon
                  className="fabag"
                  icon={faUserAlt}
                 
                />
                </div>
                <div onClick={()=>setCart(true)}>
                    <span>{sum}</span>
                <FontAwesomeIcon
                  className="fabag"
                  
                  icon={faShoppingBag}
                  
                />
                </div>
              
               
            </div>
        </div>
    </div>
  );
}
export default TopNav;