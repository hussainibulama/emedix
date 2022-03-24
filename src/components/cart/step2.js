import React,{useState} from "react";
import "./index.scss";
const Step2 = ({setName,setEmail,setPhone,setStates,setAddress,name,email,phone,states,address})=>{
 
    return(
        <div className="allcarts">
            <div className="forms">
                <h5>Delivery Information</h5>
            <div>
                <label>Full Name:</label>
                <input value={name}  onChange={(e)=>setName(e.target.value)} type="text" placeholder="Full Name"/>
            </div>
            <div>
                <label>Email</label>
                <input value={email}  onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email Address"/>
            </div>
            <div>
                <label>Phone Number:</label>
                <input value={phone}  onChange={(e)=>setPhone(e.target.value)} type="number" placeholder="Phone number"/>
            </div>
            <div>
                <label>State:</label>
                <select onChange={(e)=>setStates(e.target.value)}>
                    <option>{states}</option>
                    <option>Abuja</option>
                </select>
            </div>
            <div>
                <label>Address:</label>
                <textarea value={address} onChange={(e)=>setAddress(e.target.value)}/>
            </div>
            </div>
        </div>
    )
}
export default Step2;