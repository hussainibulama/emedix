import React from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Search from "./components/search";
import Category from "./components/category";
import ViewProduct from "./components/viewproduct";
import Order from "./components/user";
import CartMobile from "./components/cartmobile/";

const App=()=> {
  const special = localStorage.getItem("customer_id");
  if(special === null){
    let customer_key =
    Math.floor(100000 + Math.random() * 900000) +
    String(Math.floor(100 + Math.random() * 999));
    localStorage.setItem("customer_id", customer_key);
  }
  return (
   <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:id" element={<Search />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/viewproduct/:id" element={<ViewProduct />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/cartmobile" element={<CartMobile />} />
      </Routes>
   </>
  );
}

export default App;
