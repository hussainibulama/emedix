import React,{useEffect, useState} from "react";
import "./index.scss";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import Instance from "../axios/index";
import { ToastContainer, toast } from 'react-toastify';
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

const AddPersonnel = (props)=>{
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [sumcart, setSums] = useState(0);
    const [rno, setRno] = useState("");
    const[name, setName]=useState("");
    const[email, setEmail]=useState("");
    const[phone, setPhone]=useState("");
    const[states, setStates]=useState("");
    const[address, setAddress]=useState("");

    function closeModal(e) {
        e.stopPropagation();
        props.closeModal();
      }
      const AppointRno = async()=>{
        let r_no = 
        "ABCDEFGHIJKLMNOPQRSTUVWXYZÍ".charAt(Math.floor(9 + Math.random() * 9)) +
        Math.floor(100000 + Math.random() * 900000);
        setRno(r_no);
            try {
              let res = await Instance.post("/appointcart", {
                customer_id: localStorage.getItem("customer_id"),
                store_id: 7,
                r_no:r_no,
              });
              let result = await res.data;
              if (result && result.success) {
              } else {
                
              }
            } catch (e) {
              setLoading(false);
            }
      }
      const Appoint = async()=>{
        if (
            name !== "" &&
            phone !== "" &&
            email !== "" && 
            address !== "" && 
            states !==""
          ) {
            setLoading(true);
      
            try {
              let res = await Instance.post("/appointcustomer", {
                customer_id: localStorage.getItem("customer_id"),
                store_id: 7,
                c_email:email,
                customer_info:
                  name +
                  "-" +
                  phone +
                  "-" +
                  address +
                  "-" +
                  states,
              });
      
              let result = await res.data;
              if (result && result.success) {
                setLoading(false);
                AppointRno();
                setStep(step+1)
              } else {
                this.setState({ loading: false });
                toast.error(result.msg);
                setLoading(false); 
              }
            } catch (e) {
              setLoading(false);
              toast.error(e.response.data.message);

            }
          }else {
            toast.error("fill out all fields");

          }
      }
      const GetCartTotal=async()=>{
        try {
            let res = await Instance.post("/carttotal", {
              customer_id: localStorage.getItem("customer_id"),
              store_id: 7,
            });
      
            let result = await res.data;
            setSums(result.sumcart);
          } catch (e) {
            console.log(e);
          }
      }
      
      useEffect(()=>{  
        GetCartTotal();
   
        
      },[])
      const pays=async()=> {
        try {
          let res = await Instance.post("/success", {
            store_id: 7,
            amount: sumcart,
            r_no:rno,
            delivery: "delivery",
            name: name,
            email: email,
            shopname: "emedix",
            address:
              name +
              "-" +
              address +
              "-" +
              states +
              "-" +
              phone,
             delivery_fee: 1000,
          });
          let rest = await res.data;
    
          if (rest && rest.success === true) {
            setStep(step+1)
          }
          if (rest && rest.success === false) {
          }
        } catch (e) {
          console.log(e);
        }
      }
      const config = {
        public_key: "FLWPUBK_TEST-9662e3897f31cfe63cb8fb3e787cb851-X",
        tx_ref: rno,
        amount: parseInt(sumcart+1000),
        currency: "NGN",
        payment_options: "card,mobilemoney,ussd",
        customer: {
          email:email,
          phonenumber:phone,
          name: name,
        },
        customizations: {
          title: "e-medix.ng",
          description: "Payment for items in cart",
        },
      };
      const fwConfig = {
        ...config,
        text:
          "Pay NGN " + parseInt(sumcart+1000),
        callback: (response) => {
          console.log(response);
          if (response.status === "successful") {
            pays();
            closePaymentModal();
          }
          // this will close the modal programmatically
        },
        onClose: () => {
            AppointRno();
        },
      };
    return(
        <div className="modal-cart" onClick={closeModal}>

            <div className="modal-content-cart" onClick={(e) => e.stopPropagation()}>
        <ToastContainer />

            <span className="close-cart" onClick={closeModal}>
                &times;
            </span>
            <div className="header">
                <div>
                <FontAwesomeIcon
                  className="fabag"
                  icon={faShoppingBag}
                  
                />
                </div>
                <div>
                   <h3>NGN {sumcart}</h3> 
                </div>
            </div>
            <div>
                {step===1&&<Step1 GetCartTotal={GetCartTotal}/>}
                {step===2&&<Step2 
                setName={setName}
                setEmail={setEmail}
                setPhone={setPhone}
                setStates={setStates}
                setAddress={setAddress}
                name={name}
                email={email}
                phone={phone}
                states={states}
                address={address}
                 />}
                {step===3&&<Step3 total={sumcart} customer_info={
                  name +
                  "-" +
                  phone +
                  "-" +
                  address +
                  "-" +
                  states
              }/>}
                {step===4&&<Step4  />}
               
            </div>
            <div className="checkout">
            {step===1?<button disabled={sumcart>0?false:true} onClick={()=>setStep(step+1)}>Checkout Now (&#8358;sumcart)</button>:""}
            {step===2?<button  onClick={()=>Appoint()}>Proceed to pay</button>:""}
            {step===3?<FlutterWaveButton {...fwConfig} />:""}
            </div>
            </div>
        </div>
    )
}
export default AddPersonnel;